import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated high quality travel / diary images for each of the categories matching the screenshot style in premium resolution
const DIARY_DATA: Record<string, { id: number; url: string; hasPlay?: boolean; isVideo?: boolean; alt: string }[]> = {
  Lagos: [
    {
      id: 1,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668565/IMG_5895_jsc0j6.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "Lagos high energy video journal"
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668266/27_g3p3wu.jpg",
      alt: "Lagos city overview"
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668262/25_gxeybp.jpg",
      alt: "Lagos memories and friends"
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668559/IMG_5892_phgtii.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "Lagos dynamic experience"
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/f_auto,q_auto/v1780668696/IMG_7748_jodm8n.jpg",
      alt: "Lagos portrait snapshot"
    }
  ],
  Ibadan: [
    {
      id: 6,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668556/IMG_5890_hwh389.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "Ibadan hills and horizons video"
    },
    {
      id: 7,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668262/19_hyhape.jpg",
      alt: "Ibadan natural landscape"
    },
    {
      id: 8,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/f_auto,q_auto/v1780668698/IMG_7795_tipnkv.jpg",
      alt: "Ibadan classic scenery"
    },
    {
      id: 9,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668536/IMG_5888_tn4wli.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "Ibadan local exploration clip"
    },
    {
      id: 10,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668262/24_rjhfmm.jpg",
      alt: "Ibadan gather moments"
    }
  ],
  London: [
    {
      id: 11,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/f_auto,q_auto/v1780668699/IMG_8030_klsdmh.jpg",
      alt: "London architecture highlights"
    },
    {
      id: 12,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668261/10_y5fpy2.jpg",
      alt: "London sunset skyline"
    },
    {
      id: 13,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668260/1_yrbus3.jpg",
      alt: "London local lifestyle"
    },
    {
      id: 14,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668565/IMG_5895_jsc0j6.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "London travel atmosphere video"
    },
    {
      id: 15,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668266/27_g3p3wu.jpg",
      alt: "London memorable details"
    }
  ],
  "School Tour": [
    {
      id: 16,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668559/IMG_5892_phgtii.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "School Tour interactive presentation video"
    },
    {
      id: 17,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/f_auto,q_auto/v1780668696/IMG_7748_jodm8n.jpg",
      alt: "School Tour team bonding"
    },
    {
      id: 18,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668556/IMG_5890_hwh389.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "School Tour campus walkthrough"
    },
    {
      id: 19,
      url: "https://res.cloudinary.com/dsmsugpys/image/upload/f_auto,q_auto/v1780668698/IMG_7795_tipnkv.jpg",
      alt: "School Tour class event photo"
    },
    {
      id: 20,
      url: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780668536/IMG_5888_tn4wli.mp4",
      hasPlay: true,
      isVideo: true,
      alt: "School Tour student memories video"
    }
  ]
};

const CATEGORIES = ["Lagos", "Ibadan", "London", "School Tour"];

export default function VisualDiary() {
  const [activeCategory, setActiveCategory] = useState("Lagos");
  const [centerIndex, setCenterIndex] = useState(2); // Start with third photo centered exactly

  const currentSlides = DIARY_DATA[activeCategory] || DIARY_DATA.Lagos;

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + 5) % 5);
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % 5);
  };

  const handleTagClick = (category: string) => {
    setActiveCategory(category);
    setCenterIndex(2); // Reset to center element
  };

  return (
    <section 
      className="relative w-full bg-[#ffffff] py-20 md:py-28 px-4 sm:px-6 md:px-12 select-none flex flex-col items-center justify-start overflow-hidden"
      id="section-visual-diary"
    >
      {/* 🔴 HEADER LABELS & BADGES */}
      <div className="text-center mb-4">
        <p className="font-sans font-medium text-[11px] md:text-xs tracking-[0.25em] text-gray-500 uppercase mb-3">
          GALLERY
        </p>
        <h2 className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl text-gray-950 tracking-tight mb-2">
          Our Visual Diary
        </h2>
        <p className="font-sans font-light text-xs sm:text-sm md:text-base text-gray-500 max-w-lg mx-auto">
          Our journeys in pictures and videos
        </p>
      </div>

      {/* 🔴 CATEGORY PILL SELECTORS */}
      <div className="w-full max-w-5xl mx-auto mb-16 mt-8 flex flex-wrap items-center justify-center pb-4 px-2 gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleTagClick(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border focus:outline-none cursor-pointer ${
                isSelected
                  ? "bg-[#030a21] border-[#030a21] text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
              id={`tag-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          );
        })}
        
        {/* View More Tag button exactly like the design screenshot */}
        <button
          onClick={() => handleTagClick("Lagos")}
          className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border border-gray-200 text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none flex items-center gap-1.5 cursor-pointer"
          id="tag-view-more"
        >
          <span>View More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 🔴 MAIN THREE-DIMENSIONAL OVERLAPPING SLIDER CAROUSEL BLOCK */}
      <div className="relative w-full max-w-6xl h-[330px] sm:h-[450px] lg:h-[480px] flex items-center justify-center mb-10 overflow-visible mt-2">
        <div className="absolute inset-x-0 w-full flex items-center justify-center h-full pointer-events-auto">
          
          {currentSlides.map((slide, idx) => {
            // Compute the modular difference from center index (supports 5 cards safely)
            let diff = idx - centerIndex;
            if (diff < -2) diff += 5;
            if (diff > 2) diff -= 5;

            // Compute exact translation properties replicating screenshot
            let zIndex = 10;
            let opacity = 0.5;
            let scale = 0.68;
            let translateX = "0px";
            let filter = "brightness(0.95)";

            if (diff === 0) {
              zIndex = 30;
              opacity = 1;
              scale = 1;
              translateX = "0px";
              filter = "brightness(1)";
            } else if (diff === -1) {
              zIndex = 20;
              opacity = 0.82;
              scale = 0.84;
              translateX = "-40%";
              filter = "brightness(0.9)";
            } else if (diff === 1) {
              zIndex = 20;
              opacity = 0.82;
              scale = 0.84;
              translateX = "40%";
              filter = "brightness(0.9)";
            } else if (diff === -2) {
              zIndex = 10;
              opacity = 0.45;
              scale = 0.68;
              translateX = "-80%";
              filter = "brightness(0.8)";
            } else if (diff === 2) {
              zIndex = 10;
              opacity = 0.45;
              scale = 0.68;
              translateX = "80%";
              filter = "brightness(0.8)";
            }

            const activeShadow = diff === 0 
              ? "shadow-[0_30px_70px_rgba(0,0,0,0.48)]" 
              : "shadow-[0_15px_30px_rgba(0,0,0,0.18)]";

            return (
              <motion.div
                key={slide.id}
                animate={{
                  x: translateX,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                }}
                style={{ filter: filter }}
                className={`absolute w-[220px] h-[280px] sm:w-[310px] sm:h-[400px] lg:w-[330px] lg:h-[430px] rounded-[24px] overflow-hidden ${activeShadow} transition-shadow duration-500 cursor-pointer origin-center flex-shrink-0 select-none bg-gray-100 flex items-center justify-center`}
                onClick={() => {
                  if (diff !== 0) setCenterIndex(idx);
                }}
              >
                {/* Image or Video */}
                {slide.isVideo ? (
                  <video
                    key={slide.id}
                    src={slide.url}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={slide.url}
                    alt={slide.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                )}

                {/* Subtly darkened bottom overlay to contrast play icons or text lines if needed */}
                {slide.hasPlay && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Overlaid play bubble icon on direct bottom right matching exactly */}
                {slide.hasPlay && (
                  <div className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform flex-shrink-0 shadow-sm">
                    <Play className="w-5 h-5 text-gray-900 fill-gray-900 translate-x-[1.5px]" />
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* 🔴 BOTTOM EMBEDDED CIRCULAR ARROW BUTTONS */}
      <div className="flex items-center gap-4 justify-center mt-3">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full border border-gray-400 hover:border-gray-900 bg-white hover:bg-gray-55 flex items-center justify-center text-gray-800 transition-all focus:outline-none cursor-pointer"
          id="btn-diary-prev"
          title="Previous Image"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full border border-gray-400 hover:border-gray-900 bg-white hover:bg-gray-55 flex items-center justify-center text-gray-800 transition-all focus:outline-none cursor-pointer"
          id="btn-diary-next"
          title="Next Image"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}
