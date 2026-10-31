import { describe, expect, it } from "vitest";
import { chapters, finalExam, students } from "@/data/course";
import { scoreAnswers } from "@/components/Quiz";

describe("course rules", () => {
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
    const qs = chapters[0].questions;
    expect(scoreAnswers(qs, { [qs[0].id]: 1, [qs[1].id]: 0 })).toBe(1);
  });
});
