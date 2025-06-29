import { writeFile, unlink, mkdir, rm } from "fs/promises";
import { exec } from "child_process";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuid } from "uuid";
import { promisify } from "util";

const execAsync = promisify(exec);

export const FFmpegStitch = async (
  chunks: Buffer[],
  outputFileName = "output.mp4"
) => {
  const id = uuid();
  const tempDir = path.join(tmpdir(), `merge-${id}`);
  await mkdir(tempDir, { recursive: true });

  try {
    // Step 1: Write chunks to files in tempDir
    const filePaths = await Promise.all(
      chunks.map(async (chunk, index) => {
        const filePath = path.join(tempDir, `chunk-${index}.webm`);
        await writeFile(filePath, chunk);
        return filePath;
      })
    );

    // Step 2: Create input list for ffmpeg
    const listPath = path.join(tempDir, "list.txt");
    const listContent = filePaths.map((p) => `file '${p}'`).join("\n");
    await writeFile(listPath, listContent);

    // Step 3: Run ffmpeg to merge (try -c copy for speed, fallback to re-encode)
    const outputPath = path.join(tempDir, outputFileName);
    let cmd = `ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`;
    try {
      await execAsync(cmd);
    } catch (err) {
      // If -c copy fails, fallback to re-encode
      cmd = `ffmpeg -f concat -safe 0 -i "${listPath}" -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
      await execAsync(cmd);
    }

    // Step 4: Read output
    const finalBuffer = await Bun.file(outputPath).arrayBuffer();

    // Cleanup: Remove the entire tempDir
    await rm(tempDir, { recursive: true, force: true });

    return Buffer.from(finalBuffer);
  } catch (err) {
    // Cleanup on error
    await rm(tempDir, { recursive: true, force: true });
    throw err;
  }
};
