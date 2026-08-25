import type { CourseColor } from "./timetable-data"

type ColorStyle = {
  dot: string
  text: string
  ring: string
  glow: string
  chipBg: string
  chipText: string
}

/**
 * Inline style values keyed by course color. We use CSS vars directly so the
 * accent hues stay consistent between cards, dots, chips and the course map.
 */
export const COLOR_VALUE: Record<CourseColor, string> = {
  amber: "var(--course-amber)",
  teal: "var(--course-teal)",
  rose: "var(--course-rose)",
  blue: "var(--course-blue)",
  violet: "var(--course-violet)",
}

export function courseAccent(color: CourseColor) {
  return COLOR_VALUE[color]
}

export type { ColorStyle }
