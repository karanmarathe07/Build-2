import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

/**
 * FLOATING IMAGES CONFIGURATION
 * 
 * ENHANCED: Larger sizes, stronger parallax, NO DUPLICATES
 * POSITIONS: Arranged in a ring around the center to avoid text overlap
 */
interface FloatingImageConfig {
    id: number;
    src: string;
    size: number;
    initialX: number;
    initialY: number;
    depth: number;
}

const floatingImages: FloatingImageConfig[] = [
    // Front layer - strongest parallax (depth 80-100)
    { id: 1, src: '/Aesthetic Story ideas (1).jpg', size: 280, initialX: 12, initialY: 18, depth: 100 }, // Top Left
    { id: 2, src: '/Coffee and chill vibe !.jpg', size: 260, initialX: 80, initialY: 15, depth: 90 }, // Top Right
    { id: 3, src: '/Still Working design - story poster  - by aziable josue.jpg', size: 300, initialX: 85, initialY: 70, depth: 85 }, // Bottom Right

    // Middle layer - moderate parallax (depth 50-70)
    { id: 4, src: '/THE NEW AGENCY - TNA _.jpg', size: 240, initialX: 8, initialY: 75, depth: 65 }, // Bottom Left
    { id: 5, src: '/c o l o r  p a l l e t e.jpg', size: 270, initialX: 60, initialY: 80, depth: 60 }, // Bottom Center-Right
    { id: 6, src: '/Empowering the future of education! 🎓🚀….jpg', size: 250, initialX: 5, initialY: 45, depth: 55 }, // Far Left (Moved from 25,45)

    // Back layer - subtle parallax (depth 20-40)
    { id: 7, src: '/quote desktop wallpaper.jpg', size: 230, initialX: 92, initialY: 35, depth: 35 }, // Far Right (Moved from 50,10)
];

/**
 * FloatingImage Component
 * 
 * Handles parallax animation + glassmorphism hover effect
 */
interface FloatingImageProps {
    image: FloatingImageConfig;
    mousePositionRef: React.MutableRefObject<{ x: number; y: number }>;
    hoveredId: number | null;
    onHover: (id: number) => void;
    onLeave: () => void;
}

const FloatingImage = ({ image, mousePositionRef, hoveredId, onHover, onLeave }: FloatingImageProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        const animate = () => {
            if (!imgRef.current) return;

            const elapsed = (Date.now() - startTimeRef.current) / 1000;

            // Read mouse position from ref
            const mouseX = mousePositionRef.current.x;
            const mouseY = mousePositionRef.current.y;

            // Inverse parallax calculation
            const targetX = -mouseX * image.depth;
            const targetY = -mouseY * image.depth;

            // Idle floating motion
            const idleX = Math.sin(elapsed * 0.5 + image.id) * 3;
            const idleY = Math.cos(elapsed * 0.3 + image.id) * 3;

            // Lerp interpolation
            const SMOOTHNESS = 0.1;
            positionRef.current.x += (targetX + idleX - positionRef.current.x) * SMOOTHNESS;
            positionRef.current.y += (targetY + idleY - positionRef.current.y) * SMOOTHNESS;

            // Apply transform directly to DOM
            imgRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;

            // Continue loop
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [image.depth, image.id, mousePositionRef]);

    /**
     * GLASSMORPHISM EFFECT
     * 
     * When another image is hovered, this image becomes translucent with glass effect
     */
    const isGlassmorphic = hoveredId !== null && hoveredId !== image.id;

    return (
        <motion.img
            ref={imgRef}
            src={image.src}
            alt=""
            className={`floating-image ${isGlassmorphic ? 'glassmorphic' : ''}`}
            style={{
                width: image.size,
                height: image.size,
                left: `${image.initialX}%`,
                top: `${image.initialY}%`,
            }}
            // Hover handlers
            onMouseEnter={() => onHover(image.id)}
            onMouseLeave={onLeave}
            // Fade in on mount
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: image.id * 0.1 }}
        />
    );
};

/**
 * MAIN HERO COMPONENT
 */
const Hero = () => {
    const mousePositionRef = useRef({ x: 0, y: 0 });
    // Stores the raw previous mouse Y to calculate deltas
    const prevRawYRef = useRef(0);

    // Track which image is being hovered (null = none)
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        // Initialize prevRawY based on start position (approximate)
        prevRawYRef.current = 0;

        const handleMouseMove = (event: MouseEvent) => {
            // X Axis: Standard Absolute Mapping
            mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;

            // Y Axis: Delta Accumulator
            // We only want to accumulate DOWNWARD movement (positive delta)
            const rawY = (event.clientY / window.innerHeight) * 2 - 1;
            const deltaY = rawY - prevRawYRef.current;

            if (deltaY > 0) {
                // If moving down, add the change to our effective Y position
                mousePositionRef.current.y += deltaY;
            }

            // AUTO-RESET LIMIT
            // If images float up too far, reset them to original position
            // 3.5 is roughly 1.75 full screen heights of downward scrolling
            const MAX_Y_OFFSET = 3.5;
            if (mousePositionRef.current.y > MAX_Y_OFFSET) {
                mousePositionRef.current.y = 0;
            }

            // Always update previous raw position for the next frame's delta
            prevRawYRef.current = rawY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="hero">
            <div className="floating-container">
                {floatingImages.map((image) => (
                    <FloatingImage
                        key={image.id}
                        image={image}
                        mousePositionRef={mousePositionRef}
                        hoveredId={hoveredId}
                        onHover={setHoveredId}
                        onLeave={() => setHoveredId(null)}
                    />
                ))}
            </div>

            <div className="hero-content">
                <p className="tagline">FUELED BY IDEAS, SNACKS AND FIGMA</p>

                <h1 className="hero-heading">
                    <span className="heading-line">
                        Architect turned <span className="highlight">UX Designer</span>
                    </span>
                    <span className="heading-line">
                        blending{' '}
                        <span className="inline-image-wrapper">
                            <img
                                src="/spatial-icon.png"
                                alt="Spatial thinking"
                                className="inline-circle-image"
                            />
                        </span>{' '}
                        spatial thinking
                    </span>
                    <span className="heading-line">
                        with digital{' '}
                        <span className="inline-image-wrapper">
                            <img
                                src="/digital-icon.png"
                                alt="Digital experiences"
                                className="inline-circle-image"
                            />
                        </span>{' '}
                        experiences
                    </span>
                </h1>

                <p className="hero-subtext">
                    Driven by the idea of designing spaces for people, I strive to craft experiences
                    that leave a mark, ones people remember, share, and truly feel.
                </p>
            </div>
        </section>
    );
};

export default Hero;
