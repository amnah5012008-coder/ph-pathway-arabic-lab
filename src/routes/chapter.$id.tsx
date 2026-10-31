import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { chapters } from "@/data/course";
import { Quiz } from "@/components/Quiz";
import lesson1 from "@/content/lesson-1.html?raw";
import lesson2 from "@/content/lesson-2.html?raw";
import lesson3 from "@/content/lesson-3.html?raw";
import lesson4 from "@/content/lesson-4.html?raw";

const lessonHtml: Record<string, string> = { "1": lesson1, "2": lesson2, "3": lesson3, "4": lesson4 };

export const Route = createFileRoute("/chapter/$id")({
  loader: ({ params }) => {
    const chapter = chapters.find((c) => c.id === params.id);
    if (!chapter) throw notFound();
    return { chapter };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.chapter.code} ${loaderData.chapter.title} | الأحماض والقواعد` : "الفصل غير موجود";
    const d = loaderData ? `ملخص وخرائط ذهنية و10 أسئلة تحصيلي تفاعلية لدرس ${loaderData.chapter.title}.` : "الفصل غير موجود";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter } = Route.useLoaderData();
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-9">
      <article
        key={chapter.id}
        className="lesson-panel glass rounded-[28px] p-5 sm:p-9"
        style={{ ["--accent" as string]: chapter.accent }}
      >
        <h1 className="text-2xl font-extrabold" style={{ color: chapter.accent }}>
          {chapter.code} {chapter.title}
        </h1>
        {chapter.summarySource === "awaiting" && (
          <p role="status" className="review-flag mt-5 rounded-lg px-4 py-3 font-bold">
            بانتظار المادة المصدرية — الملخص الحالي مسودة غير معتمدة، ويحتاج مراجعة المعلمة.
          </p>
        )}
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lessonHtml[chapter.id] ?? "" }} />
        <Quiz questions={chapter.questions} title="أسئلة التحصيلي لهذا الدرس" />
      </article>

      <nav className="mt-8 flex flex-wrap justify-between gap-3" aria-label="التنقل بين الفصول">
        {prev ? (
          <Link to="/chapter/$id" params={{ id: prev.id }} className="lesson-tab rounded-xl px-5 py-3 text-foreground">
            → {prev.code} {prev.title}
          </Link>
        ) : (
          <Link to="/" className="lesson-tab rounded-xl px-5 py-3 text-foreground">→ الرئيسية</Link>
        )}
        {next ? (
          <Link to="/chapter/$id" params={{ id: next.id }} className="lesson-tab rounded-xl px-5 py-3 text-foreground">
            {next.code} {next.title} ←
          </Link>
        ) : (
          <Link to="/final" className="lesson-tab rounded-xl px-5 py-3 text-foreground">الاختبار النهائي ←</Link>
        )}
      </nav>
    </div>
  );
}
