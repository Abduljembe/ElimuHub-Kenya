import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  RotateCw,
  Copy,
  Printer,
  X,
  BookOpen,
  ArrowRight,
  Layers,
  HelpCircle,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Bookmark,
  Trash2,
  Calculator,
  Image as ImageIcon,
  Mic,
  MicOff,
  Share2,
  Contrast,
  RefreshCw,
  Check
} from 'lucide-react';
import { playTapSound, playSuccessChime, playErrorAlert, playStreakFlameSound } from '../utils/soundEffects';
import { saveToWeakSpots } from '../utils/weakSpots';

export interface SavedAssignment {
  id: string;
  timestamp: number;
  subject: string;
  formLevel: string;
  prompt: string;
  solutionMarkdown: string;
  imagePreview?: string | null;
}

interface AssignmentScannerProps {
  onOpenAITutor?: (subject: string, topic: string, level: string) => void;
  onOpenFormulaHud?: () => void;
}

export const AssignmentScanner: React.FC<AssignmentScannerProps> = ({
  onOpenAITutor,
  onOpenFormulaHud
}) => {
  const [inputMode, setInputMode] = useState<'upload' | 'camera' | 'samples' | 'notebook'>('upload');
  const [userPrompt, setUserPrompt] = useState<string>('');
  
  // Image data URL
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  // Camera stream state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Solving state
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [solutionMarkdown, setSolutionMarkdown] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Helper to extract AI identified subject and topic from markdown solution
  const extractDetectedSubject = (text: string) => {
    const subjMatch = text.match(/\*\*Subject:\*\*\s*([^\n\r]+)/i);
    const topicMatch = text.match(/\*\*Level & Topic:\*\*\s*([^\n\r]+)/i) || text.match(/\*\*Topic & Concept:\*\*\s*([^\n\r]+)/i);
    return {
      subject: subjMatch ? subjMatch[1].replace(/[\[\]*]/g, '').trim() : 'Auto-Identified Subject',
      topic: topicMatch ? topicMatch[1].replace(/[\[\]*]/g, '').trim() : 'KCSE Examination Problem'
    };
  };

  // LocalStorage Saved Assignments Notebook
  const [savedAssignments, setSavedAssignments] = useState<SavedAssignment[]>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_saved_assignments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveToNotebook = (solution: string = solutionMarkdown || '') => {
    if (!solution) return;
    const detected = extractDetectedSubject(solution);
    const newEntry: SavedAssignment = {
      id: 'assign-' + Date.now(),
      timestamp: Date.now(),
      subject: detected.subject,
      formLevel: detected.topic,
      prompt: userPrompt.trim() || `${detected.subject} Scanned Work`,
      solutionMarkdown: solution,
      imagePreview: imagePreview || null
    };
    const updated = [newEntry, ...savedAssignments.filter((a) => a.id !== newEntry.id)].slice(0, 30);
    setSavedAssignments(updated);
    localStorage.setItem('elimuhub_saved_assignments', JSON.stringify(updated));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const deleteSavedAssignment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedAssignments.filter((a) => a.id !== id);
    setSavedAssignments(updated);
    localStorage.setItem('elimuhub_saved_assignments', JSON.stringify(updated));
  };

  const loadSavedAssignment = (item: SavedAssignment) => {
    setUserPrompt(item.prompt);
    setImagePreview(item.imagePreview || null);
    setSolutionMarkdown(item.solutionMarkdown);
  };

  // Image rotation 90 degrees clockwise
  const rotateImage90Degrees = () => {
    if (!imagePreview) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.height;
      canvas.height = img.width;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        const newUrl = canvas.toDataURL(mimeType || 'image/jpeg', 0.9);
        setImagePreview(newUrl);
      }
    };
    img.src = imagePreview;
  };

  // 1-Tap Faint Handwriting & Contrast Enhancer (B&W Filter for Exercise Books)
  const [isContrastEnhanced, setIsContrastEnhanced] = useState(false);
  const toggleContrastEnhancer = () => {
    if (!imagePreview) return;
    playTapSound();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      // Darken pencil lines, lighten grey exercise book paper shadows
      for (let i = 0; i < d.length; i += 4) {
        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        const val = gray > 130 ? 255 : gray < 85 ? 10 : (gray - 85) * (245 / 45);
        d[i] = val;
        d[i + 1] = val;
        d[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
      setImagePreview(canvas.toDataURL('image/jpeg', 0.92));
      setIsContrastEnhanced(true);
      playSuccessChime();
    };
    img.src = imagePreview;
  };

  // Voice Input Speech-to-Text
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const toggleVoiceInput = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setErrorMessage('Speech recognition is not supported in this browser. Please type or scan.');
      return;
    }
    if (isVoiceListening) {
      setIsVoiceListening(false);
      return;
    }
    try {
      const rec = new SpeechRec();
      rec.lang = 'en-KE';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onstart = () => {
        setIsVoiceListening(true);
        playTapSound();
      };
      rec.onresult = (evt: any) => {
        const transcript = evt.results[0][0].transcript;
        setUserPrompt((prev) => (prev ? prev + ' ' + transcript : transcript));
        playSuccessChime();
      };
      rec.onerror = () => setIsVoiceListening(false);
      rec.onend = () => setIsVoiceListening(false);
      rec.start();
    } catch {
      setIsVoiceListening(false);
    }
  };

  // Active Recall: Practice Similar Question (+25 XP)
  const [similarQuestion, setSimilarQuestion] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint: string;
  } | null>(null);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(false);
  const [selectedSimilarOption, setSelectedSimilarOption] = useState<number | null>(null);
  const [similarAnswered, setSimilarAnswered] = useState<boolean>(false);
  const [similarCorrect, setSimilarCorrect] = useState<boolean>(false);

  const handleGenerateSimilar = async () => {
    if (!solutionMarkdown) return;
    playTapSound();
    setIsLoadingSimilar(true);
    setSimilarQuestion(null);
    setSelectedSimilarOption(null);
    setSimilarAnswered(false);

    const detected = extractDetectedSubject(solutionMarkdown);
    try {
      const res = await fetch('/api/assignment/similar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalQuestion: userPrompt || 'KCSE Assignment Problem',
          subject: detected.subject,
          topic: detected.topic
        })
      });
      if (!res.ok) throw new Error('Failed to generate similar question');
      const data = await res.json();
      setSimilarQuestion(data);
      playSuccessChime();
    } catch {
      // Fallback similar question
      setSimilarQuestion({
        question: `Active Recall Follow-up for ${detected.subject}: A similar exam scenario is given with different variables. Which principle applies?`,
        options: [
          "Apply the standard formula with given boundary units",
          "Omit the initial boundary condition",
          "Invert the ratio formula",
          "Ignore SI units conversion"
        ],
        correctIndex: 0,
        explanation: "Always maintain the exact method and units demonstrated in the solution.",
        hint: "Review the formula step above."
      });
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  const handleSelectSimilarOption = (idx: number) => {
    if (similarAnswered || !similarQuestion) return;
    playTapSound();
    setSelectedSimilarOption(idx);
    setSimilarAnswered(true);

    const isCorrect = idx === similarQuestion.correctIndex;
    setSimilarCorrect(isCorrect);

    if (isCorrect) {
      playSuccessChime();
      playStreakFlameSound();
      try {
        const raw = localStorage.getItem('elimuhub_daily_streak');
        const data = raw ? JSON.parse(raw) : { streakDays: 1, longestStreak: 1, totalXp: 100 };
        data.totalXp = (data.totalXp || 0) + 25;
        localStorage.setItem('elimuhub_daily_streak', JSON.stringify(data));
      } catch {}
    } else {
      playErrorAlert();
      const detected = extractDetectedSubject(solutionMarkdown || '');
      saveToWeakSpots({
        id: 'ws-' + Date.now(),
        subject: detected.subject,
        topic: detected.topic,
        question: similarQuestion.question,
        options: similarQuestion.options,
        correctAnswer: similarQuestion.correctIndex,
        explanation: similarQuestion.explanation
      });
    }
  };

  // 1-Tap Share to WhatsApp Study Group
  const handleShareWhatsApp = () => {
    if (!solutionMarkdown) return;
    playTapSound();
    const detected = extractDetectedSubject(solutionMarkdown);
    const message = `📚 *ElimuHub Kenya - Solved Assignment*\n*Subject:* ${detected.subject}\n*Topic:* ${detected.topic}\n*Question:* ${userPrompt || 'KCSE Revision Homework'}\n\n👉 Solve and study together on ElimuHub: https://ais-pre-dsp7cgmt5f7tjuze2kvyu7-19154088631.europe-west2.run.app`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Web Speech API text-to-speech audio reader
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      setErrorMessage('Speech synthesis is not supported in this browser.');
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    if (!solutionMarkdown) return;

    window.speechSynthesis.cancel();
    const cleanText = solutionMarkdown
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/\$M_[0-9]\$/g, 'Method mark')
      .replace(/\$A_[0-9]\$/g, 'Accuracy mark')
      .replace(/\$B_[0-9]\$/g, 'Independent mark')
      .replace(/[$_]/g, ' ')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Preset Sample Assignments for quick testing
  const SAMPLE_ASSIGNMENTS = [
    {
      id: 'sample-math-calc',
      title: 'Mathematics Form 4: Calculus Kinematics',
      subject: 'Mathematics Alternative A',
      form: 'Form 4',
      prompt: 'A particle moves along a straight line such that displacement S = 2t³ - 9t² + 12t + 4. Find the velocity when t = 3s and the acceleration when momentarily at rest.',
      previewText: 'Displacement S = 2t³ - 9t² + 12t + 4. Calculate v(3) and a when v = 0.'
    },
    {
      id: 'sample-chem-mole',
      title: 'Chemistry Form 3: Stoichiometry & Gas Volume',
      subject: 'Chemistry',
      form: 'Form 3',
      prompt: '5.0g of calcium carbonate reacts completely with excess dilute hydrochloric acid at RTP. Calculate the volume of carbon(IV) oxide gas produced and mass of CaCl₂ formed. (Ca=40, C=12, O=16, Cl=35.5, Molar gas vol = 24.0 dm³).',
      previewText: '5.0g CaCO₃ + excess HCl → CO₂ volume at RTP and mass of CaCl₂.'
    },
    {
      id: 'sample-phys-trans',
      title: 'Physics Form 4: Transformer Efficiency & AC Mains',
      subject: 'Physics',
      form: 'Form 4',
      prompt: 'A step-down transformer has 1,200 primary turns and 120 secondary turns connected to a 240V AC supply. If efficiency is 85% and output current is 4.0A, find the secondary voltage and primary current.',
      previewText: 'Np=1200, Ns=120, Vp=240V, η=85%, Is=4.0A. Calculate Vs and Ip.'
    },
    {
      id: 'sample-bio-gen',
      title: 'Biology Form 4: Genetics & Hemophilia Cross',
      subject: 'Biology',
      form: 'Form 4',
      prompt: 'In humans, hemophilia is sex-linked recessive carried on the X chromosome. A normal man marries a woman carrier (XᴴXʰ). Work out the genetic cross and state the probability of having a hemophiliac child.',
      previewText: 'Normal male (XᴴY) × Carrier female (XᴴXʰ). Determine offspring ratio and hemophilia probability.'
    }
  ];

  // Camera start / stop logic
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (inputMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [inputMode]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setImagePreview(dataUrl);
      setMimeType('image/jpeg');
      stopCamera();
      setInputMode('upload');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLE_ASSIGNMENTS[0]) => {
    setUserPrompt(sample.prompt);
    setImagePreview(null);
    setInputMode('samples');
  };

  const handleScanAndSolve = async () => {
    if (!imagePreview && !userPrompt.trim()) {
      setErrorMessage('Please take a photo, upload an assignment image, select a sample, or type question text.');
      return;
    }

    setIsSolving(true);
    setErrorMessage(null);
    setSolutionMarkdown(null);

    try {
      const response = await fetch('/api/assignment/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview || undefined,
          mimeType: mimeType,
          userPrompt: userPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to solve assignment (HTTP ${response.status})`);
      }

      const data = await response.json();
      if (data.text) {
        setSolutionMarkdown(data.text);
        saveToNotebook(data.text);
        playSuccessChime();
      } else {
        throw new Error('No solution returned from AI scanner.');
      }
    } catch (err: any) {
      console.error('Assignment solving error:', err);
      playErrorAlert();
      setErrorMessage(err?.message || 'Error scanning assignment. Please verify connection and retry.');
    } finally {
      setIsSolving(false);
    }
  };

  const handleCopySolution = () => {
    if (solutionMarkdown) {
      navigator.clipboard.writeText(solutionMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>Homework Solver</span>
              <span>·</span>
              <span>KNEC Steps</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>📸 Scan &amp; Solve Homework</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Snap a photo or type any problem. The AI automatically identifies the subject and explains step-by-step working.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-800 text-xs font-mono shrink-0 self-start md:self-auto">
            <div>
              <span className="text-slate-400 block text-[9px] sm:text-[10px]">Subject</span>
              <strong className="text-emerald-400 text-xs sm:text-sm">AI Auto-Identifies</strong>
            </div>
            <div className="border-l border-slate-800 pl-2.5 sm:pl-3">
              <span className="text-slate-400 block text-[9px] sm:text-[10px]">Steps</span>
              <strong className="text-cyan-400 text-xs sm:text-sm">KNEC Method ($M_1, A_1$)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio: Input Left + Solution Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Scan / Upload / Prompt Interface */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xl space-y-4 sm:space-y-5">
          {/* Input Method Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setInputMode('upload')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                inputMode === 'upload'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
            </button>

            <button
              onClick={() => setInputMode('camera')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                inputMode === 'camera'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera</span>
            </button>

            <button
              onClick={() => setInputMode('samples')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                inputMode === 'samples'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Samples</span>
            </button>

            <button
              onClick={() => setInputMode('notebook')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                inputMode === 'notebook'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedAssignments.length})</span>
            </button>
          </div>

          {/* AI Auto-Identification Feature Pill */}
          <div className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-emerald-500/30 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <span className="text-white font-bold block text-xs">AI Auto-Identifies Subject</span>
                <span className="text-[10px] text-slate-400 block">No need to choose — AI detects Math, Chem, Physics, Bio, etc.</span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-md text-[10px] font-bold shrink-0">
              Auto ✦
            </span>
          </div>

          {/* VIEW: CAMERA LIVE SCANNER */}
          {inputMode === 'camera' && (
            <div className="space-y-3">
              <div className="relative aspect-video sm:aspect-4/3 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* Viewfinder crosshairs */}
                    <div className="absolute inset-8 border-2 border-dashed border-emerald-500/70 rounded-xl pointer-events-none flex items-center justify-center">
                      <div className="text-[10px] font-mono bg-black/60 px-2 py-1 rounded text-emerald-300">
                        Align Assignment Page Here
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <Camera className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">
                      {cameraError || 'Starting device camera...'}
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-white"
                    >
                      Retry Camera Access
                    </button>
                  </div>
                )}
              </div>

              {cameraActive && (
                <button
                  onClick={capturePhoto}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Snapshot of Assignment</span>
                </button>
              )}
            </div>
          )}

          {/* VIEW: FILE UPLOAD DROPZONE */}
          {inputMode === 'upload' && (
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 space-y-2">
                  <img
                    src={imagePreview}
                    alt="Uploaded assignment preview"
                    className="max-h-64 w-full object-contain rounded-xl bg-slate-900"
                  />
                  <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
                    <span>Image Loaded ({mimeType})</span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={toggleContrastEnhancer}
                        className={`flex items-center gap-1 font-semibold text-xs cursor-pointer ${
                          isContrastEnhanced ? 'text-amber-400' : 'text-emerald-400 hover:text-emerald-300'
                        }`}
                        title="Darken pencil lines & clean page background"
                      >
                        <Contrast className="w-3.5 h-3.5" />
                        <span>{isContrastEnhanced ? 'B&W On' : 'Enhance B&W'}</span>
                      </button>
                      <button
                        onClick={rotateImage90Degrees}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
                        title="Rotate image 90° clockwise"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Rotate</span>
                      </button>
                      <button
                        onClick={() => setImagePreview(null)}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950/40 hover:bg-slate-950/80 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="p-3 bg-slate-900 group-hover:bg-emerald-950 text-slate-400 group-hover:text-emerald-400 rounded-2xl transition-colors mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white block">
                    Click to browse or drop assignment photo
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    PNG, JPG, JPEG, WEBP · Clear photos of homework or book pages
                  </span>
                </label>
              )}
            </div>
          )}

          {/* VIEW: PRESET SAMPLES */}
          {inputMode === 'samples' && (
            <div className="space-y-2.5">
              <span className="text-xs text-slate-400 font-mono block">
                Select a sample assignment to test instantly:
              </span>
              <div className="space-y-2">
                {SAMPLE_ASSIGNMENTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSample(s)}
                    className="w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-500/60 transition-all text-xs space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white group-hover:text-emerald-300">
                        {s.title}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                        {s.form}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {s.previewText}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SAVED NOTEBOOK */}
          {inputMode === 'notebook' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>My Solved Homework Journal</span>
                <span className="text-emerald-400">{savedAssignments.length} saved</span>
              </div>
              {savedAssignments.length === 0 ? (
                <div className="text-center py-8 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-500 space-y-1">
                  <Bookmark className="w-6 h-6 mx-auto text-slate-600 mb-1" />
                  <p className="font-semibold text-slate-400">No solved assignments saved yet.</p>
                  <p className="text-[10px] text-slate-500">Scan or upload an assignment to save it here automatically.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {savedAssignments.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => loadSavedAssignment(item)}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-xs cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white group-hover:text-emerald-300 truncate max-w-[190px]">
                          {item.subject}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                            {item.formLevel}
                          </span>
                          <button
                            onClick={(e) => deleteSavedAssignment(item.id, e)}
                            className="text-slate-500 hover:text-rose-400 p-0.5"
                            title="Delete saved assignment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {item.prompt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        <span className="text-emerald-400 group-hover:underline">Click to view solution →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Additional text or question details */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Typed Question or Note:</span>
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                  isVoiceListening
                    ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-cyan-400 hover:border-slate-700'
                }`}
                title="Speak question via microphone"
              >
                {isVoiceListening ? <MicOff className="w-3 h-3 text-rose-400" /> : <Mic className="w-3 h-3 text-cyan-400" />}
                <span>{isVoiceListening ? 'Listening...' : 'Voice Ask'}</span>
              </button>
            </div>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={3}
              placeholder="Or type/speak question directly here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-sans"
            />
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/70 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playTapSound();
              handleScanAndSolve();
            }}
            disabled={isSolving}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isSolving ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>Solving Steps...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Solve Step-by-Step</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Solution & Step-by-Step Process Display */}
        <div className="lg:col-span-7 space-y-4">
          {solutionMarkdown ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm">
                    Step-by-Step Solution
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <button
                    onClick={toggleSpeech}
                    className={`px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] font-medium border transition-colors ${
                      isPlayingAudio
                        ? 'bg-amber-600 border-amber-500 text-white animate-pulse'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-emerald-400'
                    }`}
                    title={isPlayingAudio ? 'Stop audio' : 'Listen to step-by-step solution'}
                  >
                    {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Stop Voice' : 'Listen'}</span>
                  </button>

                  <button
                    onClick={() => saveToNotebook()}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1 text-[11px]"
                    title="Save to notebook"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{justSaved ? 'Saved!' : 'Save'}</span>
                  </button>

                  {onOpenFormulaHud && (
                    <button
                      onClick={onOpenFormulaHud}
                      className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-cyan-300 flex items-center gap-1 text-[11px]"
                      title="Open KCSE Formula HUD"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Formulas</span>
                    </button>
                  )}

                  <button
                    onClick={handleShareWhatsApp}
                    className="p-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/50 rounded-lg text-emerald-300 flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Share solution to WhatsApp study group"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopySolution}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Copy full solution"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1 text-[11px] cursor-pointer"
                    title="Print solution"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* AI Identified Subject Quick Bar */}
              {(() => {
                const detected = extractDetectedSubject(solutionMarkdown);
                return (
                  <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold uppercase text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-300" />
                      <span>AI Identified Subject</span>
                    </span>
                    <span className="text-white font-bold text-xs">{detected.subject}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-300 text-xs">{detected.topic}</span>
                  </div>
                );
              })()}

              {/* Rendered Solution */}
              <div className="space-y-4 text-xs text-slate-200 leading-relaxed font-sans assignment-solution-markdown">
                <div className="prose prose-invert max-w-none prose-headings:font-mono prose-headings:text-white prose-p:leading-relaxed whitespace-pre-wrap">
                  {solutionMarkdown}
                </div>
              </div>

              {/* Active Recall: Practice Similar Question (+25 XP) */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Active Recall Challenge</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Practice this technique on a sister problem to earn +25 XP.
                    </p>
                  </div>

                  {!similarQuestion && (
                    <button
                      onClick={handleGenerateSimilar}
                      disabled={isLoadingSimilar}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow cursor-pointer font-mono"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSimilar ? 'animate-spin' : ''}`} />
                      <span>{isLoadingSimilar ? 'Generating...' : 'Try Similar Q (+25 XP)'}</span>
                    </button>
                  )}
                </div>

                {similarQuestion && (
                  <div className="pt-2 border-t border-slate-800 space-y-3 animate-in fade-in">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white">
                      {similarQuestion.question}
                    </div>

                    <div className="space-y-1.5">
                      {similarQuestion.options.map((opt, idx) => {
                        const isSelected = selectedSimilarOption === idx;
                        const isCorrect = idx === similarQuestion.correctIndex;
                        let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (similarAnswered) {
                          if (isCorrect) {
                            btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={similarAnswered}
                            onClick={() => handleSelectSimilarOption(idx)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnClass}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-relaxed flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {similarAnswered && (
                      <div className={`p-3 rounded-xl border text-xs space-y-1.5 animate-in fade-in ${
                        similarCorrect ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                      }`}>
                        <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                          <span>{similarCorrect ? '🎉 Correct! +25 XP Claimed' : 'Saved to Weak Spots Bank for review!'}</span>
                          <span className="text-slate-400">Answer: {String.fromCharCode(65 + similarQuestion.correctIndex)}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">
                          {similarQuestion.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setUserPrompt('');
                    setSolutionMarkdown(null);
                  }}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Scan Another Assignment</span>
                </button>

                {onOpenAITutor && (
                  <button
                    onClick={() => {
                      const detected = extractDetectedSubject(solutionMarkdown);
                      onOpenAITutor(detected.subject, detected.topic, 'KCSE');
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor to Explain Further</span>
                  </button>
                )}
              </div>
            </div>
          ) : isSolving ? (
            /* Skeleton Loading State */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                Identifying Subject &amp; Solving Step-by-Step...
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Automatically detecting subject and syllabus topic, transcribing problem, and generating official KNEC method marking steps ($M_1, A_1$).
              </p>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 max-w-xs mx-auto">
                <div className="bg-emerald-500 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  No Assignment Scanned Yet
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                  Upload a photo or capture an image of your homework sheet on the left. The AI will extract the question, calculate the exact answer, and display the detailed process step-by-step.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-4 text-[11px] font-mono text-slate-400">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-emerald-400 block font-bold mb-1">1. Capture / Upload</span>
                  <span>Photo of handwritten or printed sheet</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-cyan-400 block font-bold mb-1">2. Instant OCR</span>
                  <span>Formulas, diagrams &amp; numbers recognized</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-amber-400 block font-bold mb-1">3. Step-by-Step</span>
                  <span>Correct answer + KNEC method marks</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
