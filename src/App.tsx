/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, LogIn, Users, Zap, ShieldCheck, Sparkles, Info } from 'lucide-react';
import FatherDashboard from './components/FatherDashboard';
import ConversationalOnboarding from './components/ConversationalOnboarding';

// Data for our visual carousel slides
interface TitleSegment {
  text: string;
  isClipped: boolean;
}

interface Slide {
  id: number;
  label: string;
  desktopTitle: TitleSegment[][];
  mobileTitle: TitleSegment[][];
  description: string;
  ctaText: string;    // Custom call to action
  image: string;      // Background texture source
  videoSrc: string;   // Direct background video source
  themeColor: string; // Tailwind text color class for active state highlights
  borderColor: string;// Border active color
  pulseClass: string; // Ripple pulse animation color
}

const SLIDES: Slide[] = [
  {
    id: 1,
    label: "EQUIPPING FATHERS TO",
    desktopTitle: [
      [
        { text: "LEAD WITH ", isClipped: false },
        { text: "FAITH,", isClipped: false }
      ],
      [
        { text: "LOVE & PURPOSE", isClipped: false }
      ]
    ],
    mobileTitle: [
      [
        { text: "LEAD WITH", isClipped: false }
      ],
      [
        { text: "FAITH, LOVE", isClipped: false }
      ],
      [
        { text: "& PURPOSE", isClipped: false }
      ]
    ],
    description: "Join a thriving community of intentional fathers committed to being physically and emotionally present in their children's lives.",
    ctaText: "Join The Foundation",
    image: "/src/assets/images/lush_rainforest_canopy_1780581121503.png",
    videoSrc: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780584745/IMG_3576_anxkvq.mov",
    themeColor: "text-[#E31E24]",
    borderColor: "border-[#E31E24]",
    pulseClass: "bg-[#E31E24]",
  },
  {
    id: 2,
    label: "RAISING",
    desktopTitle: [
      [
        { text: "THE BOY-", isClipped: false },
        { text: "CHILD", isClipped: false }
      ],
      [
        { text: "AS FUTURE FATHERS", isClipped: false }
      ]
    ],
    mobileTitle: [
      [
        { text: "THE BOY-CHILD", isClipped: false }
      ],
      [
        { text: "AS FUTURE", isClipped: false }
      ],
      [
        { text: "FATHERS", isClipped: false }
      ]
    ],
    description: "Every boy is becoming a man. The values he learns today and the examples he follows will shape the husband, leader, and father he becomes tomorrow.",
    ctaText: "Start Your Journey",
    image: "/src/assets/images/african_savanna_safari_1780581188839.png",
    videoSrc: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780584915/IMG_5664_wnrmta.mov",
    themeColor: "text-[#E31E24]",
    borderColor: "border-[#E31E24]",
    pulseClass: "bg-[#E31E24]",
  },
  {
    id: 3,
    label: "BUILDING",
    desktopTitle: [
      [
        { text: "A LAST", isClipped: false },
        { text: "ING", isClipped: false }
      ],
      [
        { text: "LEGACY", isClipped: false }
      ]
    ],
    mobileTitle: [
      [
        { text: "A LASTING", isClipped: false }
      ],
      [
        { text: "LEGACY", isClipped: false }
      ]
    ],
    description: "Through school Impact Tours, mentorship, books, and technology support, we are helping boys discover purpose, build character, and prepare for the future.",
    ctaText: "Be Part Of The Story",
    image: "/src/assets/images/african_crater_wildlife_1780581206524.png",
    videoSrc: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780585029/IMG_4115_tygvur.mov",
    themeColor: "text-[#E31E24]",
    borderColor: "border-[#E31E24]",
    pulseClass: "bg-[#E31E24]",
  }
];

const MEMBER_BENEFITS = [
  {
    id: "benefit-1",
    num: "01",
    titleLines: ["JIGI - THE MIRROR'S", "CONVERSATION"],
    description: "Weekly video content that challenges and inspires intentional fatherhood. Watch, reflect, and grow."
  },
  {
    id: "benefit-2",
    num: "02",
    titleLines: ["BROTHERHOOD", "COMMUNITY"],
    description: "Connect with fathers on the same journey. Share stories, ask questions, and support each other."
  },
  {
    id: "benefit-3",
    num: "03",
    titleLines: ["SKILL", "ACQUISITION"],
    description: "Learn a new high-income skill every month. Equip yourself to provide better for your family."
  },
  {
    id: "benefit-4",
    num: "04",
    titleLines: ["BREAKFAST", "MEETINGS"],
    description: "Periodic live gatherings and exclusive replays. Network, learn, and be part of something bigger."
  },
  {
    id: "benefit-5",
    num: "05",
    titleLines: ["SCHOOL IMPACT", "TOURS"],
    description: "Through school tours, mentorship, books, and technology support, we are helping boys discover purpose, build character, and prepare for the future."
  }
];

const TESTIMONIALS = [
  {
    id: "test-1",
    text: "Since joining the Brotherhood, my relationship with my teenage son has completely transformed. We talk now, and I am learning to be present without being overbearing.",
    name: "Tunde Opeyemi",
    role: "Father of Two",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-2",
    text: "The JIGI video lessons hit home every single week. I used to think of provisioning as only financial, but now I know physical and emotional presence is what my daughters truly need.",
    name: "Chidi Nwachukwu",
    role: "Father of Three",
    time: "4 days ago",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-3",
    text: "The School Impact Tour we did last month was eye-opening. Seeing how hungry these young boys are for father figures made me double down on being there for my own boys.",
    name: "Olumide Adebayo",
    role: "Father of One",
    time: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-4",
    text: "Being accountable to other intentional fathers has kept me on track. We don't just talk values — we live them. My family feels the difference daily.",
    name: "Emeka Okoye",
    role: "Father of Four",
    time: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-5",
    text: "Through the Breakfast Meetings and skill acquisition opportunities, I've not only improved my security as a provider but also learned how to lead with deep faith and purpose.",
    name: "Abubakar Ibrahim",
    role: "Father of Three",
    time: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);

  const activeSlide = SLIDES[currentIdx];

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const visibleTestimonials = [
    TESTIMONIALS[testimonialIdx],
    TESTIMONIALS[(testimonialIdx + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(testimonialIdx + 2) % TESTIMONIALS.length],
  ];

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Keyboard navigation for carousel slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isOnboardingActive) {
    return (
      <ConversationalOnboarding 
        onComplete={(profile) => {
          setUserProfile(profile);
          setIsOnboardingActive(false);
          setIsDashboardActive(true);
        }}
        onCancel={() => setIsOnboardingActive(false)}
      />
    );
  }

  if (isDashboardActive) {
    return <FatherDashboard onBackToWeb={() => setIsDashboardActive(false)} userProfile={userProfile} />;
  }

  return (
    <div className="relative w-full h-screen bg-[#0E1B3D] font-sans text-white overflow-y-auto select-none scroll-smooth">
      
      {/* SECTION 1: DYNAMIC HERO SLIDER */}
      <section className="relative w-full h-screen overflow-hidden select-none flex-shrink-0">
        
        {/* White login icon at top right corner of hero section */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12 z-40 pointer-events-auto">
          <button 
            className="text-white/80 hover:text-[#E31E24] hover:scale-110 active:scale-95 transition-all p-3 rounded-full bg-black/10 hover:bg-black/30 backdrop-blur-md focus:outline-none flex items-center justify-center border border-white/10 cursor-pointer" 
            title="Member Login" 
            aria-label="Member Login"
            onClick={() => setIsDashboardActive(true)}
          >
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        
        {/* BACKGROUND GRAPHIC (CINEMATIC DYNAMIC VIDEO BACKDROP) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIdx;
            return (
              <video
                key={slide.id}
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none select-none transition-opacity duration-1000 ease-in-out filter grayscale brightness-90 contrast-[1.12] md:grayscale-0 md:brightness-90 md:contrast-105 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                src={slide.videoSrc}
              />
            );
          })}
          
          {/* Deep navy color tint overlays to colorize the high contrast video - perfectly tuned to keep backgrounds bright and clear */}
          <div className="absolute inset-0 bg-[#0E1B3D]/12 md:bg-[#0E1B3D]/12 pointer-events-none mix-blend-color-burn" />
          <div className="absolute inset-0 bg-[#0E1B3D]/15 md:bg-[#0E1B3D]/22 pointer-events-none mix-blend-multiply" />
          
          {/* Subtle radial shading overlay to improve contrast - beautifully faint to ensure text legibility while keeping the content bright */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 md:via-black/25 to-[#0E1B3D]/40 md:to-[#0E1B3D]/70 pointer-events-none" />
        </div>

        {/* BLURRED ATMOSPHERIC LEFT LAYER - SLIT SCREEN DESKTOP EFFECT */}
        <div 
          className="absolute inset-y-0 left-0 z-10 w-full md:w-[45%] lg:w-[43%] xl:w-[44%] h-full 
                     bg-[#0E1B3D]/35 md:bg-[#0E1B3D]/65 backdrop-blur-[4px] md:backdrop-blur-[24px] 
                     border-r border-white/5 flex flex-col justify-between"
        >
          {/* TOP SPACER (Logo and Menu Removed) */}
          <div className="pt-8 md:pt-12 lg:pt-16 px-8 md:px-12 lg:px-16" />

          {/* HERO BODY FOR INFORMATION PANEL ON THE LEFT SLIT SECTION */}
          {/* pb-24 on mobile secures excellent breathing room so it doesn't overlap the navigation arrow buttons */}
          <main className="px-8 md:px-12 lg:px-16 py-6 md:py-10 flex flex-col justify-center flex-1 max-w-xl md:max-w-none pb-24 md:pb-10">
            <div className="space-y-4 md:space-y-6">
              
              {/* Context Header Label */}
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-4 bg-white/30"></span>
                <motion.p 
                  key={`${currentIdx}-lbl`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  className="font-display text-[10px] md:text-xs tracking-[0.35em] text-gray-200 uppercase"
                >
                  {activeSlide.label}
                </motion.p>
              </div>

              {/* TITLES WITH SPLIT GRAPHIC CONCEPT */}
              <div className="relative">

                {/* Desktop rendering structure of headline titles */}
                <div className="hidden md:block">
                  <h1 className="font-sans font-black text-4xl lg:text-5xl xl:text-6xl xl:leading-[0.95] tracking-tight whitespace-normal">
                    {activeSlide.desktopTitle.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        <span className="inline-block whitespace-nowrap">
                          {line.map((segment, sIdx) => (
                            <span key={sIdx} className="text-white font-black leading-none inline-block filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                              {segment.text}
                            </span>
                          ))}
                        </span>
                      </React.Fragment>
                    ))}
                  </h1>
                </div>

                {/* Mobile rendering structure: carefully line-wrapped with safe leading to fit exactly 3 lines max */}
                <div className="block md:hidden">
                  <h1 className="font-sans font-black text-3xl sm:text-4xl leading-[1.2] tracking-tight whitespace-normal">
                    {activeSlide.mobileTitle.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <span className="block h-1.5" />}
                        <span className="inline-block whitespace-nowrap">
                          {line.map((segment, sIdx) => (
                            <span key={sIdx} className="text-white font-black leading-none inline-block filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                              {segment.text}
                            </span>
                          ))}
                        </span>
                      </React.Fragment>
                    ))}
                  </h1>
                </div>

              </div>

              {/* Description Card Quote */}
              <div className="pt-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-sans italic text-xs md:text-sm lg:text-base text-gray-200 font-light leading-relaxed max-w-[340px] md:max-w-md"
                  >
                    "{activeSlide.description}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* CTA action link exactly in exact alignment with visual rules */}
              <div className="pt-1">
                <button 
                  className="group relative flex items-center gap-3 font-sans font-extrabold text-[11px] tracking-[0.25em] text-white hover:text-[#E31E24] uppercase italic transition-colors duration-300 pointer-events-auto cursor-pointer"
                  id="cta-learn-more"
                  onClick={() => setIsOnboardingActive(true)}
                >
                  <span>{activeSlide.ctaText}</span>
                  
                  {/* Horizontal dynamic animated expansion line indicator */}
                  <span className="relative w-8 h-[2px] bg-white/40 group-hover:bg-[#E31E24] group-hover:w-12 transition-all duration-300 rounded" />
                </button>
              </div>
            </div>
          </main>

          {/* BOTTOM LEFT FOOTING SPACING AND MEMBERSHIP RECONCILING */}
          <footer className="pb-8 md:pb-12 lg:pb-16 px-8 md:px-12 lg:px-16 text-white/40 max-w-[calc(100%-140px)] md:max-w-none">
            <button 
              className="flex items-center gap-2 font-display font-extrabold text-[10px] sm:text-xs tracking-[0.25em] text-white/60 hover:text-[#E31E24] hover:scale-[1.02] active:scale-98 transition-all uppercase bg-transparent border-none p-0 cursor-pointer focus:outline-none"
              onClick={() => setIsDashboardActive(true)}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>MEMBER LOGIN HERE</span>
            </button>
          </footer>
        </div>

        {/* RIGHT SIDE VERTICAL SLIDE CAROUSEL INDICATOR (RHOMBUS SHAPES) */}
        <div 
          className="absolute right-6 md:right-10 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-20 
                     flex flex-col items-center gap-5 transition-all duration-500"
        >
          {/* Top vertical slider line */}
          <div className="w-[1px] h-12 bg-gradient-to-t from-white/30 to-transparent" />

          {/* Rhombus page dots */}
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(idx > currentIdx ? 1 : -1);
                  setCurrentIdx(idx);
                }}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
                title={`View Slide ${idx + 1}`}
                id={`carousel-dot-${idx}`}
              >
                {/* Central Diamond layout shape */}
                <div 
                  className={`w-2.5 h-2.5 rotate-45 transform transition-all duration-300 ${
                    isActive 
                      ? `rotate-45 scale-125 ${slide.themeColor} bg-current` 
                      : 'bg-white/30 hover:bg-white/75'
                  }`} 
                />
              </button>
            );
          })}

          {/* Bottom vertical slider line */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>

        {/* BOTTOM RIGHT CORNER SLIDER SQUARES NAVIGATION CONTROLS */}
        <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 z-30 flex gap-4">
          
          {/* Previous slide control button */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 md:w-16 md:h-16 bg-transparent hover:text-[#E31E24] flex items-center justify-center text-white/70 transition-all duration-300 group focus:outline-none"
            id="btn-prev-slide"
            title="Previous Destination (Alt + Left)"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Next slide control button */}
          <button
            onClick={handleNext}
            className="w-12 h-12 md:w-16 md:h-16 bg-transparent hover:text-[#E31E24] flex items-center justify-center text-white/70 transition-all duration-300 group focus:outline-none"
            id="btn-next-slide"
            title="Next Destination (Alt + Right)"
          >
            <ArrowRight className="w-5 h-5 md:w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION 2: VISION & MISSION */}
      <section 
        className="relative w-full min-h-screen bg-[#081129] flex flex-col items-center justify-start py-16 md:py-24 px-6 md:px-12 lg:px-24 text-center select-text"
        id="section-vision-mission"
      >
        {/* Subtle decorative grid/grain texture backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1B3D] via-[#081129] to-[#04091A] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center pt-8">
          
          {/* Heading MATCHING typography size, spacing, and bold structure */}
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[44px] tracking-[0.06em] text-white uppercase mb-4 leading-tight">
            VISION & MISSION
          </h2>

          {/* Centered brand-adjusted description subtitle precisely matching font light styling */}
          <p className="max-w-2xl text-center text-white/70 font-sans font-light text-sm md:text-[15px] leading-relaxed tracking-wide opacity-90 mb-14">
            Define the brand’s purpose (mission) and long-term direction (vision), the why behind everything they do.
          </p>

          {/* Rounded cards container grid layout (split 50/50 on desktop, stacked on mobile) */}
          <div className="w-full bg-white text-black rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl border border-white/5 divide-y md:divide-y-0 md:divide-x divide-gray-150">
            
            {/* Left Card: OUR VISION */}
            <div className="flex flex-col bg-white">
              {/* Grayscale styled image header */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://res.cloudinary.com/dsmsugpys/image/upload/v1780587710/27_lvwgt6.jpg"
                  alt="Our Vision"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-[1.1] scale-102"
                />
              </div>
              {/* Padding block */}
              <div className="p-8 md:p-10 flex flex-col items-start text-left flex-1 bg-white">
                {/* Accent Triangle Corner Shape using red theme color */}
                <div className="w-0 h-0 border-t-[14px] border-t-[#E31E24] border-r-[14px] border-r-transparent mb-5" />
                
                <h3 className="font-sans font-black text-xl sm:text-2xl text-gray-900 mb-3 tracking-tight">
                  Our Vision
                </h3>
                
                <p className="font-sans text-xs md:text-[13px] text-gray-650 leading-relaxed font-light tracking-wide">
                  A generation of children growing up with present, loving, and intentional fathers who lead with faith and purpose.
                </p>
              </div>
            </div>

            {/* Right Card: OUR VALUES & OUR MISSION */}
            <div className="flex flex-col bg-white divide-y divide-gray-100">
              
              {/* Our Values (replaces second image section) */}
              <div className="p-8 md:p-10 flex flex-col items-start text-left bg-white">
                {/* Accent Triangle Corner Shape using red theme color */}
                <div className="w-0 h-0 border-t-[14px] border-t-[#E31E24] border-r-[14px] border-r-transparent mb-5" />
                
                <h3 className="font-sans font-black text-xl sm:text-2xl text-gray-900 mb-3 tracking-tight">
                  Our Values
                </h3>
                
                <p className="font-sans text-xs md:text-[13px] text-gray-650 leading-relaxed font-light tracking-wide">
                  <span className="font-bold text-gray-950">Presence, Accountability, Community, Growth, and Legacy</span> — building a brotherhood of intentional fathers.
                </p>
              </div>

              {/* Grayscale styled video header just like the vision image */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100">
                <video 
                  src="https://res.cloudinary.com/dsmsugpys/video/upload/v1780584745/IMG_3576_anxkvq.mov"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-[1.1] scale-102"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              {/* Our Mission */}
              <div className="p-8 md:p-10 flex flex-col items-start text-left flex-1 bg-white">
                {/* Accent Triangle Corner Shape using red theme color */}
                <div className="w-0 h-0 border-t-[14px] border-t-[#E31E24] border-r-[14px] border-r-transparent mb-5" />
                
                <h3 className="font-sans font-black text-xl sm:text-2xl text-gray-900 mb-3 tracking-tight">
                  Our Mission
                </h3>
                
                <p className="font-sans text-xs md:text-[13px] text-gray-655 leading-relaxed font-light tracking-wide">
                  To equip and encourage fathers to be physically and emotionally present in their children's lives through intentional actions.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: WHAT MEMBERS GET - STARRING CRITICAL LIGHT REPLICA DESIGN */}
      <section 
        className="relative w-full min-h-screen bg-white text-black py-16 md:py-24 px-6 md:px-12 lg:px-24 select-text flex flex-col justify-start"
        id="section-members-get"
      >
        {/* Subtle, premium divider line from the very top boundaries */}
        <div className="absolute inset-x-0 top-0 border-t border-black/10 mx-6 md:mx-12 lg:mx-24" />

        {/* 1. TOP HEADER BRAND BAR - Exactly duplicating the screenshot's navigation layout */}
        <div className="w-full flex items-center justify-between pb-12 text-[10px] sm:text-xs tracking-[0.25em] font-sans font-bold text-black uppercase">
          <div />
          <div className="hidden md:flex items-center gap-8 font-light text-black/60 tracking-[0.2em] text-[10px]">
            <a href="#section-vision-mission" className="hover:text-black transition-colors">VISION & MISSION</a>
            <span className="opacity-35">&bull;</span>
            <a href="#section-members-get" className="hover:text-black font-semibold transition-colors">WHAT MEMBERS GET</a>
          </div>
          <div />
        </div>

        {/* 2. MAIN HEADER & CAPABILITY CONTENT */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center flex-grow pt-8 pb-16">
          
          {/* Pill button like ● OUR PROMISE TO YOU block */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-black/10 rounded-full text-[10px] tracking-widest text-black/80 font-sans font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-pulse" />
              OUR PROMISE TO YOU
            </span>
          </div>

          {/* MAIN HEADLINE precisely matching spacing, size, font weight, linebreaks */}
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[70px] tracking-tight text-center uppercase leading-[0.95] mb-6 select-all">
            WHAT MEMBERS<br />GET
          </h2>

          {/* THE SUB HEADLINE */}
          <p className="max-w-xl mx-auto text-center text-gray-500 text-xs sm:text-sm font-sans font-light leading-relaxed tracking-wide mb-24">
            Everything you need to become the father your children deserve
          </p>

          {/* THE GRID LAYOUT EXACTLY MATCHING SCREEENSHOT CHANNELS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 mt-4">
            {MEMBER_BENEFITS.map((benefit) => (
              <div key={benefit.id} className="flex flex-col text-center relative group">
                
                {/* NUMBER & LINE HEADER */}
                <div className="w-full relative mb-10">
                  {/* Subtle serial number top-left of the bar as seen in the image */}
                  <span className="absolute left-0 -top-6 text-[10px] sm:text-xs text-gray-400 font-sans font-medium tracking-widest">
                    {benefit.num}
                  </span>
                  
                  {/* Divider Line */}
                  <div className="w-full h-[1px] bg-gray-200 group-hover:bg-[#E31E24]/30 transition-colors duration-300" />
                </div>

                {/* TITLE & DESCRIPTION CONTAINER WITH PERFECT PADDING */}
                <div className="px-2">
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-gray-900 tracking-tight uppercase leading-none mb-4 whitespace-pre-wrap">
                    {benefit.titleLines.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        <span>{line}</span>
                      </React.Fragment>
                    ))}
                  </h3>

                  <p className="max-w-xs sm:max-w-sm mx-auto font-sans font-light text-xs sm:text-[13px] text-gray-500 leading-relaxed tracking-wide">
                    {benefit.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

      {/* SECTION 4: TESTIMONIALS - HIGH END NAVY REPLICA DESIGN */}
      <section 
        className="relative w-full min-h-screen bg-[#2A3046] text-white py-20 md:py-28 px-6 md:px-12 lg:px-24 select-text flex flex-col justify-start"
        id="section-testimonials"
      >
        {/* Decorative corner accent utilizing foundation red to frame background transition */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-t-[#E31E24] border-r-[20px] border-r-transparent opacity-90" />

        {/* 1. TOP TITLE GROUP */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-4 pb-12">
          <h2 className="font-sans font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-center uppercase leading-[1.15] mb-4 text-white select-all">
            READ THEIR STORIES,<br />ONE DAY SOMEONE<br />COULD BE READING YOURS!
          </h2>
          
          {/* Replica Rating Line */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 font-sans tracking-wide mt-2">
            <span className="font-bold text-white">4.9 / 5</span>
            <span className="text-[#00b67a] text-lg">★</span>
            <span className="font-semibold text-white tracking-widest uppercase text-[10px]">BROTHERHOOD</span>
            <span className="text-gray-400">Based on 140+ active testimonies</span>
          </div>
        </div>

        {/* 2. SPLIT LAYOUT FOR WHAT FATHERS SAY & PORTRAITS CARD CONTEXT */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 flex-grow">
          
          {/* LEFT SIDEBAR: Heading and Navigation controller replicating image layout */}
          <div className="col-span-1 lg:col-span-4 flex flex-col text-left items-start lg:sticky lg:top-24 mt-2">
            
            {/* Huge double quotation mark in low-opacity accent matching screenshot */}
            <span className="font-serif text-[100px] md:text-[130px] leading-none text-white/5 font-black -mb-8 -ml-3 select-none">
              “
            </span>

            <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight uppercase leading-[1.0] text-left max-w-xs select-none">
              WHAT OUR<br />FATHERS ARE<br />SAYING
            </h3>

            {/* Custom interactive replica slider dots or arrow bars */}
            <div className="flex items-center gap-4 mt-8 md:mt-12 select-none justify-start w-full max-w-[240px]">
              <button 
                onClick={handlePrevTestimonial}
                className="text-white/60 hover:text-[#E31E24] hover:bg-white/5 active:scale-95 transition-all p-2 -ml-2 rounded-full border border-white/10"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              {/* Horizontal line progress indicator bar matches image layout */}
              <div className="flex-grow h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#E31E24] transition-all duration-300 rounded-full" 
                  style={{ width: `${((testimonialIdx + 1) / TESTIMONIALS.length) * 100}%` }} 
                />
              </div>

              <button 
                onClick={handleNextTestimonial}
                className="text-white/60 hover:text-[#E31E24] hover:bg-white/5 active:scale-95 transition-all p-2 rounded-full border border-white/10"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Helper text */}
            <p className="text-[10px] text-gray-400 mt-3 font-sans tracking-wide uppercase select-none opacity-50">
              Story {testimonialIdx + 1} of {TESTIMONIALS.length}
            </p>

          </div>

          {/* RIGHT SIDEBAR: Speech-bubble card deck that updates based on sliding indexes */}
          <div className="col-span-1 lg:col-span-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {visibleTestimonials.map((testimonial, tIndex) => {
                // Responsive visibility helpers:
                // Card 1 is visible always.
                // Card 2 is visible on MD/LG screens.
                // Card 3 is visible on LG screens only.
                const visibilityClass = 
                  tIndex === 0 
                    ? "block" 
                    : tIndex === 1 
                      ? "hidden md:block" 
                      : "hidden lg:block";

                return (
                  <div 
                    key={`${testimonial.id}-${tIndex}`} 
                    className={`flex flex-col relative group transition-all duration-300 ${visibilityClass}`}
                  >
                    {/* SPEECH BUBBLE CARD BOX */}
                    <div className="bg-white text-gray-800 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between min-h-[220px] relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                      <div>
                        {/* Rating stars in exact green tone matching screenshot */}
                        <div className="flex items-center gap-0.5 text-[#00b67a] mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Testimony text block */}
                        <p className="font-sans text-xs sm:text-[13px] text-gray-650 leading-relaxed font-light">
                          "{testimonial.text}"
                        </p>
                      </div>

                      {/* SPEECH BUBBLE TAIL PIN POINTED DOWNWARDS */}
                      <div className="absolute left-8 bottom-[-8px] w-4 h-4 bg-white rotate-45 shadow-[3px_3px_5px_-1px_rgba(0,0,0,0.04)]" />
                    </div>

                    {/* AVATAR FOOTER WITH REAL PORTRAITS AND LOCATIONS */}
                    <div className="flex items-center gap-3.5 mt-6 pl-4 select-none">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border-[3px] border-white/10 shadow-lg grayscale-[20%] group-hover:grayscale-0 group-hover:border-white/30 transition-all duration-300"
                      />
                      <div className="text-left font-sans">
                        <h4 className="font-extrabold text-xs sm:text-[13px] text-white tracking-wide group-hover:text-[#E31E24] transition-colors">
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-gray-400 font-light mt-0.5">
                          <span>{testimonial.role}</span>
                          <span className="opacity-40">&bull;</span>
                          <span className="font-mono text-[9px]">{testimonial.time}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 5: THE NEXT BREAKTHROUGH STARTS HERE (RECREATING SCREENSHOT WITH LUXURIOUS FOCUS) */}
      <section 
        className="relative w-full bg-white text-gray-950 py-16 md:py-24 px-4 sm:px-6 md:px-12 select-text"
        id="section-breakthrough"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Navy outer border layout frame simulating screenshot */}
          <div className="bg-gradient-to-b from-[#2A3046]/5 to-white border-[14px] md:border-[18px] border-[#2A3046] rounded-[28px] md:rounded-[40px] shadow-xl pt-16 pb-12 px-6 sm:px-12 md:px-16 flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Top pill badge: The Narratives Changes With Us! */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-[11px] sm:text-xs tracking-wider text-[#2A3046] font-sans font-bold select-none shadow-sm capitalize">
                <Info className="w-3.5 h-3.5 text-[#2A3046]" />
                The Narratives Changes With Us!
              </span>
            </div>

            {/* Massive headline matches screenshot exactly */}
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-tight text-gray-900 mb-6 uppercase select-all max-w-4xl mx-auto">
              The Next <span className="text-[#E31E24]">Generation</span><br className="hidden sm:inline" /> Is Watching
            </h2>

            {/* Paragraph text with warm tone rewritten for fathering */}
            <p className="max-w-2xl mx-auto text-gray-500 text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed tracking-wide mb-10">
              Every present father raises a future father. Join a movement committed to raising intentional boys, strengthening men, and building stronger families for generations to come.
            </p>

            {/* Interactive button layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
              {/* Start Your Journey button */}
              <button 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-[#E31E24]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                onClick={() => setIsOnboardingActive(true)}
              >
                <span>Join The Movement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Login button (replacing Watch Demo) */}
              <button 
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => setIsDashboardActive(true)}
              >
                <span>Login</span>
              </button>
            </div>

            {/* Badge ratings metadata of the system */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-400 font-sans tracking-wide border-t border-gray-100 pt-8 w-full max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FE0000]/70" />
                <span>Trusted by 5,000+ fathers</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>10x deeper connection</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% secure</span>
              </div>
            </div>

          </div>
        </div>

        {/* Global minimal footer with copyright */}
        <div className="w-full text-center pt-16 md:pt-24 border-t border-gray-100 mt-6 text-gray-400 text-xs font-sans tracking-widest uppercase">
          © 2026 The Intentional Father Foundation. All rights reserved.
        </div>
      </section>

    </div>
  );
}
