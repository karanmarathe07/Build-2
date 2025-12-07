import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarWithDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeTimeoutRef = useRef<number | null>(null);

    const navItems = [
        { number: '01', name: 'Home', href: '#home' },
        { number: '02', name: 'About', href: '#about' },
        { number: '03', name: 'Projects', href: '#projects' },
        { number: '04', name: 'Services', href: '#services' },
        { number: '05', name: 'Contact', href: '#contact' },
    ];

    const handleEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleLeave = () => {
        closeTimeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    const containerVariants = {
        open: { transition: { staggerChildren: 0.05 } },
        closed: {},
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 10 },
    };

    return (
        <div className="w-full flex justify-center pt-6">
            <div
                className="relative px-6 py-3 rounded-full bg-[#101010]/80 border border-white/10 backdrop-blur-xl flex items-center gap-8"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{ width: '360px' }}
            >
                {/* Logo */}
                <div className="text-white font-black text-lg tracking-widest uppercase">
                    NAXSHTRA
                </div>

                {/* 4-Dot Menu Icon */}
                <div className="grid grid-cols-2 gap-1 cursor-pointer opacity-90 hover:opacity-100 transition-opacity ml-auto">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>

                {/* DROPDOWN PANEL */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 aspect-[9/16] w-72 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between p-6"
                            initial={{
                                opacity: 0,
                                scaleY: 0.7,
                                y: -10,
                                transformOrigin: 'top center',
                            }}
                            animate={{
                                opacity: 1,
                                scaleY: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scaleY: 0.7,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.18,
                                ease: 'easeOut',
                            }}
                        >
                            {/* Nav Items */}
                            <motion.div
                                className="flex flex-col"
                                variants={containerVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        variants={itemVariants}
                                        className="flex justify-between items-center text-neutral-200 hover:text-white transition py-3 px-6 rounded-xl hover:bg-white/5"
                                    >
                                        <span className="font-semibold">{item.name}</span>
                                        <span className="text-xs font-mono text-white/40">
                                            {item.number}
                                        </span>
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Start a Project</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="transition-transform group-hover:translate-x-1"
                                >
                                    <path
                                        d="M3 8H13M13 8L8 3M13 8L8 13"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NavbarWithDropdown;
