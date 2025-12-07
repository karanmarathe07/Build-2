"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserProfileCard } from "./user-profile-card";

// --- Assets ---
import imgRupesh from "../../profile pic/Rupesh.jpeg";
import imgAshish from "../../profile pic/ashish.jpg";
import imgAtharva from "../../profile pic/atharva.jpeg";
import imgBhavesh from "../../profile pic/bhavesh.jpeg";
import imgChetan from "../../profile pic/chetan.jpg";
import imgKaran from "../../profile pic/karan.jpg";
import imgManas from "../../profile pic/manas.jpeg";
import imgRucha from "../../profile pic/rucha.jpeg";
import imgTanishq from "../../profile pic/tanishq.jpg";

// --- Data: team members ---
const people = [
    {
        id: 1,
        name: "Karan",
        role: "Full Stack Creative",
        email: "karan@naxshtra.ai",
        profile: imgKaran,
    },
    {
        id: 2,
        name: "Rucha",
        role: "Product Designer",
        email: "rucha@naxshtra.ai",
        profile: imgRucha,
    },
    {
        id: 3,
        name: "Ashish",
        role: "Senior Developer",
        email: "ashish@naxshtra.ai",
        profile: imgAshish,
    },
    {
        id: 4,
        name: "Chetan",
        role: "Backend Architect",
        email: "chetan@naxshtra.ai",
        profile: imgChetan,
    },
    {
        id: 5,
        name: "Tanishq",
        role: "Frontend Specialist",
        email: "tanishq@naxshtra.ai",
        profile: imgTanishq,
    },
    {
        id: 6,
        name: "Atharva",
        role: "AI Engineer",
        email: "atharva@naxshtra.ai",
        profile: imgAtharva,
    },
    {
        id: 7,
        name: "Manas",
        role: "Data Scientist",
        email: "manas@naxshtra.ai",
        profile: imgManas,
    },
    {
        id: 8,
        name: "Rupesh",
        role: "DevOps Engineer",
        email: "rupesh@naxshtra.ai",
        profile: imgRupesh,
    },
    {
        id: 9,
        name: "Bhavesh",
        role: "System Analyst",
        email: "bhavesh@naxshtra.ai",
        profile: imgBhavesh,
    },
];

// --- Utility for fallback images ---
const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for responsive detection ---
const useResponsive = () => {
    const [screenSize, setScreenSize] = React.useState<'xs' | 'sm' | 'md' | 'lg'>('lg');

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 480) setScreenSize('xs');
            else if (width < 640) setScreenSize('sm');
            else if (width < 768) setScreenSize('md');
            else setScreenSize('lg');
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return screenSize;
};

// --- Main Component ---
export default function OrbitCarousel() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isHovering, setIsHovering] = React.useState(false);
    const screenSize = useResponsive();

    // Responsive sizing - SCALED UP for Hero Feel
    const getResponsiveValues = () => {
        switch (screenSize) {
            case 'xs':
                return {
                    containerRadius: 130,
                    profileSize: 45,
                    avatarSize: 'w-16 h-16',
                };
            case 'sm':
                return {
                    containerRadius: 170,
                    profileSize: 55,
                    avatarSize: 'w-20 h-20',
                };
            case 'md':
                return {
                    containerRadius: 230,
                    profileSize: 70,
                    avatarSize: 'w-24 h-24',
                };
            default:
                return {
                    containerRadius: 290, // Significant increase for desktop
                    profileSize: 85,
                    avatarSize: 'w-28 h-28',
                };
        }
    };

    const { containerRadius, profileSize } = getResponsiveValues();
    const containerSize = containerRadius * 2 + 150; // Add breathing room

    // Calculate rotation for each profile (Preserved Logic)
    const getRotation = React.useCallback(
        (index: number): number => (index - activeIndex) * (360 / people.length),
        [activeIndex]
    );

    // Navigation callbacks (Preserved Logic)
    const next = () => setActiveIndex((i) => (i + 1) % people.length);
    const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

    const handleProfileClick = React.useCallback((index: number) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    }, [activeIndex]);

    // Keyboard navigation (Preserved Logic)
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'ArrowLeft') prev();
            else if (event.key === 'ArrowRight') next();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-rotation (Preserved Logic)
    React.useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovering]);

    return (
        <div
            className="flex flex-col items-center justify-center relative w-full overflow-hidden bg-[#000000] min-h-screen py-20"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* --- Ambient Background Glow (Apple Style) --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Central Blue/Purple Haze */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-900/20 rounded-full blur-[100px] opacity-60 mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
            </div>

            {/* --- ABOUT HEADING --- */}
            <div className="relative z-10 mb-8 sm:mb-12 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">About Us</h2>
                <p className="text-neutral-500 max-w-lg mx-auto text-sm md:text-base">
                    The minds and creators shaping the future of Naxshtra AI.
                </p>
            </div>

            <div
                className="relative flex items-center justify-center z-10"
                style={{ width: containerSize, height: containerSize }}
            >
                {/* Decorative Orbit Guidelines */}
                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-90" />
                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-75 opacity-50" />
                <div className="absolute inset-0 rounded-full border border-dashed border-white/5 pointer-events-none scale-110 opacity-30" />

                {/* --- Center Card (New UserProfileCard Integration) --- */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={people[activeIndex].id}
                        initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(8px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24
                        }}
                        // Card container handles positioning
                        className="absolute z-30 flex flex-col items-center justify-center"
                    >
                        {/* Nav Buttons Positioned Around Card */}
                        <div className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 z-40">
                            <button
                                onClick={prev}
                                className="group p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                            >
                                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        <div className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 z-40">
                            <button
                                onClick={next}
                                className="group p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                            >
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* INTEGRATED USER PROFILE CARD */}
                        <UserProfileCard
                            name={people[activeIndex].name}
                            role={people[activeIndex].role}
                            email={people[activeIndex].email}
                            avatar={people[activeIndex].profile}
                        />

                    </motion.div>
                </AnimatePresence>

                {/* --- Orbiting Avatars --- */}
                {people.map((p, i) => {
                    const rotation = getRotation(i);
                    const isActive = i === activeIndex;

                    return (
                        <motion.div
                            key={p.id}
                            animate={{
                                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 24,
                                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.04
                            }}
                            style={{
                                width: profileSize,
                                height: profileSize,
                                position: "absolute",
                                top: `calc(50% - ${profileSize / 2}px)`,
                                left: `calc(50% - ${profileSize / 2}px)`,
                                zIndex: isActive ? 20 : 10,
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -rotation }}
                                transition={{
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 24,
                                }}
                                className="w-full h-full group relative"
                            >
                                {/* Active Glow Ring */}
                                <div className={`
                    absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300
                    ${isActive ? 'opacity-100' : ''}
                    bg-indigo-500/30 blur-md
                `} />

                                <motion.img
                                    src={p.profile}
                                    alt={p.name}
                                    onError={safeImage}
                                    onClick={() => handleProfileClick(i)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                    w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300
                    border-[1.5px] shadow-lg
                    ${isActive
                                            ? "border-white/90 scale-105 saturate-100"
                                            : "border-white/10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-white/40"
                                        }
                  `}
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* --- Progress Indicator --- */}
            <div className="absolute bottom-8 flex justify-center gap-3">
                {people.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`
                h-1 rounded-full transition-all duration-300
                ${index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/10 hover:bg-white/30"}
            `}
                    />
                ))}
            </div>
        </div>
    );
}
