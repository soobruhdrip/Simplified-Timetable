import { CalendarDays, Sparkles, Clock } from "lucide-react"

function StatCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-panel-2/50 px-5 py-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="font-mono text-[10px] tracking-label">{label}</span>
      </div>
      <p className="font-mono text-lg font-semibold leading-tight text-foreground text-balance">{children}</p>
    </div>
  )
}

export function BoardHero({
  weekday,
  dateLabel,
  dayOrderLabel,
  clock,
}: {
  weekday: string
  dateLabel: string
  dayOrderLabel: string
  clock: string
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-border bg-panel p-8 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-24 top-6 h-40 w-40 rounded-full bg-course-violet/15 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5">
            <Sparkles className="size-3.5 text-primary" />
            <span className="font-mono text-[10px] tracking-label text-primary">BATCH 2 SCHEDULER</span>
          </div>

          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl text-balance">
            Timetable,
            <br />
            <span className="text-primary">upgraded.</span>
          </h1>

          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground text-pretty">
            A live day-order dashboard that skips holidays, highlights the current period, and keeps every class detail
            one tap away.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-auto">
          <StatCard icon={<CalendarDays className="size-4" />} label={weekday}>
            {dateLabel}
          </StatCard>
          <StatCard icon={<Sparkles className="size-4" />} label="DAY ORDER">
            {dayOrderLabel}
          </StatCard>
          <StatCard icon={<Clock className="size-4" />} label="LIVE CLOCK">
            {clock}
          </StatCard>
        </div>
      </div>
    </header>
  )
}
