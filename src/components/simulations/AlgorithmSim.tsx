import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Shuffle, BarChart3, FastForward } from 'lucide-react';

export const AlgorithmSim: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 44, 28, 95, 18, 54, 76, 61]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100); // ms per step
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);

  const generateRandomArray = (size = 14) => {
    setIsSorting(false);
    const newArr: number[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 10);
    }
    setArray(newArr);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  // Run bubble sort step-by-step
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSorting) {
      if (algorithm === 'bubble') {
        const arr = [...array];
        let didSwap = false;

        // find next un-swapped adjacent pair
        const n = arr.length;
        let outer = 0;
        let inner = 0;

        // Simple stepper
        const runBubbleStep = async () => {
          let sorted = true;
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
              setComparingIndices([i, i + 1]);
              setComparisons((prev) => prev + 1);

              timeout = setTimeout(() => {
                setSwappingIndices([i, i + 1]);
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                setArray([...arr]);
                setSwaps((prev) => prev + 1);
              }, speed / 2);

              sorted = false;
              break;
            }
          }

          if (sorted) {
            setIsSorting(false);
            setSortedIndices(arr.map((_, idx) => idx));
            setComparingIndices([]);
            setSwappingIndices([]);
          }
        };

        timeout = setTimeout(runBubbleStep, speed);
      } else {
        // Selection sort simulation
        const arr = [...array];
        let minIdx = -1;
        for (let i = 0; i < arr.length - 1; i++) {
          let currentMin = i;
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[currentMin]) {
              currentMin = j;
            }
          }
          if (currentMin !== i) {
            const temp = arr[i];
            arr[i] = arr[currentMin];
            arr[currentMin] = temp;
            setArray([...arr]);
            setSwaps((prev) => prev + 1);
            setComparisons((prev) => prev + (arr.length - i));
            break;
          }
        }
        setIsSorting(false);
        setSortedIndices(arr.map((_, idx) => idx));
      }
    }

    return () => clearTimeout(timeout);
  }, [isSorting, array, algorithm, speed]);

  const getAlgorithmComplexity = () => {
    switch (algorithm) {
      case 'bubble':
        return { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' };
      case 'selection':
        return { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' };
      case 'insertion':
        return { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' };
    }
  };

  const comp = getAlgorithmComplexity();

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Computer Science Lab · Algorithms & Big-O</span>
          <h3 className="text-xl font-bold text-white mt-1">Sorting Algorithm Visualizer & Complexity Profiler</h3>
          <p className="text-xs text-slate-400 mt-0.5">Asymptotic Time/Space Analytics and Step-by-Step Data State Transitions</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSorting(!isSorting)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
              isSorting ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            {isSorting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isSorting ? 'Pause' : 'Start Sort'}
          </button>
          <button
            onClick={() => generateRandomArray()}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
            Randomize Array
          </button>
          <button
            onClick={() => {
              setIsSorting(false);
              setArray([18, 25, 32, 45, 54, 61, 69, 76, 85, 89, 95]);
              setSortedIndices([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700"
          >
            Solved State
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: Visual Bars Canvas */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 min-h-[420px] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Algorithm: <strong className="text-purple-300 uppercase">{algorithm} Sort</strong></span>
            <span className="font-mono">Array Size: <strong className="text-white">{array.length} elements</strong></span>
          </div>

          {/* Bars Stage */}
          <div className="w-full h-64 flex items-end justify-center gap-2 px-2 border-b border-slate-800 pb-2">
            {array.map((value, idx) => {
              const isComparing = comparingIndices.includes(idx);
              const isSwapping = swappingIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              let barColor = 'bg-slate-700 hover:bg-slate-600';
              if (isComparing) barColor = 'bg-amber-400 animate-pulse';
              if (isSwapping) barColor = 'bg-rose-500 scale-105';
              if (isSorted) barColor = 'bg-emerald-500';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-80 group-hover:opacity-100">
                    {value}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-150 ${barColor}`}
                    style={{ height: `${(value / 100) * 190}px` }}
                  />
                  <span className="text-[9px] font-mono text-slate-500">{idx}</span>
                </div>
              );
            })}
          </div>

          {/* Real-time Profiling Metrics */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 text-center text-xs">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Comparisons Performed</span>
              <strong className="text-amber-400 font-mono text-base">{comparisons}</strong>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Element Swaps</span>
              <strong className="text-rose-400 font-mono text-base">{swaps}</strong>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Execution Status</span>
              <strong className={`font-mono text-sm ${isSorting ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'}`}>
                {isSorting ? 'PROCESSING...' : sortedIndices.length === array.length ? 'COMPLETED (SORTED)' : 'READY'}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Zone: Controls & Asymptotic Complexity Specs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Algorithm Selection & Speed</h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAlgorithm('bubble');
                  setIsSorting(false);
                }}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-left transition-colors ${
                  algorithm === 'bubble'
                    ? 'bg-purple-950/40 border-purple-500 text-purple-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Bubble Sort (Adjacent pairwise compare)
              </button>
              <button
                onClick={() => {
                  setAlgorithm('selection');
                  setIsSorting(false);
                }}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-left transition-colors ${
                  algorithm === 'selection'
                    ? 'bg-purple-950/40 border-purple-500 text-purple-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Selection Sort (Find global minimum)
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Step Delay Speed:</span>
                <span className="font-mono text-purple-400">{speed} ms</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Big-O Complexity Matrix */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Asymptotic Complexity Matrix</h4>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Best Time</span>
                <span className="text-emerald-400 font-bold">{comp.best}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Average Time</span>
                <span className="text-amber-400 font-bold">{comp.avg}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Worst Time</span>
                <span className="text-rose-400 font-bold">{comp.worst}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Auxiliary Space</span>
                <span className="text-cyan-400 font-bold">{comp.space} (In-Place)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
