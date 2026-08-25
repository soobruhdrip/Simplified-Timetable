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

/** Fixed period grid shared by every day order. */
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

export const COURSES: Record<string, Course> = {
  "26BTB1001T": { code: "26BTB1001T", name: "Introduction to Computational Biology", color: "amber" },
  "26MEE1001L": { code: "26MEE1001L", name: "Workshop Practice", color: "teal" },
  "26CYB1002J": { code: "26CYB1002J", name: "Chemistry for Computer Science", color: "rose" },
  "26CSE1002J": { code: "26CSE1002J", name: "Programming for Problem Solving", color: "blue" },
  "26MAB1001T": { code: "26MAB1001T", name: "Calculus and Linear Algebra", color: "violet" },
}

const UNI = { building: "University Building", floor: "6th Floor", room: "618" }
const CHEM_LAB = { building: "Chemistry Lab Block", floor: "Ground Floor", room: "Chemistry Laboratory 2" }
const FORENSICS = { building: "Tech Park", floor: "4th Floor", room: "Computer Forensics Lab" }
const BEL = { building: "Basic Engineering Lab (BEL)", floor: "Ground Floor", room: "Sheet Metal Lab" }

const FAC = {
  chem: "Dr. N. Abirami",
  prog: "Dr. Avinash Vujji",
  calc: "Dr. Kalaiyarasi R",
  bio: "Ambikah Gandhi Mathi A G",
  workshop: "Dr. Santosh Kumar Singh",
}

/** day order (1..5) -> period number -> class slot (missing = free / idle period) */
export const SCHEDULE: Record<number, Record<number, ClassSlot>> = {
  1: {
    3: { courseCode: "26CSE1002J", type: "LAB", faculty: FAC.prog, ...FORENSICS },
    4: { courseCode: "26CSE1002J", type: "LAB", faculty: FAC.prog, ...FORENSICS },
    10: { courseCode: "26BTB1001T", type: "LECTURE", faculty: FAC.bio, ...UNI },
  },
  2: {
    1: { courseCode: "26CYB1002J", type: "LECTURE", faculty: FAC.chem, ...UNI },
    2: { courseCode: "26CYB1002J", type: "LECTURE", faculty: FAC.chem, ...UNI },
    3: { courseCode: "26BTB1001T", type: "LECTURE", faculty: FAC.bio, ...UNI },
    4: { courseCode: "26BTB1001T", type: "LECTURE", faculty: FAC.bio, ...UNI },
    7: { courseCode: "26MEE1001L", type: "LAB", faculty: FAC.workshop, ...BEL },
    8: { courseCode: "26MEE1001L", type: "LAB", faculty: FAC.workshop, ...BEL },
    9: { courseCode: "26MEE1001L", type: "LAB", faculty: FAC.workshop, ...BEL },
    10: { courseCode: "26MEE1001L", type: "LAB", faculty: FAC.workshop, ...BEL },
  },
  3: {
    9: { courseCode: "26MAB1001T", type: "LECTURE", faculty: FAC.calc, ...UNI },
    10: { courseCode: "26CYB1002J", type: "LAB", faculty: FAC.chem, ...CHEM_LAB },
  },
  4: {
    1: { courseCode: "26MAB1001T", type: "LECTURE", faculty: FAC.calc, ...UNI },
    2: { courseCode: "26MAB1001T", type: "LECTURE", faculty: FAC.calc, ...UNI },
    3: { courseCode: "26CYB1002J", type: "LECTURE", faculty: FAC.chem, ...UNI },
    4: { courseCode: "26CSE1002J", type: "LECTURE", faculty: FAC.prog, ...UNI },
  },
  5: {
    1: { courseCode: "26CYB1002J", type: "LAB", faculty: FAC.chem, ...CHEM_LAB },
    2: { courseCode: "26CYB1002J", type: "LAB", faculty: FAC.chem, ...CHEM_LAB },
    6: { courseCode: "26CSE1002J", type: "LECTURE", faculty: FAC.prog, ...UNI },
    7: { courseCode: "26CSE1002J", type: "LECTURE", faculty: FAC.prog, ...UNI },
    10: { courseCode: "26MAB1001T", type: "LECTURE", faculty: FAC.calc, ...UNI },
  },
}

export const DAY_ORDERS = [1, 2, 3, 4, 5]

/**
 * Anchor: 25 Aug 2026 (a Tuesday) is Day Order 5.
 * Day orders advance one step per working day (Mon-Fri) and skip weekends
 * so the "live" day order tracks a real academic rotation.
 */
const ANCHOR = new Date(2026, 7, 25)
const ANCHOR_ORDER = 5

function isWeekend(d: Date) {
  const day = d.getDay()
  return day === 0 || day === 6
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Net count of working days from ANCHOR to the given date (can be negative). */
function workingDayOffset(target: Date): number {
  const a = startOfDay(ANCHOR)
  const b = startOfDay(target)
  if (a.getTime() === b.getTime()) return 0
  const forward = b.getTime() > a.getTime()
  const step = forward ? 1 : -1
  const cursor = new Date(a)
  let count = 0
  while (cursor.getTime() !== b.getTime()) {
    cursor.setDate(cursor.getDate() + step)
    if (!isWeekend(cursor)) count += step
  }
  return count
}

/** Returns the day order (1..5) for a date, or null for weekends (holiday). */
export function dayOrderForDate(date: Date): number | null {
  if (isWeekend(date)) return null
  const offset = workingDayOffset(date)
  const idx = (((ANCHOR_ORDER - 1 + offset) % 5) + 5) % 5
  return idx + 1
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
