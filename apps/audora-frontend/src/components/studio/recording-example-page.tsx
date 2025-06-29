'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRecording } from '@/hooks/recording/useRecording';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useMerge } from '@/hooks/recording/useMerge';

export default function RecordingExamplePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { stream } = useMediaDevices();
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);

  const { addChunk, mergeChunks, videoUrl, clear, chunks } = useMerge();

  const { isRecording, startRecording, stopRecording } = useRecording({
    stream,
    onChunk: addChunk,
    onStart: () => {
      console.log('Recording started');
      clear();
    },
    onStop: () => {
      console.log('Stopped, merging...');
      mergeChunks();
    },
    onError: err => console.error(err),
  });

  useEffect(() => {
    if (stream) setPreviewStream(stream);
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  return (
    <div className='space-y-6 bg-white p-6'>
      <h2 className='text-xl font-bold'>Merged Recording</h2>

      {/* Live Preview */}
      {isRecording && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className='w-full max-w-xl rounded border'
        />
      )}

      {/* Final Merged Video */}
      {videoUrl && !isRecording && (
        <video
          src={videoUrl}
          controls
          className='w-full max-w-xl rounded border'
        />
      )}

      {/* Controls */}
      <div className='flex gap-4'>
        <button
          onClick={startRecording}
          disabled={isRecording}
          className='rounded bg-green-600 px-4 py-2 text-white'
        >
          Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className='rounded bg-red-600 px-4 py-2 text-white'
        >
          Stop
        </button>
      </div>

      {/* Debug Info (optional) */}
      <div className='text-sm text-gray-600'>
        <p>Chunks Recorded: {chunks.length}</p>
        {chunks.map((c, i) => (
          <p key={i}>
            Chunk {c.index}: {Math.round((c.endTime - c.startTime) / 1000)}s
          </p>
        ))}
      </div>
    </div>
  );
}
