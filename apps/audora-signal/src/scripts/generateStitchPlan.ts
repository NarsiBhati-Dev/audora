import type { MediaChunk } from "./TrackSessionMap";

export function generateStitchPlan(userTracks: Map<string, MediaChunk[]>) {
  const inputs = Array.from(userTracks.entries()).flatMap(([userId, chunks]) =>
    chunks.map((chunk) => ({
      file: chunk.url,
      userId,
      start: chunk.start,
      end: chunk.end,
    })),
  );

  return {
    output: "final_mix.mp4",
    inputs,
  };
}
