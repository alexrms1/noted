import type { Table } from "dexie";
import Dexie from "dexie";

export interface NoteType {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

const getNow = () => new Date(Date.now()).toISOString()
class NoteDB extends Dexie {
  notes!: Table<NoteType>;

  constructor() {
    super("NoteDB");
    this.version(1).stores({
      notes: "++id, title, content, created_at, updated_at",
    });

    this.notes.hook("creating", (primKey, obj) => {
      const now = getNow();
      obj.created_at = now;
      obj.updated_at = now;
    });

    this.notes.hook("updating", (mods, primKey, obj) => {
      return { updated_at: getNow() };
    });
  }
}

export const db = new NoteDB();
