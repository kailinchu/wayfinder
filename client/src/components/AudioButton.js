import React, { useEffect, useId, useState } from 'react';
import Button from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './AudioButton.css';

const AUDIO_START_EVENT = 'wayfinder-audio-start';

const AudioButton = ({ text, label = 'Read aloud' }) => {
  const id = useId();
  const [isReading, setIsReading] = useState(false);
  const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    const handleAudioStart = (event) => {
      if (event.detail !== id) {
        setIsReading(false);
      }
    };

    window.addEventListener(AUDIO_START_EVENT, handleAudioStart);

    return () => {
      window.removeEventListener(AUDIO_START_EVENT, handleAudioStart);
      if (supportsSpeech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id, supportsSpeech]);

  const handleClick = () => {
    if (!supportsSpeech || !text?.trim()) {
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
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
    >
      {isReading ? 'Stop audio' : label}
    </Button>
  );
};

export default AudioButton;
