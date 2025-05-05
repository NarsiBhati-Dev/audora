# processor

The `processor` service is responsible for post-processing recordings in **Audora**. It handles tasks such as:

- Merging tracks
- Adding intros/outros
- Transcoding/exporting files
- Audio/video enhancements

It can use **FFmpeg**, **GStreamer**, or other tools for processing media jobs.

---

## 📦 Setup

Install dependencies:

```bash
bun install
```

---

## 🚀 Run Job Processor

```bash
bun run index.ts
```

You can queue jobs from the `media-backend` or manually for testing.

---

## 📁 Structure

```bash
processor/
├── jobs/
│   ├── merge-tracks.ts       # Combines local audio/video streams
│   ├── export-video.ts       # Final export and transcoding
│   └── cleanup.ts            # Removes temp files
├── utils/                    # Shell runner, FFmpeg helpers
├── index.ts                  # Job dispatcher
├── tsconfig.json
└── README.md
```

---

## 🔧 Dependencies

- [FFmpeg](https://ffmpeg.org/) – Powerful media toolset
- [GStreamer](https://gstreamer.freedesktop.org/) – (Optional) alternative processing engine

---

## 🧠 About

The `processor` runs long-lived or scheduled jobs to deliver final media output for users on the **Audora** platform.

---

## 🛠️ TODO

- [ ] Add support for lossless audio merging
- [ ] Export HLS-compatible formats
- [ ] Optimize for GPU-based FFmpeg acceleration
