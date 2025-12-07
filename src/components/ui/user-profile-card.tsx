"use client";

import * as React from 'react';
import { Plus, Copy, Zap, Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Props Interface ---
interface UserProfileCardProps {
    name: string;
    role: string;
    email: string;
    avatar: string;
}

export function UserProfileCard({ name, role, email, avatar }: UserProfileCardProps) {
    const [copied, setCopied] = React.useState(false);

    // Current time for the "Clock"
    const [time, setTime] = React.useState("12:00 PM");

    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            // Increased width, rounded corners, and shadow for presence
            className="relative w-[400px] md:w-[420px] bg-[#0A0A0A] rounded-[2rem] shadow-2xl overflow-hidden font-sans border border-neutral-800/80"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* --- Top Status Bar --- */}
            <div className="flex items-center justify-between px-8 pt-8 mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_12px_rgba(132,204,22,0.8)] z-10 relative" />
                        <div className="absolute inset-0 bg-lime-500 rounded-full animate-ping opacity-75" />
                    </div>
                    <span className="text-neutral-300 text-xs uppercase tracking-wider font-semibold">Available for work</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{time}</span>
                </div>
            </div>

            {/* --- Profile Info --- */}
            <div className="px-8 flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                    {/* Glow effect behind avatar */}
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300" />
                    <img
                        src={avatar}
                        alt={name}
                        className="relative w-24 h-24 rounded-full object-cover border-[3px] border-[#0A0A0A] shadow-xl"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-1.5">{name}</h1>
                    <p className="text-base text-neutral-400 font-medium">{role}</p>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="px-8 flex gap-4 mb-20">
                <a
                    href={`mailto:${email}`}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-[#1F1F1F] hover:bg-[#2C2C2C] active:bg-[#1A1A1A] text-white text-sm font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 border border-neutral-800 hover:border-neutral-700 hover:shadow-lg group"
                >
                    <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                    Hire Me
                </a>
                <button
                    onClick={handleCopyEmail}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-[#1F1F1F] hover:bg-[#2C2C2C] active:bg-[#1A1A1A] text-white text-sm font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 border border-neutral-800 hover:border-neutral-700 hover:shadow-lg group"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-lime-500" />
                            <span className="text-lime-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                            Copy Email
                        </>
                    )}
                </button>
            </div>

            {/* --- Green Footer ("High on Creativity") --- */}
            {/* Using a distinct visual block for the footer */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] bg-lime-500 flex items-center justify-center gap-3">
                <div className="p-1.5 bg-black/10 rounded-full">
                    <Zap className="w-4 h-4 text-black fill-black" />
                </div>
                <span className="text-black text-sm font-extrabold tracking-wide uppercase">Currently High on Creativity</span>
            </div>

        </motion.div>
    );
}
