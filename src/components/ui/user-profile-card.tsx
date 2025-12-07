"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

// --- Props Interface ---
interface UserProfileCardProps {
    name: string;
    role: string;
    email: string;
    avatar: string;
    tagline?: string; // Custom text for green bar (e.g., "Full Stack Creative", "UI/UX Expert")
}

export function UserProfileCard({ name, role, email, avatar, tagline = "Currently High on Creativity" }: UserProfileCardProps) {
    return (
        <motion.div
            className="relative w-[280px] bg-black/40 backdrop-blur-lg rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] overflow-hidden font-sans border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Floating Avatar */}
            <div className="relative pt-8 pb-4 flex justify-center">
                <div className="relative group cursor-pointer">
                    {/* Soft premium glow */}
                    <div className="absolute -inset-3 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-300" />
                    <img
                        src={avatar}
                        alt={name}
                        className="relative w-24 h-24 rounded-full object-cover border-4 border-black/50 shadow-2xl"
                    />
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col items-center px-6 pb-6">

                {/* Name */}
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                    {name}
                </h2>

                {/* Role */}
                <p className="text-sm text-gray-300 font-medium mb-2">
                    {role}
                </p>

                {/* Email */}
                <p className="text-xs text-gray-500 mb-6">
                    {email}
                </p>

                {/* Contact Button */}
                <a
                    href={`mailto:${email}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] active:bg-[#111] text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
                >
                    Contact
                </a>
            </div>

            {/* Green Creativity Bar */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] bg-lime-400 flex items-center justify-center gap-2.5 rounded-b-3xl">
                <div className="p-1 bg-black/10 rounded-full">
                    <Zap className="w-4 h-4 text-black fill-black" />
                </div>
                <span className="text-black text-xs font-extrabold tracking-wide uppercase">
                    {role}
                </span>
            </div>
        </motion.div>
    );
}
