import { useState } from "react";
import type { Question } from "@/data/course";

const letters = ["أ", "ب", "ج", "د"];

export function scoreAnswers(questions: Question[], answers: Record<string, number>) {
  return questions.filter((q) => answers[q.id] === q.correct).length;
}

export function Quiz({ questions, title }: { questions: Question[]; title: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answered = Object.keys(answers).length;
  const score = scoreAnswers(questions, answers);
  const done = answered === questions.length;

  return (
    <section aria-label={title}>
      <div className="mb-5 mt-10 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <span className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          أُجيب: <b className="text-foreground">{answered}</b>/{questions.length} · الدرجة:{" "}
          <b className="text-primary">{score}</b>
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {questions.map((q, i) => {
          const picked = answers[q.id];
          const isAnswered = picked !== undefined;
          return (
            <article key={q.id} className="glass rounded-2xl p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  السؤال {i + 1}
                </span>
              </div>
              <h4 className="mb-4 font-bold leading-relaxed text-foreground">{q.text}</h4>
              <div className="grid gap-2">
                {q.choices.map((c, ci) => {
                  let cls = "q-choice";
                  if (isAnswered && ci === q.correct) cls += " is-correct";
                  else if (isAnswered && ci === picked) cls += " is-wrong";
                  return (
                    <button
                      key={ci}
                      type="button"
                      className={cls}
                      disabled={isAnswered}
                      aria-pressed={picked === ci}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: ci }))}
                    >
                      {letters[ci]} — <bdi>{c}</bdi>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className="answer mt-4 rounded-lg p-3 text-sm leading-relaxed" role="status">
                  {picked === q.correct ? "✓ إجابة صحيحة. " : "✗ إجابة خاطئة. "}
                  الإجابة الصحيحة: {letters[q.correct]} — <bdi>{q.choices[q.correct]}</bdi>
                  {q.explanation && <> — {q.explanation}</>}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {answered > 0 && (
        <div className="glass mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <p className="font-bold text-foreground">
            {done ? "انتهى الاختبار — " : ""}نتيجتك: {score} من {questions.length}
          </p>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="action rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground"
          >
            إعادة الاختبار
          </button>
        </div>
      )}
    </section>
  );
}
