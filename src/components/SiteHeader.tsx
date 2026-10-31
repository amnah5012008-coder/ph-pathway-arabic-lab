import { Link } from "@tanstack/react-router";
import { chapters } from "@/data/course";

const linkCls =
  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";
const activeCls = { className: "bg-muted text-primary" };

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-9">
        <Link to="/" className="shrink-0 font-extrabold text-foreground">
          ◈ مختبر الأحماض والقواعد
        </Link>
        <nav aria-label="التنقل الرئيسي" className="-mx-1 flex flex-1 gap-1 overflow-x-auto px-1 sm:justify-end">
          <Link to="/" className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>
            الرئيسية
          </Link>
          {chapters.map((c) => (
            <Link key={c.id} to="/chapter/$id" params={{ id: c.id }} className={linkCls} activeProps={activeCls}>
              {c.code}
            </Link>
          ))}
          <Link to="/final" className={linkCls} activeProps={activeCls}>
            الاختبار النهائي
          </Link>
          <Link to="/team" className={linkCls} activeProps={activeCls}>
            الطالبات
          </Link>
        </nav>
      </div>
    </header>
  );
}
