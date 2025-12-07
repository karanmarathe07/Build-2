import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LineStackAnimation.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const LineStackAnimation: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wordsContainerRef = useRef<HTMLDivElement>(null);

    // Text blocks - each string is one complete sentence
    const textBlocks = [
        "IMPROVE YOUR WEBSITE CONVERSION RATE BY 10%",
        "GROW YOUR ONBOARDING BY 80%",
        "INCREASE MARKET SHARE BY REBRANDING",
        "DOUBLE THE NUMBER OF APP USERS IN ONE YEAR",
        "LOWER YOUR COST OF ACQUISITION"
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const container = wordsContainerRef.current;

        if (!section || !container) return;

        let currentSentenceIndex = -1;
        let wordElements: NodeListOf<HTMLElement> | null = null;

        // Create ScrollTrigger with continuous update
        const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${textBlocks.length * 100}%`,
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalSentences = textBlocks.length;
                const sentenceIndex = Math.floor(progress * totalSentences);
                const clampedIndex = Math.min(sentenceIndex, totalSentences - 1);

                // Calculate progress within current sentence
                const sentenceProgress = (progress * totalSentences) - sentenceIndex;

                // Update sentence if changed
                if (currentSentenceIndex !== clampedIndex) {
                    currentSentenceIndex = clampedIndex;
                    createSentence(clampedIndex);
                }

                // Animate words based on scroll
                if (wordElements) {
                    animateWords(sentenceProgress, clampedIndex);
                }
            }
        });

        const createSentence = (index: number) => {
            const sentence = textBlocks[index];
            const words = sentence.split(' ');

            // Clear container
            container.innerHTML = '';

            // Create word elements
            words.forEach((word) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.textContent = word;
                container.appendChild(wordSpan);
            });

            wordElements = container.querySelectorAll('.word');
        };

        const animateWords = (progress: number, sentenceIndex: number) => {
            if (!wordElements) return;

            // Determine direction based on sentence index
            const isEven = sentenceIndex % 2 === 0;

            wordElements.forEach((word, index) => {
                // Calculate individual word progress with stagger
                const staggerDelay = index * 0.08;
                const wordProgress = Math.max(0, Math.min(1, (progress - staggerDelay) * 1.5));

                // Calculate exit progress (when scrolling past this sentence)
                const exitProgress = Math.max(0, Math.min(1, (progress - 0.7) * 3));

                // Slide animation
                const slideDistance = 100;
                const startY = isEven ? -slideDistance : slideDistance;

                // Entry animation (0 to 1)
                const entryY = startY * (1 - wordProgress);

                // Exit animation (slide further in same direction and fade out)
                const exitY = isEven ? -slideDistance * exitProgress : slideDistance * exitProgress;

                const finalY = entryY + exitY;

                // Opacity calculation
                const entryOpacity = Math.min(1, wordProgress * 2);
                const exitOpacity = 1 - exitProgress;
                const finalOpacity = entryOpacity * exitOpacity;

                // Use gsap.to for smooth transitions
                gsap.to(word, {
                    y: finalY,
                    opacity: finalOpacity,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        };

        // Initialize with first sentence
        createSentence(0);

        // Cleanup
        return () => {
            scrollTrigger.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="line-stack-animation">
            <div className="content-grid">
                {/* Left Side - Static Content */}
                <div className="left-content">
                    <h2 className="main-heading">
                        You will work with<br />
                        Basis to:
                    </h2>

                    <div className="cta-buttons">
                        <button className="btn-primary">
                            BOOK A FREE STRATEGY SESSION
                        </button>
                        <button className="btn-secondary">
                            EXPLORE CASE STUDIES
                        </button>
                    </div>
                </div>

                {/* Right Side - Animated Words in Bordered Box */}
                <div className="right-content">
                    <div className="text-box">
                        <div ref={wordsContainerRef} className="words-container">
                            {/* Words will be dynamically inserted here */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LineStackAnimation;
