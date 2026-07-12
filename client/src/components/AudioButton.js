import React, { useEffect, useId, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { track } from '@vercel/analytics/react';
import './AudioButton.css';

const AUDIO_START_EVENT = 'wayfinder-audio-start';
const AUDIO_STOP_EVENT = 'wayfinder-audio-stop';

export const stopWayfinderAudio = (reason = 'manual', trackStop = false) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(AUDIO_STOP_EVENT, {
    detail: { reason, trackStop },
  }));
};

const AudioButton = ({ text, label = 'Read aloud' }) => {
  const id = useId();
  const [isReading, setIsReading] = useState(false);
  const isReadingRef = useRef(false);
  const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const textLength = text?.length || 0;

  useEffect(() => {
    isReadingRef.current = isReading;
  }, [isReading]);

  useEffect(() => {
    const handleAudioStart = (event) => {
      if (event.detail !== id) {
        setIsReading(false);
      }
    };

    const handleAudioStop = (event) => {
      if (!supportsSpeech) {
        return;
      }

      if (isReadingRef.current && event.detail?.trackStop) {
        track('Audio Read Aloud Stopped', {
          path: window.location.pathname,
          textLength,
          reason: event.detail.reason,
        });
      }

      window.speechSynthesis.cancel();
      setIsReading(false);
    };

    window.addEventListener(AUDIO_START_EVENT, handleAudioStart);
    window.addEventListener(AUDIO_STOP_EVENT, handleAudioStop);

    return () => {
      window.removeEventListener(AUDIO_START_EVENT, handleAudioStart);
      window.removeEventListener(AUDIO_STOP_EVENT, handleAudioStop);
      if (supportsSpeech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id, supportsSpeech, textLength]);

  const handleClick = () => {
    if (!supportsSpeech || !text?.trim()) {
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      track('Audio Read Aloud Stopped', {
        path: window.location.pathname,
        textLength,
        reason: 'button',
      });
      setIsReading(false);
      return;
    }

    window.speechSynthesis.cancel();
    window.dispatchEvent(new CustomEvent(AUDIO_START_EVENT, { detail: id }));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    setIsReading(true);
    track('Audio Read Aloud Started', {
      path: window.location.pathname,
      textLength,
    });
    window.speechSynthesis.speak(utterance);
  };

  if (!supportsSpeech || !text?.trim()) {
    return null;
  }

  return (
    <Button
      className="audio-button"
      variant="outlined"
      size="small"
      startIcon={isReading ? <StopIcon /> : <VolumeUpIcon />}
      onClick={handleClick}
      aria-label={isReading ? 'Stop audio' : label}
      aria-pressed={isReading}
    >
      {isReading ? 'Stop audio' : label}
    </Button>
  );
};

export default AudioButton;
