"use client";
// import notes from './data.json';
import Note from "./Note";
import CreateNote from "./CreateNote";
import { db, NoteType } from "@/lib/dexie/db";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const notes = useLiveQuery(async () => {
    return db.notes.toArray();
  }, []);

  const handleContentChange = (value) => {};
  const handleTitleChange = (value) => {};

  const notesColumn = useMemo(() => {
    const colCount = 4;
    const colums: Array<Array<NoteType>> = Array.from(
      { length: colCount },
      () => [],
    );
    notes?.forEach((item, index) => {
      colums[index % colCount].push(item);
    });

    return colums;
  }, [notes]);

  return (
    <main className="container p-4 mx-auto space-y-5">
      <section>
        <CreateNote
          onContentChange={handleContentChange}
          onTitleChange={handleTitleChange}
        />
      </section>

      <section>
        <div className="grid lg:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-4">
          {notesColumn?.map((col, colIndex) => (
            <motion.div
              key={colIndex}
              layout="position"
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {col?.map((note) => (
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
          ))}
        </div>
      </section>
    </main>
  );
}
