import { createFileRoute } from "@tanstack/react-router";
import { students } from "@/data/course";

const arabicDigits = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "أسماء الطالبات | الأحماض والقواعد" },
      { name: "description", content: "فريق إعداد موقع الأحماض والقواعد التعليمي." },
      { property: "og:title", content: "أسماء الطالبات | الأحماض والقواعد" },
      { property: "og:description", content: "فريق إعداد موقع الأحماض والقواعد التعليمي." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-9">
      <article className="glass rounded-[28px] p-6 text-center sm:p-10">
        <p className="font-bold text-secondary">فريق العمل</p>
        <h1 className="mt-2 text-3xl font-extrabold text-foreground">أسماء الطالبات</h1>
        <ol className="mt-8 grid gap-3 text-right">
          {students.map((name, i) => (
            <li key={name} className="lesson-tab flex items-center gap-4 rounded-2xl p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-extrabold text-primary-foreground">
                {arabicDigits[i]}
              </span>
              <span className="text-lg font-bold text-foreground">{name}</span>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
