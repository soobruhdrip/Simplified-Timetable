"use client"

import { useEffect, useMemo, useState } from "react"
import { Info } from "lucide-react"
import {
  PERIOD_TIMES,
  SCHEDULE,
  dayOrderForDate,
  calendarEntryForDate,
  nextWorkingDay,
  classesScheduled,
  formatDate,
  formatLongDate,
  weekdayName,
  formatClock,
  toDateInputValue,
  fromDateInputValue,
  isSameDay,
} from "@/lib/timetable-data"
import { BoardHero } from "@/components/board-hero"
import { DaySelector } from "@/components/day-selector"
import { ClassRow, FreePeriodRow } from "@/components/period-row"
import { HolidayCard } from "@/components/holiday-card"
import { CourseMap } from "@/components/course-map"
import { WeekGlance } from "@/components/week-glance"

export function TimetableBoard() {
  const [now, setNow] = useState<Date | null>(null)
  const [dateValue, setDateValue] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<number>(1)
  const [manualOverride, setManualOverride] = useState(false)

  // Initialize from the real "today" only on the client to avoid hydration drift.
  useEffect(() => {
    const d = new Date()
    setNow(d)
    setDateValue(toDateInputValue(d))
    const order = dayOrderForDate(d)
    setSelectedOrder(order ?? 1)
  }, [])

  // Live clock, once per second.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const selectedDate = dateValue ? fromDateInputValue(dateValue) : new Date()
  const entry = calendarEntryForDate(selectedDate)
  const dateDayOrder = entry?.dayOrder ?? null
  const todayOrder = now ? dayOrderForDate(now) : null

  // The next class day is used for the holiday banner + card.
  const upcoming = useMemo(() => nextWorkingDay(selectedDate), [dateValue])

  // Holiday view: a real holiday date, unless the user manually picks an order to preview.
  const dateIsHoliday = entry?.isHoliday ?? false
  const viewingHoliday = dateIsHoliday && !manualOverride
  const selectedIsToday = now ? isSameDay(selectedDate, now) : false

  function handleDateChange(v: string) {
    setDateValue(v)
    setManualOverride(false)
    const order = dayOrderForDate(fromDateInputValue(v))
    if (order) setSelectedOrder(order)
    else if (nextWorkingDay(fromDateInputValue(v))?.dayOrder)
      setSelectedOrder(nextWorkingDay(fromDateInputValue(v))!.dayOrder!)
  }

  function handleSelectOrder(order: number) {
    setSelectedOrder(order)
    setManualOverride(true)
  }

  // "NOW" highlight applies only when viewing today's real day order.
  const showLive = !manualOverride && !dateIsHoliday && todayOrder != null && selectedOrder === todayOrder
  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1
  const nowPeriod = useMemo(() => {
    if (!showLive) return null
    return PERIOD_TIMES.find((p) => nowMinutes >= p.startMin && nowMinutes < p.endMin)?.period ?? null
  }, [showLive, nowMinutes])

  const daySchedule = SCHEDULE[selectedOrder] ?? {}
  const scheduled = classesScheduled(selectedOrder)

  const dayOrderLabel = viewingHoliday ? "Holiday" : dateDayOrder ? `Day ${dateDayOrder}` : `Day ${selectedOrder}`

  return (
    <main className="board-grid min-h-screen w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {viewingHoliday && (
          <div className="flex items-start gap-3 rounded-2xl border border-course-amber/40 bg-course-amber/[0.06] px-5 py-3.5">
            <Info className="mt-0.5 size-4 shrink-0 text-course-amber" />
            <p className="font-mono text-xs leading-relaxed text-course-amber">
              This date does not consume a day order.
              {upcoming
                ? ` Classes resume on ${formatLongDate(upcoming.date)} as Day ${upcoming.dayOrder}.`
                : " No further working days are published in the calendar."}
            </p>
          </div>
        )}

        <BoardHero
          weekday={weekdayName(selectedDate)}
          dateLabel={formatDate(selectedDate)}
          dayOrderLabel={dayOrderLabel}
          clock={now ? formatClock(now) : "--:-- --"}
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <DaySelector
            dateValue={dateValue ?? ""}
            onDateChange={handleDateChange}
            selectedOrder={selectedOrder}
            todayOrder={todayOrder}
            onSelectOrder={handleSelectOrder}
            holidayNote={viewingHoliday ? entry?.note ?? "Holiday" : null}
          />

          <div className="flex flex-col gap-3">
            {viewingHoliday ? (
              <HolidayCard
                isToday={selectedIsToday}
                reason={entry?.note ?? ""}
                nextLabel={upcoming ? formatLongDate(upcoming.date) : null}
                nextOrder={upcoming?.dayOrder ?? null}
              />
            ) : (
              <>
                {PERIOD_TIMES.map((time) => {
                  const slot = daySchedule[time.period]
                  if (!slot) return <FreePeriodRow key={time.period} time={time} />
                  return <ClassRow key={time.period} slot={slot} time={time} isNow={nowPeriod === time.period} />
                })}
                {scheduled === 0 && (
                  <p className="px-2 py-1 text-sm text-muted-foreground">
                    No classes recorded for Day {selectedOrder}.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <CourseMap />
        <WeekGlance selectedOrder={selectedOrder} />

        <footer className="pb-6 pt-2 text-center font-mono text-[10px] tracking-label text-muted-foreground/60">
          CLASS BOARD · BATCH 2 · LIVE DAY-ORDER ROTATION
        </footer>
      </div>
    </main>
  )
}
