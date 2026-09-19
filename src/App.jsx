import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarHeart,
  ChevronDown,
  Clock3,
  Copy,
  HeartHandshake,
  MapPinned,
  MessageCircleHeart,
  Music2,
  Pause,
  Phone,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import CountdownTimer from './components/CountdownTimer'
import Reveal from './components/Reveal'
import SectionHeading from './components/SectionHeading'
import { weddingData } from './data/weddingData'

const easing = [0.22, 1, 0.36, 1]

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'couple', label: 'Couple' },
  { id: 'events', label: 'Events' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
]

const initialRsvpState = {
  name: '',
  contact: '',
  status: 'Joyfully attending',
  guests: '2',
  message: '',
}

const initialWishState = {
  name: '',
  message: '',
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [introStage, setIntroStage] = useState('closed')
  const [shareLabel, setShareLabel] = useState('Share')
  const [musicLabel, setMusicLabel] = useState('Music')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicUnavailable, setMusicUnavailable] = useState(false)
  const [rsvpForm, setRsvpForm] = useState(initialRsvpState)
  const [rsvpConfirmation, setRsvpConfirmation] = useState(null)
  const [wishForm, setWishForm] = useState(initialWishState)
  const [guestWishes, setGuestWishes] = useState(weddingData.guestWishes.initialWishes)
  const audioRef = useRef(null)

  const introVisible = introStage !== 'open'
  const musicConfigured = Boolean(weddingData.music.audioSrc) && !musicUnavailable

  useEffect(() => {
    document.title = weddingData.meta.title
    const descriptionTag = document.querySelector('meta[name="description"]')

    if (descriptionTag) {
      descriptionTag.setAttribute('content', weddingData.meta.description)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = introStage === 'open' ? '' : 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [introStage])

  useEffect(() => {
    if (!musicConfigured || !audioRef.current) {
      return
    }

    if (musicPlaying) {
      audioRef.current.play().catch(() => {
        setMusicPlaying(false)
        setMusicLabel('Tap again')
      })
      return
    }

    audioRef.current.pause()
  }, [musicConfigured, musicPlaying])

  useEffect(() => {
    if (!shareLabel || shareLabel === 'Share') {
      return undefined
    }

    const timer = window.setTimeout(() => setShareLabel('Share'), 2200)
    return () => window.clearTimeout(timer)
  }, [shareLabel])

  useEffect(() => {
    if (!musicLabel || musicLabel === 'Music' || musicLabel === 'Pause') {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setMusicLabel(musicPlaying ? 'Pause' : 'Music')
    }, 2600)

    return () => window.clearTimeout(timer)
  }, [musicLabel, musicPlaying])

  const handleOpenInvitation = () => {
    if (introStage !== 'closed') {
      return
    }

    setIntroStage('opening')
    window.setTimeout(() => {
      setIntroStage('open')
    }, 1600)
  }

  const handleShare = async () => {
    const sharePayload = {
      title: weddingData.meta.shareTitle,
      text: weddingData.meta.shareText,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(sharePayload)
        setShareLabel('Shared')
        return
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        setShareLabel('Link copied')
        return
      }

      setShareLabel('Copy manually')
    } catch {
      setShareLabel('Share cancelled')
    }
  }

  const handleMusicToggle = () => {
    if (!musicConfigured) {
      setMusicLabel(weddingData.music.audioSrc ? 'Upload wadding.mp3' : 'Add soundtrack')
      return
    }

    setMusicPlaying((current) => !current)
    setMusicLabel(musicPlaying ? 'Music' : 'Pause')
  }

  const handleRsvpChange = (event) => {
    const { name, value } = event.target
    setRsvpForm((current) => ({ ...current, [name]: value }))
  }

  const handleRsvpSubmit = (event) => {
    event.preventDefault()
    setRsvpConfirmation({ ...rsvpForm })
    setRsvpForm(initialRsvpState)
  }

  const handleWishChange = (event) => {
    const { name, value } = event.target
    setWishForm((current) => ({ ...current, [name]: value }))
  }

  const handleWishSubmit = (event) => {
    event.preventDefault()

    const trimmedName = wishForm.name.trim()
    const trimmedMessage = wishForm.message.trim()

    if (!trimmedName || !trimmedMessage) {
      return
    }

    setGuestWishes((current) => [
      {
        name: trimmedName,
        message: trimmedMessage,
      },
      ...current,
    ])
    setWishForm(initialWishState)
  }

  return (
    <div className="page-shell min-h-screen overflow-x-hidden text-[var(--ink)]">
      {weddingData.music.audioSrc ? (
        <audio
          ref={audioRef}
          src={weddingData.music.audioSrc}
          loop
          preload="metadata"
          onError={() => {
            setMusicUnavailable(true)
            setMusicPlaying(false)
            setMusicLabel('Upload wadding.mp3')
          }}
        />
      ) : null}

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(189,147,64,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(123,31,48,0.16),_transparent_28%)]" />

      <AnimatePresence>
        {introVisible ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(32,8,13,0.48)] px-4 backdrop-blur-md"
            exit={{ opacity: 0, transition: { duration: 0.55, ease: easing } }}
          >
            <div className="relative w-full max-w-[24rem]" style={{ perspective: 2200 }}>
              <motion.div
                className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_top,_rgba(255,214,144,0.30),_transparent_58%)] blur-3xl"
                animate={introStage === 'opening' ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 0.8 }}
                transition={{ duration: 1.2, ease: easing }}
              />

              <motion.div
                className="relative h-[33rem] rounded-[2.6rem] border border-white/25 bg-[linear-gradient(180deg,rgba(91,21,32,0.18),rgba(91,21,32,0.05))] p-4 shadow-[0_32px_120px_rgba(17,5,8,0.45)]"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={
                  introStage === 'opening'
                    ? { opacity: 0, y: -34, scale: 1.04 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ duration: 1.15, ease: easing }}
              >
                <motion.div
                  className="absolute inset-x-5 top-5 bottom-16 rounded-[2rem] border border-[rgba(148,41,62,0.18)] bg-[linear-gradient(180deg,#fffaf1_0%,#f8e7d1_100%)] px-8 py-10 text-center shadow-[0_24px_90px_rgba(122,40,49,0.14)]"
                  animate={
                    introStage === 'opening'
                      ? { y: -138, scale: 1.05, rotateX: 10, opacity: 0.12 }
                      : { y: 0, scale: 1, rotateX: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.2, ease: easing }}
                >
                  <div className="mx-auto mb-6 h-px w-16 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--crimson)]/70">
                    {weddingData.invitation.badge}
                  </p>
                  <p className="mt-4 serif-display text-4xl leading-none text-[var(--ink)]">
                    {weddingData.invitation.names.groom}
                  </p>
                  <p className="ornament-script mt-2 text-5xl leading-none text-[var(--crimson)]">
                    &amp;
                  </p>
                  <p className="serif-display mt-2 text-4xl leading-none text-[var(--ink)]">
                    {weddingData.invitation.names.bride}
                  </p>
                  <p className="mt-8 text-sm leading-7 text-[var(--ink)]/65">
                    {weddingData.invitation.dateLabel}
                    <br />
                    {weddingData.invitation.city}
                  </p>
                  <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 px-5 py-2 text-xs font-semibold tracking-[0.28em] uppercase text-[var(--crimson)]/80">
                    <Sparkles className="h-4 w-4" />
                    Tap to open
                  </div>
                </motion.div>

                <motion.div
                  className="absolute inset-x-4 bottom-4 h-[52%] rounded-b-[2.25rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,#8b263c_0%,#6e1830_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                  animate={introStage === 'opening' ? { opacity: 0.08 } : { opacity: 1 }}
                  transition={{ duration: 0.8, ease: easing }}
                />

                <motion.div
                  className="absolute inset-x-4 top-4 h-[50%] origin-top rounded-t-[2.25rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,#b84a61_0%,#862840_100%)]"
                  animate={introStage === 'opening' ? { rotateX: -178 } : { rotateX: 0 }}
                  transition={{ duration: 1.15, ease: easing }}
                  style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-5 rounded-[1.7rem] border border-[rgba(255,227,186,0.32)]" />
                  <div className="absolute left-1/2 top-8 h-9 w-9 -translate-x-1/2 rounded-full border border-[rgba(255,227,186,0.48)] bg-[rgba(255,255,255,0.08)]" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(49,8,17,0.14))]" />
                </motion.div>

                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="absolute inset-0 cursor-pointer rounded-[2.6rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(32,8,13,0.55)]"
                  aria-label={weddingData.invitation.ctaLabel}
                  disabled={introStage !== 'closed'}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        animate={introStage === 'open' ? { opacity: 1, scale: 1 } : { opacity: 0.34, scale: 0.988 }}
        transition={{ duration: 0.8, ease: easing }}
      >
        <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/55 bg-[rgba(251,246,236,0.82)] px-4 py-3 shadow-[0_16px_42px_rgba(76,25,33,0.10)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToId('home')}
                className="serif-display text-left text-xl leading-none text-[var(--ink)] sm:text-2xl"
              >
                B &amp; B
              </button>

              <nav className="hidden items-center gap-5 text-xs font-semibold tracking-[0.26em] uppercase text-[var(--ink)]/60 lg:flex">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    className="transition hover:text-[var(--crimson)]"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleMusicToggle}
                  className="action-button"
                >
                  {musicPlaying ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
                  <span>{musicConfigured ? (musicPlaying ? 'Pause' : musicLabel) : musicLabel}</span>
                </button>
                <button type="button" onClick={handleShare} className="action-button">
                  <Copy className="h-4 w-4" />
                  <span>{shareLabel}</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="inline-flex shrink-0 items-center rounded-full border border-[rgba(127,31,49,0.12)] bg-white/60 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.24em] uppercase text-[var(--ink)]/65"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="pb-24 pt-4 sm:pt-8">
          <section id="home" className="px-4 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <Reveal className="relative" y={36}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/35 bg-white/55 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--crimson)]/80">
                  <CalendarHeart className="h-4 w-4" />
                  {weddingData.invitation.weekendLabel}
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.36em] text-[var(--crimson)]/68 sm:text-sm">
                  {weddingData.invitation.eyebrow}
                </p>
                <h1 className="serif-display mt-5 text-5xl leading-[0.92] text-[var(--ink)] sm:text-6xl lg:text-[5.5rem]">
                  {weddingData.invitation.names.groom}
                  <span className="ornament-script block text-[3.3rem] leading-none text-[var(--crimson)] sm:text-[4rem]">
                    &amp;
                  </span>
                  {weddingData.invitation.names.bride}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink)]/72 sm:text-lg">
                  {weddingData.invitation.invitationLine}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => scrollToId('events')} className="cta-primary">
                    View Events
                  </button>
                  <button type="button" onClick={() => scrollToId('rsvp')} className="cta-secondary">
                    Send RSVP
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-[var(--ink)]/68">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[var(--crimson)]" />
                    {weddingData.invitation.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPinned className="h-4 w-4 text-[var(--crimson)]" />
                    {weddingData.invitation.city}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToId('couple')}
                  className="mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--ink)]/55"
                >
                  Explore Invitation
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-white/50">
                    <ChevronDown className="h-4 w-4 animate-bounce text-[var(--crimson)]" />
                  </span>
                </button>
              </Reveal>

              <Reveal className="lg:justify-self-end" delay={0.12} y={42}>
                <div className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
                  <div className="rounded-[1.7rem] border border-[rgba(127,31,49,0.12)] bg-white/65 p-6 shadow-[0_22px_70px_rgba(86,24,34,0.08)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--crimson)]/70">
                      Hosted by
                    </p>
                    <p className="mt-4 serif-display text-3xl leading-none text-[var(--ink)] sm:text-4xl">
                      {weddingData.invitation.hostLine}
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {weddingData.events.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-[1.5rem] border border-[rgba(127,31,49,0.10)] bg-[linear-gradient(180deg,rgba(255,250,243,0.95),rgba(253,244,231,0.88))] p-4"
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--crimson)]/60">
                            {event.name}
                          </p>
                          <p className="mt-3 serif-display text-2xl leading-none text-[var(--ink)]">
                            {event.date.split(',')[1]?.trim() || event.date}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--ink)]/65">{event.timeLabel}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4 rounded-[1.5rem] border border-[var(--gold)]/30 bg-[rgba(255,245,225,0.75)] px-5 py-4">
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--crimson)]/65">
                          Main Venue
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--ink)]/75">
                          {weddingData.venue.name}, {weddingData.venue.address}
                        </p>
                      </div>
                      <a
                        href={weddingData.venue.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--crimson)]/16 bg-white/80 p-3 text-[var(--crimson)] transition hover:-translate-y-0.5"
                        aria-label="Open venue location in Google Maps"
                      >
                        <MapPinned className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="couple" className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <SectionHeading
                  eyebrow="The Couple"
                  title="A Blessed Union"
                  description="Two families join together in celebration of this sacred bond."
                />
              </Reveal>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <Reveal delay={0.08} y={36}>
                  <article className="royal-panel card-lift rounded-[2rem] p-6 sm:p-8">
                    <div className="text-center">
                      <div className="mx-auto inline-flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--gold)]/40 bg-[linear-gradient(135deg,rgba(189,147,64,0.12),rgba(255,248,237,0.95))]">
                        <span className="serif-display text-6xl text-[var(--crimson)]">B</span>
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.30em] text-[var(--crimson)]/70">
                        {weddingData.couple.groom.title}
                      </p>
                      <h3 className="serif-display mt-3 text-4xl leading-none text-[var(--ink)]">
                        {weddingData.couple.groom.name}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[var(--ink)]/72">
                        {weddingData.couple.groom.parents}
                      </p>
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={0.16} y={36}>
                  <article className="royal-panel card-lift rounded-[2rem] p-6 sm:p-8">
                    <div className="text-center">
                      <div className="mx-auto inline-flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--gold)]/40 bg-[linear-gradient(135deg,rgba(189,147,64,0.12),rgba(255,248,237,0.95))]">
                        <span className="serif-display text-6xl text-[var(--crimson)]">B</span>
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.30em] text-[var(--crimson)]/70">
                        {weddingData.couple.bride.title}
                      </p>
                      <h3 className="serif-display mt-3 text-4xl leading-none text-[var(--ink)]">
                        {weddingData.couple.bride.name}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[var(--ink)]/72">
                        {weddingData.couple.bride.parents}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="section-band rounded-[2.25rem] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
                  <SectionHeading
                    eyebrow="Live Countdown"
                    title={weddingData.countdown.title}
                    description={weddingData.countdown.subtitle}
                  />
                  <div className="mt-10">
                    <CountdownTimer targetDate={weddingData.invitation.primaryCountdownDate} />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="events" className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <SectionHeading
                  eyebrow="Wedding Events"
                  title="Three Days of Celebration"
                  description="Join us for a weekend of joyous festivities, from Mehndi to Walima."
                />
              </Reveal>

              <div className="mt-10 grid gap-6 xl:grid-cols-3">
                {weddingData.events.map((event, index) => (
                  <Reveal key={event.id} delay={index * 0.08} y={40}>
                    <article className="royal-panel card-lift flex h-full flex-col rounded-[2rem] p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.30em] text-[var(--crimson)]/70">
                            {event.date}
                          </p>
                          <h3 className="serif-display mt-4 text-4xl leading-none text-[var(--ink)]">
                            {event.name}
                          </h3>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)]/35 bg-[rgba(255,248,237,0.88)] text-[var(--crimson)]">
                          <CalendarHeart className="h-6 w-6" />
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-8 text-[var(--ink)]/72">{event.description}</p>

                      <div className="mt-6 space-y-3 rounded-[1.4rem] border border-[rgba(127,31,49,0.09)] bg-white/70 p-4 text-sm leading-7 text-[var(--ink)]/72">
                        <div className="inline-flex items-center gap-2 text-[var(--crimson)]/80">
                          <Clock3 className="h-4 w-4" />
                          {event.timeLabel}
                        </div>
                        <div className="inline-flex items-start gap-2 text-[var(--ink)]/75">
                          <MapPinned className="mt-1 h-4 w-4 shrink-0 text-[var(--crimson)]" />
                          <span>
                            {event.venue}, {event.address}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {event.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-[rgba(127,31,49,0.10)] bg-white/80 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.20em] text-[var(--ink)]/62"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <p className="mt-6 text-sm leading-7 text-[var(--ink)]/62">{event.hostInfo}</p>

                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cta-secondary mt-8 justify-center"
                      >
                        Open in Google Maps
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="Wedding Story"
                    title={weddingData.story.heading}
                    description={weddingData.story.message}
                    align="left"
                  />
                  <div className="mt-6 rounded-[1.5rem] border border-[rgba(127,31,49,0.10)] bg-white/70 p-6">
                    <p className="text-base leading-8 text-[var(--ink)]/75">
                      {weddingData.story.familyMessage}
                    </p>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="Family Contacts"
                    title="For More Information"
                    description="Please feel free to reach out to our family members."
                    align="left"
                  />
                  <div className="mt-6 space-y-3">
                    {weddingData.story.familyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-[1.3rem] border border-[rgba(127,31,49,0.09)] bg-white/68 px-4 py-4"
                      >
                        <Phone className="mt-1 h-4 w-4 shrink-0 text-[var(--crimson)]" />
                        <div>
                          <p className="text-sm font-semibold text-[var(--ink)]">{contact.name}</p>
                          {contact.phone && (
                            <p className="mt-1 text-sm text-[var(--ink)]/68">{contact.phone}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            </div>
          </section>

          <section id="venue" className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <SectionHeading
                  eyebrow="Venue & Directions"
                  title={weddingData.venue.title}
                  description={weddingData.venue.note}
                />
              </Reveal>

              <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <Reveal>
                  <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                    <div className="rounded-[1.85rem] border border-[rgba(127,31,49,0.12)] bg-[linear-gradient(135deg,rgba(118,22,39,0.98),rgba(83,25,41,0.94))] p-6 text-[var(--card-ivory)] sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.30em] text-[rgba(255,239,205,0.78)]">
                        Walima Venue
                      </p>
                      <h3 className="serif-display mt-4 text-4xl leading-none text-white sm:text-5xl">
                        {weddingData.venue.name}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-8 text-[rgba(255,248,236,0.82)]">
                        {weddingData.venue.address}
                      </p>
                      <a
                        href={weddingData.venue.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5"
                      >
                        <MapPinned className="h-4 w-4" />
                        Open Directions
                      </a>
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={0.06}>
                  <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.30em] text-[var(--crimson)]/70 mb-4">
                      All Venues
                    </p>
                    <div className="space-y-4">
                      {weddingData.events.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-[1.5rem] border border-[rgba(127,31,49,0.09)] bg-white/70 px-5 py-5"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--crimson)]/68">
                            {event.name}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[var(--ink)]/72">
                            {event.venue}, {event.address}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="rsvp" className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <Reveal>
                <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="RSVP"
                    title={weddingData.rsvp.title}
                    description={weddingData.rsvp.subtitle}
                    align="left"
                  />

                  <form className="mt-8 grid gap-4" onSubmit={handleRsvpSubmit}>
                    <label className="field-shell">
                      <span className="field-label">Full Name</span>
                      <input
                        className="field-input"
                        type="text"
                        name="name"
                        value={rsvpForm.name}
                        onChange={handleRsvpChange}
                        placeholder="Your name"
                        required
                      />
                    </label>

                    <label className="field-shell">
                      <span className="field-label">Phone or Email</span>
                      <input
                        className="field-input"
                        type="text"
                        name="contact"
                        value={rsvpForm.contact}
                        onChange={handleRsvpChange}
                        placeholder="Phone number or email"
                        required
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="field-shell">
                        <span className="field-label">Attendance</span>
                        <select
                          className="field-input"
                          name="status"
                          value={rsvpForm.status}
                          onChange={handleRsvpChange}
                        >
                          <option>Joyfully attending</option>
                          <option>Regretfully unable to attend</option>
                          <option>Attending selected events only</option>
                        </select>
                      </label>

                      <label className="field-shell">
                        <span className="field-label">Number of Guests</span>
                        <select
                          className="field-input"
                          name="guests"
                          value={rsvpForm.guests}
                          onChange={handleRsvpChange}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4+</option>
                        </select>
                      </label>
                    </div>

                    <label className="field-shell">
                      <span className="field-label">Message</span>
                      <textarea
                        className="field-input min-h-32 resize-y"
                        name="message"
                        value={rsvpForm.message}
                        onChange={handleRsvpChange}
                        placeholder="Add a note for the family"
                      />
                    </label>

                    <button type="submit" className="cta-primary justify-center">
                      <Send className="h-4 w-4" />
                      Submit RSVP
                    </button>
                  </form>
                </article>
              </Reveal>

              <Reveal delay={0.06}>
                <article className="royal-panel flex h-full flex-col rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="Confirmation"
                    title="Your RSVP"
                    description="Your response will be displayed here after submission."
                    align="left"
                  />

                  {rsvpConfirmation ? (
                    <div className="mt-8 space-y-4 rounded-[1.7rem] border border-[rgba(127,31,49,0.10)] bg-white/75 p-5 text-sm leading-7 text-[var(--ink)]/72">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[rgba(255,245,225,0.88)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--crimson)]/78">
                        RSVP Received
                      </div>
                      <p>
                        <strong>Name:</strong> {rsvpConfirmation.name}
                      </p>
                      <p>
                        <strong>Contact:</strong> {rsvpConfirmation.contact}
                      </p>
                      <p>
                        <strong>Status:</strong> {rsvpConfirmation.status}
                      </p>
                      <p>
                        <strong>Guests:</strong> {rsvpConfirmation.guests}
                      </p>
                      <p>
                        <strong>Message:</strong> {rsvpConfirmation.message || 'No message added.'}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-8 flex flex-1 items-center justify-center rounded-[1.7rem] border border-dashed border-[rgba(127,31,49,0.18)] bg-white/55 p-8 text-center">
                      <div>
                        <Users className="mx-auto h-10 w-10 text-[var(--crimson)]/70" />
                        <p className="mt-4 text-base leading-8 text-[var(--ink)]/68">
                          Submit the form to see your RSVP confirmation.
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            </div>
          </section>

          <section className="px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="Guest Wishes"
                    title={weddingData.guestWishes.title}
                    description={weddingData.guestWishes.subtitle}
                    align="left"
                  />

                  <form className="mt-8 grid gap-4" onSubmit={handleWishSubmit}>
                    <label className="field-shell">
                      <span className="field-label">Your Name</span>
                      <input
                        className="field-input"
                        type="text"
                        name="name"
                        value={wishForm.name}
                        onChange={handleWishChange}
                        placeholder="Who is sending this wish?"
                        required
                      />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Your Wish</span>
                      <textarea
                        className="field-input min-h-32 resize-y"
                        name="message"
                        value={wishForm.message}
                        onChange={handleWishChange}
                        placeholder="Write a heartfelt dua or message"
                        required
                      />
                    </label>
                    <button type="submit" className="cta-secondary justify-center">
                      <MessageCircleHeart className="h-4 w-4" />
                      Add Wish
                    </button>
                  </form>
                </article>
              </Reveal>

              <Reveal delay={0.06}>
                <article className="royal-panel rounded-[2rem] p-6 sm:p-8">
                  <SectionHeading
                    eyebrow="Wishes Wall"
                    title="Blessings for the Couple"
                    description="Messages from family and friends."
                    align="left"
                  />
                  <div className="mt-8 space-y-4">
                    {guestWishes.length ? (
                      guestWishes.map((wish, index) => (
                        <div
                          key={`${wish.name}-${index}`}
                          className="rounded-[1.5rem] border border-[rgba(127,31,49,0.10)] bg-white/72 px-5 py-5"
                        >
                          <p className="serif-display text-2xl leading-none text-[var(--ink)]">{wish.name}</p>
                          <p className="mt-3 text-sm leading-7 text-[var(--ink)]/70">{wish.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[1.6rem] border border-dashed border-[rgba(127,31,49,0.18)] bg-white/55 px-6 py-8 text-center">
                        <HeartHandshake className="mx-auto h-10 w-10 text-[var(--crimson)]/72" />
                        <p className="mt-4 text-base leading-8 text-[var(--ink)]/68">
                          No wishes added yet. Be the first to leave a blessing.
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="px-4 py-12 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto h-px w-24 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
            <p className="mt-8 serif-display text-3xl text-[var(--ink)]">
              {weddingData.invitation.names.groom} &amp; {weddingData.invitation.names.bride}
            </p>
            <p className="mt-4 text-sm text-[var(--ink)]/60">
              {weddingData.invitation.dateLabel} • {weddingData.invitation.city}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={handleMusicToggle}
                className="action-button"
              >
                {musicPlaying ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
                <span>{musicConfigured ? (musicPlaying ? 'Pause' : 'Music') : 'Music'}</span>
              </button>
              <button type="button" onClick={handleShare} className="action-button">
                <Copy className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}

export default App
