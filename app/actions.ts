"use server";

import { TfIdf } from "natural";

export async function getSimilarTitle(data) {
  const { title, content, documents } = data;

  const tfidf = new TfIdf();

  const notes = documents?.map(({ title, content }) => ({ title, content }));

  notes?.forEach((note) => tfidf.addDocument(note.title + " " + note.content));

  const threshold = 0.5;
  const matched: Array<any> = [];

  tfidf.tfidfs(title + " " + content, function (i, measure) {
    if (measure >= threshold) {
      matched.push({
        index: i,
        score: measure,
        note: notes[i],
      });
    }
  });

  matched.sort((a, b) => a.score - b.score);

  return matched;
}
