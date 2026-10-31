import { createFileRoute, Link } from "@tanstack/react-router";
import { finalExam } from "@/data/course";
import { Quiz } from "@/components/Quiz";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "الاختبار النهائي الشامل | الأحماض والقواعد" },
      { name: "description", content: "اختبار نهائي تفاعلي بأسئلة جديدة يغطي الفصول الأربعة في الأحماض والقواعد." },
      { property: "og:title", content: "الاختبار النهائي الشامل | الأحماض والقواعد" },
      { property: "og:description", content: "أسئلة جديدة تغطي الفصول الأربعة مع التصحيح الفوري." },
    ],
  }),
  component: FinalPage,
});

function FinalPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-9">
      <article className="lesson-panel glass rounded-[28px] p-5 sm:p-9" style={{ ["--accent" as string]: "#c7f46e" }}>
        <p className="font-bold text-secondary">شامل للفصول ٢–١ إلى ٢–٤</p>
        <h1 className="mt-2 text-3xl font-extrabold text-primary">الاختبار النهائي</h1>
        <p className="mt-3 text-muted-foreground">
          {finalExam.length} سؤالًا جديدًا غير مكرر من اختبارات الفصول. اختاري إجابة لتظهر النتيجة والإجابة الصحيحة فورًا.
        </p>
        <Quiz questions={finalExam} title="أسئلة الاختبار النهائي" />
      </article>
      <div className="mt-8 flex justify-end">
        <Link to="/team" className="lesson-tab rounded-xl px-5 py-3 text-foreground">أسماء الطالبات ←</Link>
      </div>
    </div>
  );
}
