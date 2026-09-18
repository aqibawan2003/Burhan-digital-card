import { useEffect, useMemo, useState } from 'react'

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now()
  const safeDifference = Math.max(0, difference)

  const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((safeDifference / (1000 * 60)) % 60)
  const seconds = Math.floor((safeDifference / 1000) % 60)

  return {
    complete: difference <= 0,
    parts: [
      { label: 'Days', value: days },
      { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes },
      { label: 'Seconds', value: seconds },
    ],
  }
}

export default function CountdownTimer({ targetDate }) {
  const parsedDate = useMemo(() => new Date(targetDate), [targetDate])
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(parsedDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(parsedDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [parsedDate])

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {timeLeft.parts.map((item) => (
        <div
          key={item.label}
          className="royal-panel rounded-[1.75rem] px-5 py-6 text-center shadow-[0_20px_60px_rgba(73,22,30,0.10)]"
        >
          <div className="serif-display text-4xl font-semibold text-[var(--crimson)] sm:text-5xl">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="mt-2 text-xs font-semibold tracking-[0.28em] uppercase text-[var(--ink)]/55">
            {item.label}
          </div>
        </div>
      ))}
      {timeLeft.complete ? (
        <p className="sm:col-span-4 text-center text-sm text-[var(--ink)]/70">
          The celebration has begun. We look forward to welcoming you.
        </p>
      ) : null}
    </div>
  )
}
