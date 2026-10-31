import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { chapters, HERO_IMAGE } from "@/data/course";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الأحماض والقواعد | مختبر المراجعة" },
      { name: "description", content: "موقع تعليمي تفاعلي: مقياس pH، ملخصات وخرائط ذهنية لأربعة فصول، واختبارات تحصيلي." },
      { property: "og:title", content: "الأحماض والقواعد | مختبر المراجعة" },
      { property: "og:description", content: "مقياس pH تفاعلي وملخصات وخرائط ذهنية واختبارات للفصول الأربعة." },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

function PhScale() {
  const [value, setValue] = useState(7);
  const label = value < 7 ? "حمضي" : value > 7 ? "قاعدي" : "متعادل";
  const color = value < 7 ? "#f2b86b" : value > 7 ? "#67d8d5" : "#c7f46e";
  return (
    <section className="glass relative -mt-7 grid gap-8 rounded-[26px] p-6 sm:p-8 md:grid-cols-[1fr_auto]">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">جرّب مقياس الرقم الهيدروجيني</h2>
        <p className="mt-3 text-muted-foreground">حرّك المؤشر لترى الانتقال بين الحمضي والمتعادل والقاعدي.</p>
        <label htmlFor="ph-slider" className="mt-6 block font-bold text-foreground">
          قيمة pH
        </label>
        <div dir="ltr" className="mt-3">
          <input
            id="ph-slider"
            type="range"
            min={0}
            max={14}
            step={1}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>7</span>
            <span>14</span>
          </div>
          <div className="ph-track mt-2 h-1.5 rounded-full" />
        </div>
      </div>
      <div className="flex min-w-36 flex-col items-center justify-center rounded-2xl border border-border bg-muted/40 p-6" aria-live="polite">
        <span className="text-muted-foreground">pH</span>
        <span className="text-5xl font-extrabold" style={{ color }}>
          {value}
        </span>
        <span className="mt-2 font-bold" style={{ color }}>
          {label}
        </span>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="hero relative flex w-full items-center overflow-hidden">
        <img src={HERO_IMAGE} alt="عالِم يفحص سائلاً أزرق داخل مختبر يحوي أدوات زجاجية ومجهراً" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="orb left-[12%] top-[16%] h-14 w-14" />
        <div className="orb bottom-[12%] left-[34%] h-7 w-7" />
        <div dir="ltr" className="pointer-events-none absolute bottom-10 left-[15%] hidden select-none text-5xl font-extrabold text-foreground/20 md:block">
          H₃O⁺ · OH⁻
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-9">
          <span className="inline-block rounded-full border border-secondary/40 px-4 py-2 text-sm text-secondary">
            الفصل الثاني • الكيمياء
          </span>
          <h1 className="mt-8 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            الأحماض والقواعد .. اكتشف التفاعل
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            أربعة دروس، ملخصات واضحة، وأسئلة تحصيلي تكشف إجاباتها عندما تكون مستعدًا.
          </p>
          <a href="#lessons" className="action mt-8 inline-block rounded-xl bg-primary px-7 py-4 font-bold text-primary-foreground">
            ابدأ استكشاف الدروس ←
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-9">
        <PhScale />

        <section id="lessons" className="scroll-mt-20 pt-14">
          <p className="font-bold text-secondary">مسار التعلّم</p>
          <h2 className="mt-2 text-2xl font-extrabold text-foreground">اختر درسًا وابدأ المراجعة</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((c) => (
              <Link
                key={c.id}
                to="/chapter/$id"
                params={{ id: c.id }}
                className="lesson-tab rounded-2xl p-5"
                style={{ boxShadow: `inset 0 3px ${c.accent}` }}
              >
                <span className="text-sm font-bold" style={{ color: c.accent }}>
                  {c.code}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">ملخص وخرائط ذهنية · {c.questions.length} أسئلة</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/final" className="lesson-tab rounded-2xl p-5">
              <span className="text-sm font-bold text-primary">شامل للفصول الأربعة</span>
              <h3 className="mt-2 text-lg font-bold text-foreground">الاختبار النهائي ←</h3>
            </Link>
            <Link to="/team" className="lesson-tab rounded-2xl p-5">
              <span className="text-sm font-bold text-secondary">فريق العمل</span>
              <h3 className="mt-2 text-lg font-bold text-foreground">أسماء الطالبات ←</h3>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
