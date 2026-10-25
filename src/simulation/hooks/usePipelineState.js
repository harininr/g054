import { useState, useCallback, useRef } from 'react';
import { DEMO_FILE_METADATA } from '../data/demoData';

const TOTAL_STEPS = 9;

export function usePipelineState() {
  const [step, setStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const videoRef = useRef(null);

  const markComplete = useCallback((stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => {
      const next = Math.min(prev + 1, TOTAL_STEPS - 1);
      setCompletedSteps(s => new Set([...s, prev]));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToStep = useCallback((n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const restart = useCallback(() => {
    setStep(0);
    setUploadedFile(null);
    setFileMetadata(null);
    setIsDemoMode(false);
    setCompletedSteps(new Set());
    setIsPresentationMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startDemoMode = useCallback(() => {
    setIsDemoMode(true);
    setFileMetadata(DEMO_FILE_METADATA);
    setUploadedFile(null);
  }, []);

  const loadFile = useCallback((file) => {
    setUploadedFile(file);
    setIsDemoMode(false);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const d = video.duration;
      const mins = Math.floor(d / 60);
      const secs = Math.floor(d % 60);
      setFileMetadata({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        duration: mins + ':' + String(secs).padStart(2, '0'),
        durationSec: d,
        format: file.type.split('/')[1]?.toUpperCase() || 'Video',
        isDemo: false,
      });
      URL.revokeObjectURL(video.src);
    };
    video.src = URL.createObjectURL(file);
  }, []);

  const seekVideo = useCallback((seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  }, []);

  return {
    step, nextStep, prevStep, goToStep, restart,
    uploadedFile, fileMetadata, loadFile,
    isDemoMode, startDemoMode,
    completedSteps, markComplete,
    isPresentationMode, setIsPresentationMode,
    videoRef, seekVideo,
  };
}
