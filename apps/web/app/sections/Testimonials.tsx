'use client';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const PremiumTestimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    // Stats animation values
    const orgsCount = useMotionValue(0);
    const prodCount = useMotionValue(0);
    const effCount = useMotionValue(0);
    const relCount = useMotionValue(0);

    // Transformed values for display
    const orgsDisplay = useTransform(orgsCount, value => `${Math.floor(value).toLocaleString()}+`);
    const prodDisplay = useTransform(prodCount, value => `${Math.floor(value)}%`);
    const effDisplay = useTransform(effCount, value => `${Math.floor(value)}%`);
    const relDisplay = useTransform(relCount, value => `${value.toFixed(1)}%`);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoPlay) {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, [autoPlay]);

    useEffect(() => {
        const animation = animate(count, 100, {
            duration: 8,
            onComplete: () => count.set(0)
        });
        return animation.stop;
    }, [activeIndex]);

    // Animate stats on mount with natural easing
    useEffect(() => {
        const controls = [
            animate(orgsCount, 10000, {
                duration: 2,
                delay: 0.5,
                ease: [0.17, 0.67, 0.83, 0.67]
            }),
            animate(prodCount, 300, {
                duration: 1.5,
                delay: 0.7,
                ease: [0.17, 0.67, 0.83, 0.67]
            }),
            animate(effCount, 40, {
                duration: 1.2,
                delay: 0.9,
                ease: [0.17, 0.67, 0.83, 0.67]
            }),
            animate(relCount, 99.9, {
                duration: 2,
                delay: 1.1,
                ease: [0.17, 0.67, 0.83, 0.67]
            })
        ];

        return () => controls.forEach(c => c.stop());
    }, []);


    interface Testimonial {
        id: number;
        name: string;
        role: string;
        content: string;
        avatar: string;
        rating: number;
        companyColor: string;
    }

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Manager",
            content: "This platform revolutionized our workflow. We've seen a 300% increase in team productivity since implementation. The AI integrations are game-changing!",
            avatar: "/avatars/1.jpg",
            rating: 5,
            companyColor: "bg-blue-500"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "CTO",
            content: "The collaboration features are unlike anything we've used before. Our distributed team finally feels like we're working in the same room, even across time zones.",
            avatar: "/avatars/avatar2.jpg",
            rating: 5,
            companyColor: "bg-emerald-500"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Director of Operations",
            content: "Implementation was seamless and the results were immediate. We've reduced meeting times by 40% while improving decision quality. Worth every penny.",
            avatar: "/avatars/3.jpg",
            rating: 4,
            companyColor: "bg-violet-500"
        },
        {
            id: 4,
            name: "David Kim",
            role: "Engineering Lead",
            content: "The unified workspace eliminated 7 different tools we were using. The automation capabilities alone saved us 20+ hours per week per team member.",
            avatar: "/avatars/4.jpg",
            rating: 5,
            companyColor: "bg-amber-500"
        }
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        count.set(0);
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 12000);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        count.set(0);
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 12000);
    };

    return (
        <section className="relative py-28 bg-gradient-to-b from-white to-violet-50/30 overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100/40 blur-[100px]"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-violet-100/40 blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-indigo-100/30 blur-[80px]"></div>
            </motion.div>

            {/* Floating grid pattern */}
            <div className="absolute inset-0 opacity-5 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern" style={{ color: '#e5e7eb' }} />
                <style jsx>{`
                    .bg-grid-pattern {
                        background-image: 
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px);
                        background-size: 60px 60px;
                    }
                `}</style>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section header with animated gradient */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <motion.span
                        className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 text-blue-600 font-medium mb-6 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        Client Success Stories
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            Trusted
                        </span> by industry leaders
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Join organizations worldwide who have transformed their operations with our enterprise solutions.
                    </p>
                </motion.div>

                {/* Testimonials carousel */}
                <div className="relative">
                    {/* Progress bar */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-full overflow-hidden z-20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: count }}
                            transition={{ duration: 8, ease: "linear" }}
                        />
                    </motion.div>

                    {/* Main testimonial card */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100/80 backdrop-blur-sm"
                        onHoverStart={() => setAutoPlay(false)}
                        onHoverEnd={() => setAutoPlay(true)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-violet-50/30"></div>
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>

                        <div className="relative z-10 p-10 md:p-14">
                            <div className="flex flex-col md:flex-row gap-10">
                                {/* Avatar section */}
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <Image
                                            src={testimonials[activeIndex].avatar}
                                            alt={testimonials[activeIndex].name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
                                    </div>

                                    {/* Role indicator */}
                                    <div className={`mt-6 px-4 py-2 rounded-full ${testimonials[activeIndex].companyColor}/10 border ${testimonials[activeIndex].companyColor}/20 text-center`}>
                                        <p className="text-sm font-medium text-gray-700">{testimonials[activeIndex].role}</p>
                                        <div className={`w-8 h-1 mx-auto mt-1 rounded-full ${testimonials[activeIndex].companyColor}`}></div>
                                    </div>
                                </div>

                                {/* Testimonial content */}
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {testimonials[activeIndex].name}
                                            </h3>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className={`h-0.5 ${testimonials[activeIndex].companyColor} mt-1`}
                                            />
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0.8 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            delay: i * 0.1,
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 15
                                                        }}
                                                    >
                                                        <svg
                                                            className={`w-6 h-6 ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <span className="ml-2 text-gray-500 font-medium">
                                                {testimonials[activeIndex].rating}.0/5.0
                                            </span>
                                        </div>
                                    </div>

                                    <blockquote className="mt-8 text-gray-700 text-lg leading-relaxed relative">
                                        <div className="absolute -top-6 -left-6 text-7xl text-blue-100 font-serif leading-none">
                                            "
                                        </div>
                                        {testimonials[activeIndex].content}
                                        <div className="absolute -bottom-6 -right-6 text-7xl text-blue-100 font-serif leading-none rotate-180">
                                            "
                                        </div>
                                        <motion.div
                                            className={`absolute -bottom-8 right-0 h-1 ${testimonials[activeIndex].companyColor}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: '120px' }}
                                            transition={{ delay: 0.8, duration: 1 }}
                                        />
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation controls - positioned with numbers */}
                    <div className="flex items-center justify-center mt-16 space-x-6">
                        <motion.button
                            onClick={prevTestimonial}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <div className="flex space-x-4">
                            {testimonials.map((testimonial, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        count.set(0);
                                    }}
                                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${index === activeIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/80'}`}
                                    aria-label={`View testimonial ${index + 1}`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {index === activeIndex && (
                                        <motion.span
                                            className={`absolute inset-0 rounded-full ${testimonial.companyColor}/20`}
                                            layoutId="activeDot"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${index === activeIndex ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                        {index + 1}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            onClick={nextTestimonial}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Stats section with animated numbers */}
                <motion.div
                    className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Organizations */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-xl transition-all"
                    >
                        <div className="text-3xl mb-4">🏢</div>
                        <motion.div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {orgsDisplay}
                        </motion.div>
                        <div className="mt-3 text-gray-600 font-medium">
                            Organizations
                        </div>
                    </motion.div>

                    {/* Productivity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-xl transition-all"
                    >
                        <div className="text-3xl mb-4">📈</div>
                        <motion.div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {prodDisplay}
                        </motion.div>
                        <div className="mt-3 text-gray-600 font-medium">
                            Productivity gain
                        </div>
                    </motion.div>

                    {/* Efficiency */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-xl transition-all"
                    >
                        <div className="text-3xl mb-4">⏱️</div>
                        <motion.div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {effDisplay}
                        </motion.div>
                        <div className="mt-3 text-gray-600 font-medium">
                            Efficiency increase
                        </div>
                    </motion.div>

                    {/* Reliability */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-xl transition-all"
                    >
                        <div className="text-3xl mb-4">🔒</div>
                        <motion.div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {relDisplay}
                        </motion.div>
                        <div className="mt-3 text-gray-600 font-medium">
                            Platform reliability
                        </div>
                    </motion.div>
                </motion.div>

                {/* CTA section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Elevate your organization's performance</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Discover how our solutions can drive measurable results for your team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-medium overflow-hidden group"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">Request Enterprise Demo</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                        <motion.button
                            className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact Sales
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PremiumTestimonials;