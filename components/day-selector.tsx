"use client"

import { DAY_ORDERS, classesScheduled } from "@/lib/timetable-data"

export function DaySelector({
  dateValue,
  onDateChange,
  selectedOrder,
  todayOrder,
  onSelectOrder,
  holidayNote,
}: {
  dateValue: string
  onDateChange: (v: string) => void
  selectedOrder: number
  todayOrder: number | null
  onSelectOrder: (order: number) => void
  holidayNote: string | null
}) {
  const scheduled = classesScheduled(selectedOrder)

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-border bg-panel p-6">
      <div>
        <label htmlFor="pick-date" className="font-mono text-[10px] tracking-label text-muted-foreground">
          PICK DATE
        </label>
        <input
          id="pick-date"
          type="date"
          value={dateValue}
          onChange={(e) => onDateChange(e.target.value)}
          className="mt-3 w-full rounded-xl border border-input bg-panel-2/60 px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20 [color-scheme:dark]"
        />
      </div>

      <div>
        <p className="font-mono text-[10px] tracking-label text-muted-foreground">DAY ORDER</p>
        <div role="tablist" aria-label="Select day order" className="mt-3 flex flex-col gap-2.5">
          {DAY_ORDERS.map((order) => {
            const active = order === selectedOrder
            const isToday = order === todayOrder
            return (
              <button
                key={order}
                role="tab"
                aria-selected={active}
                onClick={() => onSelectOrder(order)}
                className={[
                  "group relative flex flex-col rounded-xl border px-4 py-3 text-left transition-all",
                  active
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_0_1px_var(--primary)]"
                    : "border-border bg-panel-2/40 hover:border-border hover:bg-panel-2/70",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] tracking-label text-muted-foreground">ORDER</span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span
                    className={[
                      "text-lg font-bold",
                      active ? "text-primary" : "text-foreground",
                    ].join(" ")}
                  >
                    Day {order}
                  </span>
                </span>
                {isToday && (
                  <span className="mt-1.5 inline-flex w-fit rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[9px] tracking-label text-primary">
                    TODAY
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {holidayNote ? (
        <div className="rounded-xl border border-course-amber/40 bg-course-amber/[0.06] p-4">
          <p className="font-mono text-[10px] tracking-label text-course-amber">SELECTED DATE</p>
          <div className="mt-2">
            <p className="text-2xl font-black text-foreground">Holiday</p>
            <p className="text-xs text-muted-foreground">{holidayNote}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-panel-2/40 p-4">
          <p className="font-mono text-[10px] tracking-label text-muted-foreground">SELECTED LOADOUT</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-foreground">Day {selectedOrder}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{scheduled}</span> classes scheduled
              </p>
            </div>
            <span className="rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
              D{selectedOrder}/5
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}
