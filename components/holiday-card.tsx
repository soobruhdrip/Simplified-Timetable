import { Coffee } from "lucide-react"

export function HolidayCard({
  isToday,
  reason,
  nextLabel,
  nextOrder,
}: {
  isToday: boolean
  reason: string
  nextLabel: string | null
  nextOrder: number | null
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-course-amber/40 bg-course-amber/[0.06] px-6 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-course-amber/15 text-course-amber">
        <Coffee className="size-7" />
      </span>

      <h2 className="text-2xl font-black text-foreground text-balance">
        {isToday ? "Today is a holiday" : "This is a holiday"}
      </h2>

      <p className="max-w-sm leading-relaxed text-muted-foreground text-pretty">
        {reason ? `${reason} — no classes are scheduled for this date.` : "No classes are scheduled for this date."}
      </p>

      {nextLabel && (
        <p className="mt-1 font-mono text-[11px] tracking-label text-course-amber">
          NEXT WORKING DAY: {nextLabel.toUpperCase()}
          {nextOrder ? ` · DAY ${nextOrder}` : ""}
        </p>
      )}
    </div>
  )
}
