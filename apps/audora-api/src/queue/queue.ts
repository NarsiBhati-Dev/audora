import { Queue } from "bullmq";
import { Kafka, type Producer } from "kafkajs";
import { kafkaProducer } from "./kafkaProducer";

export const queue = new Queue("recording-chunks");

export const sendRecordingChunkToQueue = async (
  sessionId: string,
  data: Buffer,
  isFinal: boolean
) => {
  await queue.add("recording-chunks", { sessionId, data, isFinal });
};

const BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const TOPIC = process.env.KAFKA_TOPIC || "recording-chunks";

let producer: Producer | null = null;

async function getProducer(): Promise<Producer> {
  if (!producer) {
    const kafka = new Kafka({
      clientId: "audora-api",
      brokers: BROKERS,
    });
    producer = kafka.producer();
    await producer.connect();

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await producer?.disconnect();
      process.exit(0);
    });
    process.on("SIGTERM", async () => {
      await producer?.disconnect();
      process.exit(0);
    });
  }
  return producer;
}

export interface RecordingChunkPayload {
  sessionId: string;
  data: Buffer;
  isFinal: boolean;
}

/**
 * Sends a recording chunk to Kafka.
 * @param payload - { sessionId, data (Buffer), isFinal }
 */
export async function sendRecordingChunkToKafka(
  payload: RecordingChunkPayload
) {
  const producer = await getProducer();
  try {
    await producer.send({
      topic: TOPIC,
      messages: [
        {
          value: JSON.stringify({
            sessionId: payload.sessionId,
            data: payload.data.toString("base64"),
            isFinal: payload.isFinal,
          }),
        },
      ],
    });
    console.log(
      `[Kafka] Sent chunk for session ${payload.sessionId} (final: ${payload.isFinal})`
    );
  } catch (err) {
    console.error("[Kafka] Failed to send chunk:", err);
    throw err;
  }
}
