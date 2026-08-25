import { PERIOD_TIMES, SCHEDULE, DAY_ORDERS, COURSES, courseAccent, courseCodeShort } from "@/lib/timetable-data-index"

export function WeekGlance({ selectedOrder }: { selectedOrder: number }) {
  return (
    <section className="rounded-3xl border border-border bg-panel p-6">
      <p className="font-mono text-[10px] tracking-label text-muted-foreground">WEEK AT A GLANCE</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2.5 pr-4 font-mono text-[10px] tracking-label text-muted-foreground">Period</th>
              {DAY_ORDERS.map((d) => (
                <th
                  key={d}
                  className={[
                    "px-3 py-2.5 font-mono text-[10px] tracking-label",
                    d === selectedOrder ? "text-primary" : "text-muted-foreground",
                  ].join(" ")}
                >
                  Day {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIOD_TIMES.map((pt) => (
              <tr key={pt.period} className="border-b border-border/40 last:border-0">
                <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">P{pt.period}</td>
                {DAY_ORDERS.map((d) => {
                  const slot = SCHEDULE[d]?.[pt.period]
                  const highlight = d === selectedOrder
                  if (!slot) {
                    return (
                      <td
                        key={d}
                        className={[
                          "px-3 py-2 font-mono text-xs text-muted-foreground/30",
                          highlight ? "bg-primary/[0.04]" : "",
                        ].join(" ")}
                      >
                        —
                      </td>
                    )
                  }
                  const accent = courseAccent(COURSES[slot.courseCode].color)
                  return (
                    <td
                      key={d}
                      className={["px-3 py-2 font-mono text-xs font-medium", highlight ? "bg-primary/[0.04]" : ""].join(
                        " ",
                      )}
                      style={{ color: accent }}
                    >
                      {courseCodeShort(slot.courseCode)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
