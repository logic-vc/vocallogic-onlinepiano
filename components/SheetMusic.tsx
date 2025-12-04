import React from 'react';
import { PIANO_KEYS } from '../constants';

interface SheetMusicProps {
  activeKeys: Set<string>;
}

export const SheetMusic: React.FC<SheetMusicProps> = ({ activeKeys }) => {
  // SVG Config
  const width = 600;
  const height = 240;
  const centerY = 120; // C4 position
  const step = 8; // Half space height
  
  // Helper to get Y position relative to C4
  const getNotePosition = (noteId: string) => {
    const noteDef = PIANO_KEYS.find(n => n.id === noteId);
    if (!noteDef) return null;

    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const baseOctave = 4;
    const noteIndex = notes.indexOf(noteDef.note.replace('#', ''));
    const octaveDiff = noteDef.octave - baseOctave;
    
    // Position 0 is C4. 
    // Higher pitch -> Lower Y value -> Positive math position
    const position = noteIndex + (octaveDiff * 7);
    return {
      y: centerY - (position * step),
      isSharp: noteDef.note.includes('#'),
      position // raw position for stem direction
    };
  };

  const renderStaves = () => {
    const lines = [];
    // Treble Lines: E4(2), G4(4), B4(6), D5(8), F5(10)
    const treblePositions = [2, 4, 6, 8, 10];
    // Bass Lines: G2(-10), B2(-8), D3(-6), F3(-4), A3(-2)
    const bassPositions = [-10, -8, -6, -4, -2];

    const drawLine = (pos: number, key: string) => (
      <line 
        key={key}
        x1="40" x2={width - 40} 
        y1={centerY - (pos * step)} 
        y2={centerY - (pos * step)} 
        stroke="#9ca3af" // gray-400
        strokeWidth="1" 
      />
    );

    lines.push(...treblePositions.map((p, i) => drawLine(p, `t-${i}`)));
    lines.push(...bassPositions.map((p, i) => drawLine(p, `b-${i}`)));

    // Brace / Vertical bars
    const topY = centerY - (10 * step);
    const bottomY = centerY - (-10 * step);
    lines.push(<line key="start-bar" x1="40" x2="40" y1={topY} y2={bottomY} stroke="#374151" strokeWidth="3" />);
    lines.push(<line key="end-bar" x1={width - 40} x2={width - 40} y1={topY} y2={bottomY} stroke="#374151" strokeWidth="3" />);
    
    // Clefs
    // Adjusted positions manually to align with standard G-line and F-line
    // Treble: Moved up 1 space (16px) from -12 to -28
    lines.push(
      <text key="treble-clef" x="45" y={centerY - 28} fontSize="72" fontFamily="serif" fill="#1f2937">𝄞</text>
    );
    // Bass: Moved down 2 spaces (32px) from +52 to +84
     lines.push(
      <text key="bass-clef" x="45" y={centerY + 84} fontSize="60" fontFamily="serif" fill="#1f2937">𝄢</text>
    );

    return lines;
  };

  const renderActiveNotes = () => {
    return Array.from(activeKeys).map((keyId: string) => {
      const info = getNotePosition(keyId);
      if (!info) return null;
      
      const { y, isSharp, position } = info;
      const x = width / 2; // Center notes horizontally

      // Ledger lines
      const ledgerLines = [];
      // Middle C (0) needs line
      if (position === 0) {
        ledgerLines.push(<line key="ledger-0" x1={x-16} x2={x+16} y1={y} y2={y} stroke="#000" strokeWidth="1.5" />);
      }
      
      // Stem direction: >= 6 (B4) down, else up
      const stemUp = position < 6;
      const stemHeight = 35;

      return (
        <g key={keyId}>
          {ledgerLines}
          
          {/* Note Head - Rotate slightly for realistic look */}
          <ellipse cx={x} cy={y} rx="9" ry="6.5" fill="#000" transform={`rotate(-15 ${x} ${y})`} />
          
          {/* Stem */}
          <line 
            x1={stemUp ? x + 8 : x - 8} 
            y1={stemUp ? y + 2 : y - 2} 
            x2={stemUp ? x + 8 : x - 8} 
            y2={stemUp ? y - stemHeight : y + stemHeight} 
            stroke="#000" 
            strokeWidth="1.5" 
          />

          {/* Sharp Symbol */}
          {isSharp && (
             <text x={x - 30} y={y + 8} fontSize="24" fontFamily="serif" fill="#000">♯</text>
          )}
        </g>
      );
    });
  };

  return (
    <div className="w-full flex justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8 overflow-hidden">
      <div className="w-full max-w-3xl aspect-[2.5/1] sm:aspect-[3/1]">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          {renderStaves()}
          {renderActiveNotes()}
        </svg>
      </div>
    </div>
  );
};