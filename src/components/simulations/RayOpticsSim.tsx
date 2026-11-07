import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  Award,
  CheckCircle2,
  Sliders,
  Maximize2
} from 'lucide-react';

export const RayOpticsSim: React.FC = () => {
  const [opticalDevice, setOpticalDevice] = useState<'convex_lens' | 'concave_lens' | 'concave_mirror'>('convex_lens');
  const [focalLength, setFocalLength] = useState<number>(60); // in pixels
  const [objectDistance, setObjectDistance] = useState<number>(120); // in pixels (u)
  const [objectHeight, setObjectHeight] = useState<number>(50); // in pixels (ho)

  // Calculations using Thin Lens Formula: 1/f = 1/u + 1/v => 1/v = 1/f - 1/u => v = (u*f)/(u - f)
  // For convex lens: f > 0, u > 0
  // For concave lens: f < 0
  const isConvex = opticalDevice === 'convex_lens';
  const effectiveF = isConvex ? focalLength : -focalLength;
  
  // v = (u * f) / (u - f)
  const denominator = objectDistance - effectiveF;
  const imageDistance = Math.abs(denominator) < 0.1 ? 9999 : (objectDistance * effectiveF) / denominator;
  const magnification = Math.abs(imageDistance / objectDistance);
  const imageHeight = magnification * objectHeight;

  const isReal = isConvex ? objectDistance > focalLength : false;
  const isInverted = isConvex ? objectDistance > focalLength : false;
  const isAtInfinity = Math.abs(objectDistance - focalLength) < 1;

  // Preset Configurations
  const handleApplyPreset = (type: 'camera' | 'projector' | 'magnifier' | 'infinity') => {
    setOpticalDevice('convex_lens');
    if (type === 'camera') {
      // u > 2f
      setFocalLength(60);
      setObjectDistance(160);
      setObjectHeight(50);
    } else if (type === 'projector') {
      // f < u < 2f
      setFocalLength(60);
      setObjectDistance(90);
      setObjectHeight(40);
    } else if (type === 'magnifier') {
      // u < f
      setFocalLength(70);
      setObjectDistance(45);
      setObjectHeight(40);
    } else if (type === 'infinity') {
      // u = f
      setFocalLength(60);
      setObjectDistance(60);
      setObjectHeight(45);
    }
  };

  // Canvas dimensions
  const canvasWidth = 640;
  const canvasHeight = 320;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Object coordinates
  const objX = centerX - objectDistance;
  const objYTop = centerY - objectHeight;

  // Image coordinates
  const imgX = isReal ? centerX + imageDistance : centerX - Math.abs(imageDistance);
  const imgYTop = isInverted ? centerY + imageHeight : centerY - imageHeight;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <span>KCSE Paper 232/2 Geometrical Optics</span>
            <span>·</span>
            <span>Interactive Ray Tracing Sandbox</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>⚡ Ray Optics &amp; Thin Lens Simulator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Trace principal rays through converging and diverging lenses. Verify image distance v = (u × f) / (u - f), linear magnification m = v / u, and real-time image characteristics for cameras, projectors, and magnifying glasses.
          </p>
        </div>

        {/* Optical Device Selector */}
        <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 flex items-center gap-1.5 text-xs font-mono shrink-0">
          <button
            onClick={() => setOpticalDevice('convex_lens')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              opticalDevice === 'convex_lens'
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Convex (Converging)
          </button>
          <button
            onClick={() => setOpticalDevice('concave_lens')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              opticalDevice === 'concave_lens'
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concave (Diverging)
          </button>
        </div>
      </div>

      {/* Preset Application Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-400 uppercase text-[10px] shrink-0 font-bold">Standard Presets:</span>
        <button
          onClick={() => handleApplyPreset('camera')}
          className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 shrink-0"
        >
          📷 Camera / Eye (u &gt; 2f)
        </button>
        <button
          onClick={() => handleApplyPreset('projector')}
          className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 shrink-0"
        >
          📽️ Projector (f &lt; u &lt; 2f)
        </button>
        <button
          onClick={() => handleApplyPreset('magnifier')}
          className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 shrink-0"
        >
          🔍 Simple Magnifier (u &lt; f)
        </button>
        <button
          onClick={() => handleApplyPreset('infinity')}
          className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 shrink-0"
        >
          🔦 Searchlight (u = f)
        </button>
      </div>

      {/* Interactive Ray Diagram SVG Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto shadow-inner">
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          className="w-full max-w-full h-auto select-none"
          style={{ minWidth: 540 }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="rayGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={canvasWidth} height={canvasHeight} fill="url(#rayGrid)" />

          {/* Principal Axis */}
          <line
            x1="20"
            y1={centerY}
            x2={canvasWidth - 20}
            y2={centerY}
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Optical Center C */}
          <circle cx={centerX} cy={centerY} r="3" fill="#38bdf8" />
          <text x={centerX - 5} y={centerY + 16} fill="#94a3b8" fontSize="10" fontFamily="monospace">
            C
          </text>

          {/* Principal Foci F1, F2 and 2F1, 2F2 */}
          <circle cx={centerX - focalLength} cy={centerY} r="3" fill="#f59e0b" />
          <text x={centerX - focalLength - 6} y={centerY + 16} fill="#fbbf24" fontSize="10" fontFamily="monospace">
            F₁
          </text>

          <circle cx={centerX - 2 * focalLength} cy={centerY} r="3" fill="#f59e0b" />
          <text x={centerX - 2 * focalLength - 10} y={centerY + 16} fill="#fbbf24" fontSize="10" fontFamily="monospace">
            2F₁
          </text>

          <circle cx={centerX + focalLength} cy={centerY} r="3" fill="#f59e0b" />
          <text x={centerX + focalLength - 6} y={centerY + 16} fill="#fbbf24" fontSize="10" fontFamily="monospace">
            F₂
          </text>

          <circle cx={centerX + 2 * focalLength} cy={centerY} r="3" fill="#f59e0b" />
          <text x={centerX + 2 * focalLength - 8} y={centerY + 16} fill="#fbbf24" fontSize="10" fontFamily="monospace">
            2F₂
          </text>

          {/* Optical Device Representation (Convex or Concave lens) */}
          {isConvex ? (
            /* Convex Lens: Curved ellipse */
            <path
              d={`M ${centerX} 30 Q ${centerX + 16} ${centerY} ${centerX} ${canvasHeight - 30} Q ${centerX - 16} ${centerY} ${centerX} 30`}
              fill="rgba(56, 189, 248, 0.2)"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          ) : (
            /* Concave Lens */
            <path
              d={`M ${centerX - 12} 30 Q ${centerX} ${centerY} ${centerX - 12} ${canvasHeight - 30} L ${centerX + 12} ${canvasHeight - 30} Q ${centerX} ${centerY} ${centerX + 12} 30 Z`}
              fill="rgba(56, 189, 248, 0.2)"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* OBJECT ARROW (Green) */}
          <line
            x1={objX}
            y1={centerY}
            x2={objX}
            y2={objYTop}
            stroke="#10b981"
            strokeWidth="3.5"
          />
          {/* Arrowhead on Object */}
          <polygon
            points={`${objX},${objYTop - 4} ${objX - 5},${objYTop + 6} ${objX + 5},${objYTop + 6}`}
            fill="#10b981"
          />
          <text x={objX - 18} y={objYTop - 8} fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
            Object (O)
          </text>

          {/* RAY TRACING LINES */}
          {!isAtInfinity && (
            <>
              {/* Ray 1: Parallel to Principal Axis -> Passes through F2 */}
              <line
                x1={objX}
                y1={objYTop}
                x2={centerX}
                y2={objYTop}
                stroke="#38bdf8"
                strokeWidth="2"
              />
              {isConvex ? (
                <line
                  x1={centerX}
                  y1={objYTop}
                  x2={imgX}
                  y2={imgYTop}
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
              ) : (
                /* Diverging ray */
                <line
                  x1={centerX}
                  y1={objYTop}
                  x2={canvasWidth}
                  y2={objYTop + ((objYTop - centerY) / focalLength) * (canvasWidth - centerX)}
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
              )}

              {/* Ray 2: Passes through Optical Center C undeviated */}
              <line
                x1={objX}
                y1={objYTop}
                x2={imgX}
                y2={imgYTop}
                stroke="#fbbf24"
                strokeWidth="2"
              />
            </>
          )}

          {/* IMAGE ARROW (Orange / Purple) */}
          {!isAtInfinity && Math.abs(imgX - centerX) < canvasWidth && (
            <>
              <line
                x1={imgX}
                y1={centerY}
                x2={imgX}
                y2={imgYTop}
                stroke={isReal ? '#f97316' : '#a855f7'}
                strokeWidth="3.5"
                strokeDasharray={isReal ? 'none' : '4 4'}
              />
              <polygon
                points={
                  isInverted
                    ? `${imgX},${imgYTop + 4} ${imgX - 5},${imgYTop - 6} ${imgX + 5},${imgYTop - 6}`
                    : `${imgX},${imgYTop - 4} ${imgX - 5},${imgYTop + 6} ${imgX + 5},${imgYTop + 6}`
                }
                fill={isReal ? '#f97316' : '#a855f7'}
              />
              <text
                x={imgX - 15}
                y={isInverted ? imgYTop + 18 : imgYTop - 8}
                fill={isReal ? '#fb923c' : '#c084fc'}
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Image (I)
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Sliders & Numerical Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Object Distance u */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Object Distance (u):</span>
            <strong className="text-emerald-400 text-sm">{objectDistance} cm</strong>
          </div>
          <input
            type="range"
            min="30"
            max="200"
            value={objectDistance}
            onChange={(e) => setObjectDistance(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Close (30cm)</span>
            <span>Far (200cm)</span>
          </div>
        </div>

        {/* Focal Length f */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Focal Length (f):</span>
            <strong className="text-amber-400 text-sm">{focalLength} cm</strong>
          </div>
          <input
            type="range"
            min="40"
            max="90"
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Short (40cm)</span>
            <span>Long (90cm)</span>
          </div>
        </div>

        {/* Object Height ho */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Object Height (hₒ):</span>
            <strong className="text-cyan-400 text-sm">{objectHeight} cm</strong>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            value={objectHeight}
            onChange={(e) => setObjectHeight(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Small (20cm)</span>
            <span>Tall (80cm)</span>
          </div>
        </div>
      </div>

      {/* KCSE Physics Output Dashboard: Image Nature & Marks Scheme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">Image Distance (v)</span>
          <strong className="text-white text-sm block">
            {isAtInfinity ? 'At Infinity (∞)' : `${imageDistance.toFixed(1)} cm`}
          </strong>
          <span className="text-[10px] text-cyan-400">1/f = 1/u + 1/v</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">Linear Magnification (m)</span>
          <strong className="text-white text-sm block">
            {isAtInfinity ? 'Infinite' : `${magnification.toFixed(2)} ×`}
          </strong>
          <span className="text-[10px] text-emerald-400">m = v / u = hᵢ / hₒ</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">Nature of Image</span>
          <strong className={isReal ? 'text-amber-400 text-sm block' : 'text-purple-400 text-sm block'}>
            {isAtInfinity ? 'Parallel Beam' : isReal ? 'REAL (Formed on Screen)' : 'VIRTUAL (Behind Lens)'}
          </strong>
          <span className="text-[10px] text-slate-500">Form 2 &amp; 4 Optics</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">Orientation &amp; Size</span>
          <strong className="text-white text-sm block">
            {isAtInfinity
              ? 'No Image'
              : `${isInverted ? 'Inverted' : 'Upright'}, ${
                  magnification > 1.05 ? 'Magnified' : magnification < 0.95 ? 'Diminished' : 'Same Size'
                }`}
          </strong>
          <span className="text-[10px] text-cyan-400">KNEC 3-Characteristic Rule</span>
        </div>
      </div>
    </div>
  );
};
