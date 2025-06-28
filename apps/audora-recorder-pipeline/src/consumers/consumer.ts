import { Kafka } from "kafkajs";
import type { RecordingChunkMessage } from "../types/RecordingChunkMessage";
import { FFmpegStitch } from "./FFmpeg-stitch";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const kafka = new Kafka({
  clientId: "recorder-pipeline",
  brokers: ["localhost:9092"],
});

const kafkaConsumer = kafka.consumer({ groupId: "recorder-pipeline" });

await kafkaConsumer.connect();
await kafkaConsumer.subscribe({ topic: "recording-chunks" });

const chunkStore: Record<string, Buffer[]> = {};

kafkaConsumer.run({
  eachMessage: async ({ message }) => {
    const data: RecordingChunkMessage = JSON.parse(message.value!.toString());
    const { userId, chunkId, data: chunk, isFinal } = data;

    // Store chunks in memory by sessionId
    if (!chunkStore[userId]) chunkStore[userId] = [];
    chunkStore[userId].push(Buffer.from(chunk));

    if (isFinal) {
      const allChunks = chunkStore[userId];
      const mergedBuffer = await FFmpegStitch(allChunks, `${userId}.mp4`);

      // Save to public/recordings/
      const recordingsDir = path.join(process.cwd(), "public", "recordings");
      await mkdir(recordingsDir, { recursive: true });
      const outputPath = path.join(recordingsDir, `${userId}.mp4`);
      await writeFile(outputPath, mergedBuffer);

      console.log(`Recording saved: ${outputPath}`);

      // Clean up memory
      delete chunkStore[userId];
    }
  },
});
