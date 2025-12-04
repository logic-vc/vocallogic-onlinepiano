import { NoteDefinition } from './types';

// Frequencies calculated roughly on A4 = 440Hz
const getFrequency = (note: string, octave: number) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const semitonesFromA4 = notes.indexOf(note) - notes.indexOf('A') + (octave - 4) * 12;
  return 440 * Math.pow(2, semitonesFromA4 / 12);
};

// Two octaves + 1 note mapping (C3 to C5) to match the visual style and be playable on a keyboard
const rawKeys: Omit<NoteDefinition, 'frequency'>[] = [
  // Octave 3
  { id: 'C3', note: 'C', octave: 3, type: 'white', label: 'C3', keyboardShortcut: 'z' },
  { id: 'C#3', note: 'C#', octave: 3, type: 'black', label: 'C#3', keyboardShortcut: 's' },
  { id: 'D3', note: 'D', octave: 3, type: 'white', label: 'D3', keyboardShortcut: 'x' },
  { id: 'D#3', note: 'D#', octave: 3, type: 'black', label: 'D#3', keyboardShortcut: 'd' },
  { id: 'E3', note: 'E', octave: 3, type: 'white', label: 'E3', keyboardShortcut: 'c' },
  { id: 'F3', note: 'F', octave: 3, type: 'white', label: 'F3', keyboardShortcut: 'v' },
  { id: 'F#3', note: 'F#', octave: 3, type: 'black', label: 'F#3', keyboardShortcut: 'g' },
  { id: 'G3', note: 'G', octave: 3, type: 'white', label: 'G3', keyboardShortcut: 'b' },
  { id: 'G#3', note: 'G#', octave: 3, type: 'black', label: 'G#3', keyboardShortcut: 'h' },
  { id: 'A3', note: 'A', octave: 3, type: 'white', label: 'A3', keyboardShortcut: 'n' },
  { id: 'A#3', note: 'A#', octave: 3, type: 'black', label: 'A#3', keyboardShortcut: 'j' },
  { id: 'B3', note: 'B', octave: 3, type: 'white', label: 'B3', keyboardShortcut: 'm' },
  
  // Octave 4
  { id: 'C4', note: 'C', octave: 4, type: 'white', label: 'C4', keyboardShortcut: 'q' },
  { id: 'C#4', note: 'C#', octave: 4, type: 'black', label: 'C#4', keyboardShortcut: '2' },
  { id: 'D4', note: 'D', octave: 4, type: 'white', label: 'D4', keyboardShortcut: 'w' },
  { id: 'D#4', note: 'D#', octave: 4, type: 'black', label: 'D#4', keyboardShortcut: '3' },
  { id: 'E4', note: 'E', octave: 4, type: 'white', label: 'E4', keyboardShortcut: 'e' },
  { id: 'F4', note: 'F', octave: 4, type: 'white', label: 'F4', keyboardShortcut: 'r' },
  { id: 'F#4', note: 'F#', octave: 4, type: 'black', label: 'F#4', keyboardShortcut: '5' },
  { id: 'G4', note: 'G', octave: 4, type: 'white', label: 'G4', keyboardShortcut: 't' },
  { id: 'G#4', note: 'G#', octave: 4, type: 'black', label: 'G#4', keyboardShortcut: '6' },
  { id: 'A4', note: 'A', octave: 4, type: 'white', label: 'A4', keyboardShortcut: 'y' },
  { id: 'A#4', note: 'A#', octave: 4, type: 'black', label: 'A#4', keyboardShortcut: '7' },
  { id: 'B4', note: 'B', octave: 4, type: 'white', label: 'B4', keyboardShortcut: 'u' },

  // Octave 5 (Just C to finish the look)
  { id: 'C5', note: 'C', octave: 5, type: 'white', label: 'C5', keyboardShortcut: 'i' },
];

export const PIANO_KEYS: NoteDefinition[] = rawKeys.map(key => ({
  ...key,
  frequency: getFrequency(key.note, key.octave)
}));