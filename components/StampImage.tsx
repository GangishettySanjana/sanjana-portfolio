'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface StampImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  rotation?: number
  className?: string
  sizeClassName?: string
  animate?: boolean
  priority?: boolean
}

export default function StampImage({
  src,
  alt,
  width = 320,
  height = 380,
  rotation = -4,
  className,
  sizeClassName,
  animate = true,
  priority = false,
}: StampImageProps) {
  return (
    <motion.div
      className={cn('inline-block', className)}
      style={{ rotate: rotation }}
      animate={
        animate
          ? {
              y: [0, -10, 0],
              rotate: [rotation, rotation - 1, rotation],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      {/* Drop shadow sits outside the stamp so it doesn't get clipped */}
      <motion.div
        className={cn('stamp-shape bg-white p-3 md:p-4', sizeClassName)}
        style={{
          ...(sizeClassName ? {} : { width, height }),
          filter: 'drop-shadow(0 12px 32px rgba(61,75,107,0.22)) drop-shadow(0 2px 6px rgba(61,75,107,0.12))',
        }}
        whileHover={animate ? { scale: 1.03, rotate: rotation + 2 } : undefined}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full overflow-hidden rounded-sm">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
