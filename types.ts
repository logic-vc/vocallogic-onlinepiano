export interface NoteDefinition {
  id: string;
  note: string; // e.g., "C", "D#"
  octave: number;
  frequency: number;
  type: 'white' | 'black';
  label: string; // e.g., "C3"
  subLabel?: string; // e.g., "Db3"
  keyboardShortcut: string; // e.g., "a", "w"
}

export type AudioState = 'suspended' | 'running' | 'closed';