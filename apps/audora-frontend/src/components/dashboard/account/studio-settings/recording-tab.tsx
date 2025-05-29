import { InfoIcon } from '@/data/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  PiMicrophoneDuotone,
  PiVideoCameraDuotone,
  PiLightningDuotone,
  PiPauseDuotone,
  PiSlidersDuotone,
} from 'react-icons/pi';
import { ToggleSwitch } from '../toggle-switch';

const RecordingTab = () => {
  // State for toggles and selections
  const [recordingMode, setRecordingMode] = useState<'Video & audio' | 'Audio'>(
    'Audio',
  );
  const [noiseReduction, setNoiseReduction] = useState(false);
  const [audioSampleRate, setAudioSampleRate] = useState<'44.1 kHz' | '48 kHz'>(
    '44.1 kHz',
  );
  const [videoResolution, setVideoResolution] = useState<
    'Standard' | 'Advanced'
  >('Standard');
  // const [frameRate, setFrameRate] = useState<'24 FPS'>('24 FPS');
  const [countdownTimer, setCountdownTimer] = useState(true);
  const [autoStartRecording, setAutoStartRecording] = useState(false);
  const [pauseUploads, setPauseUploads] = useState(false);

  return (
    <div className='mx-auto flex flex-col gap-6 md:max-w-2xl'>
      {/* Description */}
      <div className='text-xs text-zinc-400'>
        Manage general settings related to the recording studio.{' '}
        <Link href='/blogs' className='text-primary-300 underline'>
          Learn more
        </Link>
      </div>
      {/* Recording mode */}
      <section className='rounded-2xl bg-zinc-900 p-5'>
        <h3 className='mb-1 flex items-center gap-2 text-2xl font-bold'>
          <InfoIcon className='h-6 w-6' /> Recording mode
        </h3>
        <div className='flex flex-col items-center gap-2 md:flex-row'>
          <p className='mb-4 text-xs text-zinc-400 md:mb-0'>
            {`Choose what you want to record. You'll always be able to see each
            other while recording.`}
          </p>
          <div className='flex w-full gap-2 rounded-lg bg-zinc-800 p-1 md:w-full'>
            <button
              className={`w-full rounded-lg px-3 py-2 text-xs font-semibold transition md:px-5 md:text-sm ${recordingMode === 'Video & audio' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
              onClick={() => setRecordingMode('Video & audio')}
            >
              Video & audio
            </button>
            <button
              className={`w-full rounded-lg px-5 py-2 text-xs font-semibold transition md:text-sm ${recordingMode === 'Audio' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
              onClick={() => setRecordingMode('Audio')}
            >
              Audio
            </button>
          </div>
        </div>
      </section>

      {/* Audio */}
      <section className='rounded-2xl bg-zinc-900 p-5'>
        <h3 className='mb-1 flex items-center gap-2 text-2xl font-bold'>
          <PiMicrophoneDuotone size={24} /> Audio
        </h3>
        <div className='mb-4'>
          <div className='flex items-center justify-between'>
            <div className='mb-2 font-bold text-white'>Noise reduction</div>
            {/* Toggle */}
            <ToggleSwitch
              checked={noiseReduction}
              onChange={() => setNoiseReduction(v => !v)}
              id='noise-reduction'
            />
          </div>
          <div className='max-w-xs text-sm text-zinc-400'>
            Reduce background noise like air conditioners and laptop fans for
            all participants. This usually ensures the best audio quality but
            can compress audio files.
          </div>
        </div>
        <div>
          <div className='mb-2 font-bold text-white'>Audio sample rate</div>
          <div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
            <div className='max-w-xs text-sm text-zinc-400'>
              We suggest 44.1kHz when recording only audio, and 48kHz when
              recording video and audio.
            </div>
            <div className='flex w-full gap-2 rounded-lg bg-zinc-800 p-1'>
              <button
                className={`flex w-full items-center gap-1 rounded-lg px-4 py-2 text-xs font-semibold transition md:text-sm ${audioSampleRate === '44.1 kHz' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                onClick={() => setAudioSampleRate('44.1 kHz')}
              >
                44.1 kHz
              </button>
              <button
                className={`flex w-full items-center gap-4 rounded-lg px-4 py-2 text-xs font-semibold transition md:text-sm ${audioSampleRate === '48 kHz' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                onClick={() => setAudioSampleRate('48 kHz')}
              >
                48 kHz{' '}
                <PiLightningDuotone
                  className='rounded-lg bg-zinc-600 p-1 text-yellow-500'
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className='rounded-2xl bg-zinc-900 p-5'>
        <h3 className='mb-8 flex items-center gap-2 text-2xl font-bold'>
          <PiVideoCameraDuotone size={24} /> Video
        </h3>
        <div className='mb-4 flex flex-col gap-8 md:flex-row md:gap-4'>
          {/* Standard resolution */}
          <div
            className={`flex-1 rounded-xl border ${videoResolution === 'Standard' ? 'border-primary-500' : 'border-zinc-800'} relative flex flex-col gap-2 bg-zinc-900 p-4 shadow`}
          >
            <span className='bg-primary-500 absolute -top-3 left-3 rounded-lg px-2 py-0.5 text-xs font-semibold text-white'>
              Recommended
            </span>
            <div className='font-semibold text-white'>Standard resolution</div>
            <ul className='list-disc pl-4 text-xs text-zinc-400'>
              <li>
                Separate tracks record in 720p. You can export composed edits in
                higher resolutions up to 4K.{' '}
                <Link href='#' className='text-primary-300 underline'>
                  How does it work?
                </Link>
              </li>
              <li>Fast upload and processing times.</li>
            </ul>
            <button
              className={`mt-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold ${videoResolution === 'Standard' ? 'bg-primary-500 text-white' : 'bg-zinc-800 text-zinc-300'}`}
              onClick={() => setVideoResolution('Standard')}
            >
              Select
            </button>
          </div>
          {/* Advanced resolution */}
          <div
            className={`flex-1 rounded-xl border ${videoResolution === 'Advanced' ? 'border-primary-500' : 'border-zinc-800'} relative flex flex-col gap-2 bg-zinc-900 p-4 shadow`}
          >
            <PiLightningDuotone
              className='text-primary absolute -top-3 left-3 rounded-full bg-zinc-900'
              size={24}
            />
            <div className='font-semibold text-white'>Advanced</div>
            <ul className='list-disc pl-4 text-xs text-zinc-400'>
              <li>
                Suitable for cameras that support 1080p and 4K HD recording.
              </li>
              <li>Longer upload and processing times.</li>
            </ul>
            <button
              className={`mt-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold ${videoResolution === 'Advanced' ? 'bg-primary-500 text-white' : 'bg-zinc-800 text-zinc-300'}`}
              onClick={() => setVideoResolution('Advanced')}
            >
              Select
            </button>
          </div>
        </div>
        <div className='mb-2 flex items-center justify-between'>
          <div>
            <div className='mb-2 font-bold text-white'>Frame rate</div>
            <div className='text-sm text-zinc-400'>
              Set the video frame rate.{' '}
              <Link href='#' className='text-primary-300 underline'>
                Learn more
              </Link>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <button className='flex items-center gap-1 rounded-lg border-4 border-zinc-700 bg-zinc-600 px-3 py-1 text-base font-semibold text-white'>
              24 FPS
            </button>
            <span className='text-xs text-zinc-400'>Recommended</span>
          </div>
        </div>
        <div>
          <div className='mb-2 font-bold text-white'>
            Automatic internet backups
          </div>
          <div className='text-sm text-zinc-400'>
            {`Aside from the locally recorded high-quality tracks, you'll also
            have access to backups recorded over the internet.`}
          </div>
        </div>
      </section>

      {/* Recording start */}
      <section className='rounded-2xl bg-zinc-900 p-5'>
        <h3 className='mb-4 flex items-center gap-2 text-2xl font-bold'>
          <PiSlidersDuotone size={24} /> Recording start
        </h3>
        <div className='mb-2 flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div className='mb-2 font-bold text-white'>Countdown timer</div>
            {/* Toggle */}
            <ToggleSwitch
              checked={countdownTimer}
              onChange={() => setCountdownTimer(v => !v)}
              id='countdown-timer'
            />
          </div>
          <div className='max-w-xs text-sm text-zinc-400'>
            A five-second countdown will start after you hit record, giving you
            and your guests a heads-up before the recording begins.
          </div>
        </div>
        <div>
          <div className='mb-2 flex items-center justify-between gap-2'>
            <div className='font-bold text-white'>
              Automatically start recording
            </div>
            {/* Toggle */}
            <ToggleSwitch
              checked={autoStartRecording}
              onChange={() => setAutoStartRecording(v => !v)}
              id='auto-start-recording'
            />
          </div>
          <div className='max-w-xs text-sm text-zinc-400'>
            The recording will start automatically as soon as the first guest
            joins the studio, no need to hit record. Test recording is disabled
            when this is on.
          </div>
        </div>
      </section>

      {/* Pause uploads */}
      <section className='rounded-2xl bg-zinc-900 p-5'>
        <h3 className='mb-1 flex items-center gap-2 text-2xl font-bold'>
          <PiPauseDuotone size={24} /> Pause uploads
        </h3>
        <div className='mb-2 flex items-center justify-between gap-1'>
          <div className='flex items-center gap-1 font-bold text-white'>
            Hosts and producers can pause uploads{' '}
            <span className='ml-1 rounded bg-zinc-700 px-2 py-0.5 text-xs md:text-sm'>
              Beta
            </span>
          </div>
          {/* Toggle */}
          <ToggleSwitch
            checked={pauseUploads}
            onChange={() => setPauseUploads(v => !v)}
            id='pause-uploads'
          />
        </div>
        <div className='max-w-xs text-sm text-zinc-400'>
          This improves the live session and reduces lag. Uploading resumes as
          soon as recording stops, but everyone has to remain in the studio
          until their upload is done.
        </div>
      </section>
    </div>
  );
};

export default RecordingTab;
