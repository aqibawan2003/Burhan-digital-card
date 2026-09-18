export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      <span className="tracking-[0.32em] text-[0.72rem] font-semibold uppercase text-[var(--crimson)]/70">
        {eyebrow}
      </span>
      <h2 className="serif-display text-4xl leading-none text-[var(--ink)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-[var(--ink)]/70 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
