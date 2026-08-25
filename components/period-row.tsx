import { FlaskConical, GraduationCap, User, MapPin } from "lucide-react"
import { COURSES, courseAccent, type ClassSlot, type PeriodTime } from "@/lib/timetable-data-index"

function PeriodStamp({ period, start, end, dim }: { period: number; start: string; end: string; dim?: boolean }) {
  return (
    <div className="flex w-20 shrink-0 flex-col justify-center gap-1 border-r border-border/60 pr-4">
      <span
        className={[
          "font-mono text-[10px] tracking-label",
          dim ? "text-muted-foreground/60" : "text-muted-foreground",
        ].join(" ")}
      >
        P{period}
      </span>
      <span className={["font-mono text-sm font-semibold", dim ? "text-muted-foreground/70" : "text-foreground"].join(" ")}>
        {start}
      </span>
      <span className="font-mono text-xs text-muted-foreground/60">{end}</span>
    </div>
  )
}

export function FreePeriodRow({ time }: { time: PeriodTime }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border/50 bg-panel/40 px-4 py-4">
      <PeriodStamp period={time.period} start={time.start} end={time.end} dim />
      <div>
        <p className="font-mono text-[10px] tracking-label text-muted-foreground/70">IDLE SLOT</p>
        <p className="text-sm text-muted-foreground/60">Free period</p>
      </div>
    </div>
  )
}

export function ClassRow({ slot, time, isNow }: { slot: ClassSlot; time: PeriodTime; isNow?: boolean }) {
  const course = COURSES[slot.courseCode]
  const accent = courseAccent(course.color)
  const isLab = slot.type === "LAB"

  return (
    <div
      className="relative flex items-stretch gap-4 overflow-hidden rounded-2xl border bg-panel px-4 py-4 transition-colors"
      style={{
        borderColor: isNow ? accent : "var(--border)",
        boxShadow: isNow ? `0 0 0 1px ${accent}, 0 12px 40px -20px ${accent}` : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ background: accent, opacity: 0.9 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent 60%)` }}
        aria-hidden
      />

      <PeriodStamp period={time.period} start={time.start} end={time.end} />

      <div className="relative flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="size-2.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
          <h3 className="text-base font-bold text-foreground" style={{ color: accent }}>
            {course.name}
          </h3>

          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] tracking-label"
            style={{ background: `color-mix(in oklch, ${accent} 16%, transparent)`, color: accent }}
          >
            {isLab ? <FlaskConical className="size-3" /> : <GraduationCap className="size-3" />}
            {slot.type}
          </span>

          <span className="rounded-md border border-border bg-panel-2/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {slot.courseCode}
          </span>

          {isNow && (
            <span
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] tracking-label"
              style={{ background: `color-mix(in oklch, ${accent} 20%, transparent)`, color: accent }}
            >
              <span className="size-1.5 animate-pulse rounded-full" style={{ background: accent }} />
              NOW
            </span>
          )}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-panel-2/40 px-3 py-2">
            <User className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm text-foreground">{slot.faculty}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-panel-2/40 px-3 py-2">
            <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm text-muted-foreground">
              {slot.building} · {slot.floor} · {slot.room}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
