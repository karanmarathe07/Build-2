import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaNodeJs, FaReact, FaDocker } from 'react-icons/fa';
import { SiKubernetes, SiNextdotjs, SiTailwindcss, SiTypescript, SiGraphql } from 'react-icons/si';

const technologies = [
    { name: 'AWS', icon: FaAws },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'React', icon: FaReact },
    { name: 'Docker', icon: FaDocker },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'GraphQL', icon: SiGraphql },
    // Duplicate for seamless loop
    { name: 'AWS', icon: FaAws },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'React', icon: FaReact },
    { name: 'Docker', icon: FaDocker },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'GraphQL', icon: SiGraphql },
];

export default function TechnologiesMarquee() {
    return (
        // Merged seamlessly with the #000 hero above
        <section className="bg-black py-16 border-t border-white/5 relative overflow-hidden">

            {/* Section Header */}
            <div className="text-center mb-10 px-4">
                <h3 className="text-sm font-medium tracking-widest text-white/40 uppercase mb-2">Technologies</h3>
                <p className="text-white/70 text-lg font-light">Powering next-generation applications.</p>
            </div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden relative w-full mask-image-gradient">
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-16 md:gap-24 px-8 min-w-full"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {technologies.map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="flex flex-col items-center justify-center gap-3 group cursor-default"
                        >
                            <div className="text-4xl text-neutral-600 transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                <tech.icon />
                            </div>
                            <span className="text-sm font-medium text-neutral-600 transition-colors duration-300 group-hover:text-neutral-300">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
