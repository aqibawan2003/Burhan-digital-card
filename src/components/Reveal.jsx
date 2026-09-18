import { motion } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  scale = 1,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}
