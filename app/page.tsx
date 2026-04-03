"use client";
// import notes from './data.json';
import Note from "./Note";
import CreateNote from "./CreateNote";
import { db, NoteType } from "@/lib/dexie/db";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getSimilarTitle } from "./actions";

export default function Home() {
  const [similar, setSimilar] = useState<Array<any>>();
  const [hasTyped, setHasTyped] = useState<boolean>(false);

  const notes = useLiveQuery(async () => {
    return db.notes.toArray();
  }, []);

  const handleNewSearch = async (title, content) => {
    setHasTyped(title || content);
    const similarNotes = await getSimilarTitle({
      title: title,
      content: content,
      documents: notes,
    });
    setSimilar(similarNotes);
  };

  const notesColumn = useMemo(() => {
    const colCount = 4;
    const colums: Array<Array<NoteType>> = Array.from(
      { length: colCount },
      () => [],
    );
    if (hasTyped) {
      similar?.forEach((item, index) => {
        colums[index % colCount].push(item.note);
      });
    } else {
      notes?.forEach((item, index) => {
        colums[index % colCount].push(item);
      });
    }

    return colums;
  }, [notes, similar]);

  return (
    <main className="container p-4 mx-auto space-y-5">
      <section>
        <CreateNote
          onContentChange={handleNewSearch}
          onTitleChange={handleNewSearch}
        />
      </section>

      <section></section>

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
