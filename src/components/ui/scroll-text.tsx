
"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "../../lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface ScrollTextProps {
    texts: string[][]
    className?: string
    lineClassName?: string
    children?: React.ReactNode
}

export const ScrollText: React.FC<ScrollTextProps> = ({
    texts,
    className,
    lineClassName,
    children,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const linesRef = useRef<(HTMLDivElement | null)[]>([])

    // Flatten the texts array to get a single list of lines
    const allLines = texts.flat()

    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        const lineElements = linesRef.current.filter(Boolean)

        if (!section || !container || lineElements.length === 0) return

        // Get the height of the first line to determine spacing
        // Assuming all lines have roughly the same height
        const lineHeight = lineElements[0]?.offsetHeight || 100

        // Initial setup:
        // All lines start above the view (y: -lineHeight) and invisible?
        // User said "NO fade animation", "NO opacity changes".
        // So they must be just out of view (clipped).
        // We'll set them to y: -lineHeight initially.
        gsap.set(lineElements, { y: -lineHeight })

        // Create a master timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${allLines.length * 100}%`, // Scroll distance proportional to number of lines
                pin: true,
                scrub: 1, // Smooth scrubbing
                // markers: true, // Uncomment for debugging
            },
        })

        // Build the animation sequence
        allLines.forEach((_, index) => {
            const currentLine = lineElements[index]

            // 1. Current line enters from top (y: -lineHeight) to top (y: 0)
            tl.to(
                currentLine,
                {
                    y: 0,
                    duration: 1,
                    ease: "none",
                },
                index // Start time (absolute position in timeline)
            )

            // 2. Simultaneously, ALL previous lines move down by one line height
            // to make room for the new line at the top.
            // Previous lines are those with index < current index.
            for (let i = 0; i < index; i++) {
                const prevLine = lineElements[i]
                if (prevLine) {
                    tl.to(
                        prevLine,
                        {
                            y: `+=${lineHeight}`, // Move down by one line height relative to current position
                            duration: 1,
                            ease: "none",
                        },
                        index // Sync with current line entry
                    )
                }
            }
        })

        return () => {
            // Cleanup ScrollTrigger instances
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [allLines])

    return (
        <div
            ref={sectionRef}
            className={cn(
                "relative flex h-screen w-full items-center justify-center overflow-hidden bg-black",
                className
            )}
        >
            {children}

            {/* Container for lines - centered or positioned as needed */}
            <div
                ref={containerRef}
                className="relative h-full w-full max-w-4xl"
            >
                {allLines.map((line, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            linesRef.current[index] = el
                        }}
                        className={cn(
                            "absolute left-0 top-0 w-full text-left font-bold text-white will-change-transform",
                            "text-5xl md:text-7xl leading-tight", // Default styling
                            lineClassName
                        )}
                        style={{
                            // Initial position handled by GSAP, but good to have a default
                            transform: "translateY(-100%)",
                        }}
                    >
                        {line}
                    </div>
                ))}
            </div>
        </div>
    )
}
