import type { Table } from 'dexie';
import Dexie from 'dexie';

export interface Note {
	id?: number;
	title: string;
	content: string;
	created_at?: string;
	updated_at?: boolean;
}

class NoteDB extends Dexie {
	notes!: Table<Note>;

	constructor() {
		super('NoteDB');
		this.version(1).stores({
			notes: '++id, title, content, created_at, updated_at',
		});
	}
}

export const db = new NoteDB();
