export type CourseColor = "amber" | "teal" | "rose" | "blue" | "violet"

export type Course = {
  code: string
  name: string
  color: CourseColor
}

export type SlotType = "LAB" | "LECTURE"

export type ClassSlot = {
  courseCode: string
  type: SlotType
  faculty: string
  location: string
  building: string
  floor: string
  room: string
}

export type PeriodTime = {
  period: number
  start: string
  end: string
  // 24h minutes from midnight, used for the live "NOW" detection
  startMin: number
  endMin: number
}

/** Fixed period grid shared by every day order (matches the Batch 2 sheet). */
export const PERIOD_TIMES: PeriodTime[] = [
  { period: 1, start: "8:00 AM", end: "8:50 AM", startMin: 8 * 60, endMin: 8 * 60 + 50 },
  { period: 2, start: "8:50 AM", end: "9:40 AM", startMin: 8 * 60 + 50, endMin: 9 * 60 + 40 },
  { period: 3, start: "9:45 AM", end: "10:35 AM", startMin: 9 * 60 + 45, endMin: 10 * 60 + 35 },
  { period: 4, start: "10:40 AM", end: "11:30 AM", startMin: 10 * 60 + 40, endMin: 11 * 60 + 30 },
  { period: 5, start: "11:35 AM", end: "12:25 PM", startMin: 11 * 60 + 35, endMin: 12 * 60 + 25 },
  { period: 6, start: "12:30 PM", end: "1:20 PM", startMin: 12 * 60 + 30, endMin: 13 * 60 + 20 },
  { period: 7, start: "1:25 PM", end: "2:15 PM", startMin: 13 * 60 + 25, endMin: 14 * 60 + 15 },
  { period: 8, start: "2:20 PM", end: "3:10 PM", startMin: 14 * 60 + 20, endMin: 15 * 60 + 10 },
  { period: 9, start: "3:10 PM", end: "4:00 PM", startMin: 15 * 60 + 10, endMin: 16 * 60 },
  { period: 10, start: "4:00 PM", end: "4:50 PM", startMin: 16 * 60, endMin: 16 * 60 + 50 },
  { period: 11, start: "4:50 PM", end: "5:30 PM", startMin: 16 * 60 + 50, endMin: 17 * 60 + 30 },
  { period: 12, start: "5:30 PM", end: "6:10 PM", startMin: 17 * 60 + 30, endMin: 18 * 60 + 10 },
]

// ---------------------------------------------------------------------------
// COURSE CATALOG  (edit here to change names / colors / faculty / rooms)
// ---------------------------------------------------------------------------

export const COURSES: Record<string, Course> = {
  "26MAB1001T": { code: "26MAB1001T", name: "Calculus and Linear Algebra", color: "violet" },
  "26CYB1002J": { code: "26CYB1002J", name: "Chemistry for Computer Science", color: "rose" },
  "26CSE1002J": { code: "26CSE1002J", name: "Programming for Problem Solving", color: "blue" },
  "26BTB1001T": { code: "26BTB1001T", name: "Introduction to Computational Biology", color: "amber" },
  "26MEE1001L": { code: "26MEE1001L", name: "Workshop Practice", color: "teal" },
}

type Venue = { faculty: string; location: string; building: string; floor: string; room: string }

/**
 * Each course has a lecture venue and (optionally) a separate lab venue,
 * taken straight from the "Timetable Details" sheet. `makeSlot` picks the
 * right venue based on whether a period is a LECTURE or a LAB.
 */
const VENUES: Record<string, { lecture?: Venue; lab?: Venue }> = {
  "26MAB1001T": {
    lecture: {
      faculty: "Dr. Suvitha V [102113]",
      location: "Annexure-II",
      building: "University Building",
      floor: "5th Floor",
      room: "509",
    },
  },
  "26CYB1002J": {
    lecture: {
      faculty: "Dr. P. Panneerselvam [101449]",
      location: "Annexure-II",
      building: "University Building",
      floor: "5th Floor",
      room: "509",
    },
    lab: {
      faculty: "Dr. P. Panneerselvam [101449]",
      location: "Annexure-II",
      building: "Chemistry Lab Block",
      floor: "1st Floor",
      room: "Chemistry Laboratory 4",
    },
  },
  "26CSE1002J": {
    lecture: {
      faculty: "Dr. Sorna Lakshmi K [102403]",
      location: "Annexure-II",
      building: "University Building",
      floor: "5th Floor",
      room: "509",
    },
    lab: {
      faculty: "Dr. Sorna Lakshmi K [102403]",
      location: "Annexure-I",
      building: "Basic Engineering Lab (BEL)",
      floor: "3rd Floor",
      room: "Programming Lab-1",
    },
  },
  "26BTB1001T": {
    lecture: {
      faculty: "Saileshwar M [104013]",
      location: "Annexure-II",
      building: "University Building",
      floor: "5th Floor",
      room: "509",
    },
  },
  "26MEE1001L": {
    lab: {
      faculty: "Dr. Murugesan R [100553]",
      location: "Annexure-I",
      building: "Basic Engineering Lab (BEL)",
      floor: "Ground Floor",
      room: "Sheet Metal Lab",
    },
  },
}

function makeSlot(courseCode: string, type: SlotType): ClassSlot {
  const v = VENUES[courseCode]
  const venue = (type === "LAB" ? v?.lab : v?.lecture) ?? v?.lecture ?? v?.lab
  return {
    courseCode,
    type,
    faculty: venue?.faculty ?? "TBA",
    location: venue?.location ?? "",
    building: venue?.building ?? "TBA",
    floor: venue?.floor ?? "",
    room: venue?.room ?? "",
  }
}

// Short helpers so the grid below reads like the printed timetable.
const L = (code: string): ClassSlot => makeSlot(code, "LECTURE")
const LAB = (code: string): ClassSlot => makeSlot(code, "LAB")

/**
 * day order (1..5) -> period number -> class slot (missing = free / idle period)
 * Transcribed from the Batch 2 grid. Day 1 was not on the shared sheet, so it
 * is intentionally left empty — fill it in the same shape when you have it.
 */
export const SCHEDULE: Record<number, Record<number, ClassSlot>> = {
  1: {
    // No data on the shared sheet — add your Day 1 periods here.
  },
  2: {
    1: L("26MAB1001T"),
    2: L("26MAB1001T"),
  },
  3: {
    3: LAB("26CYB1002J"),
    4: LAB("26CYB1002J"),
    6: L("26BTB1001T"),
    7: L("26BTB1001T"),
    9: L("26CYB1002J"),
    10: L("26MAB1001T"),
  },
  4: {
    1: L("26CYB1002J"),
    2: L("26CYB1002J"),
    3: L("26MAB1001T"),
    4: L("26CSE1002J"),
    5: L("26BTB1001T"),
    7: L("26CSE1002J"),
    8: L("26CSE1002J"),
  },
  5: {
    1: LAB("26MEE1001L"),
    2: LAB("26MEE1001L"),
    3: LAB("26MEE1001L"),
    4: LAB("26MEE1001L"),
    6: LAB("26CSE1002J"),
    7: LAB("26CSE1002J"),
    8: L("26BTB1001T"),
    10: L("26CYB1002J"),
  },
}

export const DAY_ORDERS = [1, 2, 3, 4, 5]

// ---------------------------------------------------------------------------
// ACADEMIC CALENDAR  (source of truth for day orders + holidays)
// Each row: [ISO date, dayOrder (0 = holiday), note]
// A working day has dayOrder 1..5. A holiday has dayOrder 0 and a reason.
// ---------------------------------------------------------------------------

const RAW_CALENDAR: [string, number, string][] = [
  ["2026-07-21", 1, ""],
  ["2026-07-22", 2, ""],
  ["2026-07-23", 3, ""],
  ["2026-07-24", 4, ""],
  ["2026-07-25", 0, "Saturday"],
  ["2026-07-26", 0, "Sunday"],
  ["2026-07-27", 5, ""],
  ["2026-07-28", 1, ""],
  ["2026-07-29", 2, ""],
  ["2026-07-30", 3, ""],
  ["2026-07-31", 4, ""],
  ["2026-08-01", 0, "Saturday"],
  ["2026-08-02", 0, "Sunday"],
  ["2026-08-03", 5, ""],
  ["2026-08-04", 1, ""],
  ["2026-08-05", 2, ""],
  ["2026-08-06", 3, ""],
  ["2026-08-07", 4, ""],
  ["2026-08-08", 0, "Saturday"],
  ["2026-08-09", 0, "Sunday"],
  ["2026-08-10", 5, ""],
  ["2026-08-11", 1, ""],
  ["2026-08-12", 2, ""],
  ["2026-08-13", 3, ""],
  ["2026-08-14", 4, ""],
  ["2026-08-15", 0, "Saturday"],
  ["2026-08-16", 0, "Sunday"],
  ["2026-08-17", 5, ""],
  ["2026-08-18", 1, ""],
  ["2026-08-19", 2, ""],
  ["2026-08-20", 3, ""],
  ["2026-08-21", 4, ""],
  ["2026-08-22", 0, "Saturday"],
  ["2026-08-23", 0, "Sunday"],
  ["2026-08-24", 0, "Classes Suspended"],
  ["2026-08-25", 5, ""],
  ["2026-08-26", 0, "Milad-un-nabi"],
  ["2026-08-27", 1, ""],
  ["2026-08-28", 2, ""],
  ["2026-08-29", 0, "Saturday"],
  ["2026-08-30", 0, "Sunday"],
  ["2026-08-31", 3, ""],
  ["2026-09-01", 4, ""],
  ["2026-09-02", 5, ""],
  ["2026-09-03", 1, ""],
  ["2026-09-04", 0, "Krishna Jayanthi"],
  ["2026-09-05", 0, "Saturday"],
  ["2026-09-06", 0, "Sunday"],
  ["2026-09-07", 2, ""],
  ["2026-09-08", 3, ""],
  ["2026-09-09", 4, ""],
  ["2026-09-10", 5, ""],
  ["2026-09-11", 1, ""],
  ["2026-09-12", 0, "Saturday"],
  ["2026-09-13", 0, "Sunday"],
  ["2026-09-14", 0, "Vinayagar Chathurthi"],
  ["2026-09-15", 2, ""],
  ["2026-09-16", 3, ""],
  ["2026-09-17", 4, ""],
  ["2026-09-18", 5, ""],
  ["2026-09-19", 0, "Saturday"],
  ["2026-09-20", 0, "Sunday"],
  ["2026-09-21", 1, ""],
  ["2026-09-22", 2, ""],
  ["2026-09-23", 3, ""],
  ["2026-09-24", 4, ""],
  ["2026-09-25", 5, ""],
  ["2026-09-26", 0, "Saturday"],
  ["2026-09-27", 0, "Sunday"],
  ["2026-09-28", 1, ""],
  ["2026-09-29", 2, ""],
  ["2026-09-30", 3, ""],
  ["2026-10-01", 4, ""],
  ["2026-10-02", 0, "Gandhi Jayanthi"],
  ["2026-10-03", 0, "Saturday"],
  ["2026-10-04", 0, "Sunday"],
  ["2026-10-05", 5, ""],
  ["2026-10-06", 1, ""],
  ["2026-10-07", 2, ""],
  ["2026-10-08", 3, ""],
  ["2026-10-09", 4, ""],
  ["2026-10-10", 0, "Saturday"],
  ["2026-10-11", 0, "Sunday"],
  ["2026-10-12", 5, ""],
  ["2026-10-13", 1, ""],
  ["2026-10-14", 2, ""],
  ["2026-10-15", 3, ""],
  ["2026-10-16", 4, ""],
  ["2026-10-17", 0, "Saturday"],
  ["2026-10-18", 0, "Sunday"],
  ["2026-10-19", 0, "Ayutha Pooja"],
  ["2026-10-20", 0, "Vijaya Dasami"],
  ["2026-10-21", 5, ""],
  ["2026-10-22", 1, ""],
  ["2026-10-23", 2, ""],
  ["2026-10-24", 0, "Saturday"],
  ["2026-10-25", 0, "Sunday"],
  ["2026-10-26", 3, ""],
  ["2026-10-27", 4, ""],
  ["2026-10-28", 5, ""],
  ["2026-10-29", 1, ""],
  ["2026-10-30", 2, ""],
  ["2026-10-31", 0, "Saturday"],
  ["2026-11-01", 0, "Sunday"],
  ["2026-11-02", 3, ""],
  ["2026-11-03", 4, ""],
  ["2026-11-04", 5, ""],
  ["2026-11-05", 1, ""],
  ["2026-11-06", 2, ""],
  ["2026-11-07", 0, "Saturday"],
  ["2026-11-08", 0, "Sunday"],
  ["2026-11-09", 3, ""],
  ["2026-11-10", 4, ""],
  ["2026-11-11", 5, ""],
  ["2026-11-12", 1, ""],
  ["2026-11-13", 2, ""],
  ["2026-11-14", 0, "Saturday"],
  ["2026-11-15", 0, "Sunday"],
  ["2026-11-16", 3, ""],
  ["2026-11-17", 4, ""],
  ["2026-11-18", 5, ""],
  ["2026-11-19", 1, ""],
  ["2026-11-20", 2, "Last Working Day - PG"],
  ["2026-11-21", 0, "Saturday"],
  ["2026-11-22", 0, "Sunday"],
  ["2026-11-23", 3, ""],
  ["2026-11-24", 4, ""],
  ["2026-11-25", 5, ""],
  ["2026-11-26", 1, ""],
  ["2026-11-27", 2, ""],
  ["2026-11-28", 0, "Saturday"],
  ["2026-11-29", 0, "Sunday"],
  ["2026-11-30", 3, ""],
  ["2026-12-01", 4, ""],
  ["2026-12-02", 5, ""],
  ["2026-12-03", 1, ""],
  ["2026-12-04", 2, ""],
  ["2026-12-05", 0, "Saturday"],
  ["2026-12-06", 0, "Sunday"],
  ["2026-12-07", 3, "Last Working Day - UG First Year"],
]

export type CalendarEntry = {
  date: string
  dayOrder: number | null
  isHoliday: boolean
  note: string
}

export const CALENDAR: Record<string, CalendarEntry> = Object.fromEntries(
  RAW_CALENDAR.map(([date, order, note]) => [
    date,
    { date, dayOrder: order === 0 ? null : order, isHoliday: order === 0, note },
  ]),
)

export const CALENDAR_LIST: CalendarEntry[] = RAW_CALENDAR.map(([date, order, note]) => ({
  date,
  dayOrder: order === 0 ? null : order,
  isHoliday: order === 0,
  note,
}))

/** Look up a calendar entry for a Date (returns undefined outside the published range). */
export function calendarEntryForDate(date: Date): CalendarEntry | undefined {
  return CALENDAR[toDateInputValue(date)]
}

/** Returns the day order (1..5) for a date, or null for holidays / unknown dates. */
export function dayOrderForDate(date: Date): number | null {
  return calendarEntryForDate(date)?.dayOrder ?? null
}

/** True when the date is inside the published calendar and marked as a holiday. */
export function isHolidayDate(date: Date): boolean {
  return calendarEntryForDate(date)?.isHoliday ?? false
}

/** The next working (class) day strictly after the given date, within the calendar. */
export function nextWorkingDay(date: Date): CalendarEntry | undefined {
  const key = toDateInputValue(date)
  return CALENDAR_LIST.find((e) => e.date > key && e.dayOrder != null)
}

export function classesScheduled(order: number): number {
  return Object.keys(SCHEDULE[order] ?? {}).length
}

export function courseCodeShort(code: string): string {
  return code.replace(/^26/, "")
}

export function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0")
  const month = d.toLocaleDateString("en-US", { month: "short" })
  return `${day} ${month} ${d.getFullYear()}`
}

export function formatLongDate(iso: string): string {
  const d = fromDateInputValue(iso)
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" })
  return `${weekday}, ${formatDate(d)}`
}

export function weekdayName(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
}

export function formatClock(d: Date): string {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
}

export function toDateInputValue(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function fromDateInputValue(v: string): Date {
  const [y, m, d] = v.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateInputValue(a) === toDateInputValue(b)
}
