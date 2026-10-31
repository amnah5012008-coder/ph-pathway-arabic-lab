import { describe, expect, it } from "vitest";
import { chapters, finalExam, students } from "@/data/course";
import { scoreAnswers } from "@/components/Quiz";

describe("course rules", () => {
  it("uses provided summaries for Chapters 1 and 2", () => {
    expect(chapters.filter((c) => c.summarySource === "provided").map((c) => c.id)).toEqual(["1", "2"]);
  });
  it("keeps Chapters 3 and 4 awaiting source material", () => {
    expect(chapters.filter((c) => c.summarySource === "awaiting").map((c) => c.id)).toEqual(["3", "4"]);
  });
  it("has four chapters with 10 questions each", () => {
    expect(chapters).toHaveLength(4);
    chapters.forEach((c) => expect(c.questions).toHaveLength(10));
  });
  it("final exam questions are not repeated from chapter quizzes", () => {
    const chapterTexts = new Set(chapters.flatMap((c) => c.questions.map((q) => q.text)));
    finalExam.forEach((q) => expect(chapterTexts.has(q.text)).toBe(false));
  });
  it("lists students in the requested order", () => {
    expect(students).toEqual(["آمنه الحارثي", "الين القحطاني", "لمار الزهراني", "رنيم عاصم", "وايلان ياسر"]);
  });
  it("scores only correct answers", () => {
    const qs = chapters[0]?.questions;
    const first = qs?.[0];
    const second = qs?.[1];
    if (!qs || !first || !second) throw new Error("Missing chapter questions");
    expect(scoreAnswers(qs, { [first.id]: 1, [second.id]: 0 })).toBe(1);
  });
});
