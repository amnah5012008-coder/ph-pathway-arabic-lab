<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Lesson summaries remain raw HTML in src/content/lesson-N.html with the Canva layout, updated only from supplied source facts; questions remain separately source-flagged in src/data/course.ts so summary edits cannot silently replace quizzes.
- Chapter summarySource controls the visible awaiting-source notice independently of quiz source flags, so a draft summary cannot appear approved because a quiz contains verified questions.
