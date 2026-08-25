import { COURSES, courseAccent } from "@/lib/timetable-data-index"

export function CourseMap() {
  const courses = Object.values(COURSES)
  return (
    <section className="rounded-3xl border border-border bg-panel p-6">
      <p className="font-mono text-[10px] tracking-label text-muted-foreground">COURSE MAP</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {courses.map((course) => {
          const accent = courseAccent(course.color)
          return (
            <div
              key={course.code}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-panel-2/40 px-3 py-2.5"
            >
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
              <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                {course.code}
              </span>
              <span className="truncate text-sm text-muted-foreground">{course.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
