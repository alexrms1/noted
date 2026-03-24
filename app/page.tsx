'use client';
// import notes from './data.json';
import Note from './Note';
import CreateNote from './CreateNote';
import { db } from '@/lib/dexie/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { AnimatePresence, motion } from 'motion/react';

export default function Home() {
	const notes = useLiveQuery(async () => {
		return db.notes.toArray();
	}, []);

	return (
		<main className='container p-4 mx-auto space-y-5'>
			<section>
				<CreateNote />
			</section>

			<section>
				<motion.div layout className='grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2'>
					<AnimatePresence mode='sync'>
						{notes?.map((note) => (
							<motion.div
								key={note.id}
								layout
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.25 }}
							>
								<Note note={note} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</section>
		</main>
	);
}
