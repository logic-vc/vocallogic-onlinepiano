import React, { useEffect, useCallback, useRef } from 'react';
import { PIANO_KEYS } from '../constants';
import { NoteDefinition } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface PianoProps {
  showLabels: boolean;
  activeKeys: Set<string>;
  setActiveKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const Piano: React.FC<PianoProps> = ({ showLabels, activeKeys, setActiveKeys }) => {
  // Store timeout IDs to handle rapid re-triggering of the same key
  const timeoutsRef = useRef<Record<string, number>>({});

  const playNote = useCallback(async (note: NoteDefinition) => {
    // Ensure audio context is running
    await audioEngine.resume();
    
    // Play sound
    audioEngine.playTone(note.frequency);

    // Clear any pending removal for this key
    if (timeoutsRef.current[note.id]) {
      window.clearTimeout(timeoutsRef.current[note.id]);
    }

    // Visual feedback: Add key
    setActiveKeys(prev => {
      const newSet = new Set(prev);
      newSet.add(note.id);
      return newSet;
    });

    // Schedule removal
    const timeoutId = window.setTimeout(() => {
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(note.id);
        return newSet;
      });
      delete timeoutsRef.current[note.id];
    }, 400); // Duration keys stay visually "pressed"

    timeoutsRef.current[note.id] = timeoutId;
  }, [setActiveKeys]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const note = PIANO_KEYS.find(n => n.keyboardShortcut === key);
      if (note) {
        playNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playNote]);

  const renderKeys = () => {
    const keysElements: React.ReactNode[] = [];
    
    for (let i = 0; i < PIANO_KEYS.length; i++) {
      const note = PIANO_KEYS[i];
      
      // Skip black keys in the main loop, we handle them when processing the preceding white key
      if (note.type === 'black') continue;

      // It's a white key
      const nextNote = PIANO_KEYS[i + 1];
      const hasBlackKeyAfter = nextNote && nextNote.type === 'black';

      keysElements.push(
        <div key={note.id} className="relative flex-1 h-full">
          {/* White Key */}
          <button
            className={`
              w-full h-full 
              border-l border-b border-r border-gray-300 
              rounded-b-lg 
              flex flex-col justify-end items-center pb-4 
              transition-colors duration-75 ease-out
              focus:outline-none no-select
              ${activeKeys.has(note.id) ? 'bg-gray-200 key-active' : 'bg-white key-shadow'}
            `}
            onMouseDown={() => playNote(note)}
            onTouchStart={(e) => { e.preventDefault(); playNote(note); }}
          >
            {showLabels && (
              <span className="text-gray-500 font-semibold text-sm sm:text-base pointer-events-none mb-1 sm:mb-2">
                {note.label}
              </span>
            )}
            {/* Keyboard shortcut hint */}
            <span className="text-[10px] text-gray-300 absolute bottom-1 hidden lg:block">
              {note.keyboardShortcut.toUpperCase()}
            </span>
          </button>

          {/* Black Key (if applicable) */}
          {hasBlackKeyAfter && (
            <button
              className={`
                absolute z-10 
                w-[60%] h-[60%] 
                -right-[30%] top-0 
                rounded-b-md 
                flex flex-col justify-end items-center pb-3
                transition-transform duration-75
                focus:outline-none no-select
                ${activeKeys.has(nextNote.id) 
                  ? 'bg-gray-800 black-key-active' 
                  : 'bg-black text-white black-key-shadow bg-gradient-to-b from-gray-900 to-black'}
              `}
              onMouseDown={(e) => { e.stopPropagation(); playNote(nextNote); }}
              onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); playNote(nextNote); }}
            >
              {showLabels && (
                <div className="flex flex-col items-center leading-none pointer-events-none">
                   <span className="text-yellow-500 text-[10px] sm:text-xs font-bold mb-0.5">
                    {nextNote.label}
                  </span>
                  {nextNote.subLabel && (
                    <span className="text-white text-[10px] sm:text-xs opacity-80">
                      {nextNote.subLabel}
                    </span>
                  )}
                </div>
              )}
               <span className="text-[9px] text-gray-600 absolute top-2 hidden lg:block">
                 {nextNote.keyboardShortcut.toUpperCase()}
               </span>
            </button>
          )}
        </div>
      );
    }

    return keysElements;
  };

  return (
    <div className="w-full h-full bg-gray-100 p-2 sm:p-4 rounded-xl shadow-inner relative overflow-hidden flex flex-col">
        {/* Scrollable Container for keys */}
        <div className="flex-1 w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
            {/* 
                Piano Bed:
                min-w-[500px] ensures keys are playable on mobile (horizontal scroll) but 20% smaller than before.
                landscape:min-w-0 ensures it fits to screen in landscape mode without forced scrolling.
            */}
            <div className="h-full min-w-[500px] landscape:min-w-0 w-full bg-white relative flex rounded shadow-lg overflow-hidden">
                <div className="w-full h-2 bg-gray-800 absolute top-0 left-0 z-20"></div> {/* Felt strip */}
                {renderKeys()}
            </div>
        </div>
        {/* Mobile scroll hint */}
        <div className="text-center text-xs text-gray-400 mt-1 sm:hidden landscape:hidden">
            ↔ 좌우로 스크롤하여 연주하세요
        </div>
    </div>
  );
};