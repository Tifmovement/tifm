import React, { useState } from "react";
import { Clock, MapPin, ArrowRight, Send, CheckCircle, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EventScheduleItem {
  id: string;
  title: string;
  description: string;
  image: string;
  timeLine1: string;
  timeLine2: string;
  locationLine1: string;
  locationLine2: string;
}

const SCHEDULE_DATA: Record<string, { daysInfo: { title: string; date: string }; events: EventScheduleItem[] }> = {
  "day-01": {
    daysInfo: { title: "Day 01", date: "15 July 2026" },
    events: [
      {
        id: "e1",
        title: "THE INTENTIONAL FATHER & MEN BREAKFAST MEETING",
        description: "An elite morning gathering of fathers committed to response-able parenting, vision mapping, and legacy building.",
        image: "https://res.cloudinary.com/dsmsugpys/video/upload/v1780584745/IMG_3576_anxkvq.jpg",
        timeLine1: "10 AM To 01 PM",
        timeLine2: "15 July 2026",
        locationLine1: "Mauve 21 Event Centre, Ring Road",
        locationLine2: "Ibadan, Nigeria"
      },
      {
        id: "e2",
        title: "School Impact Tour 2026",
        description: "Partnering with schools to cultivate high character, emotional maturity, and authentic discipline in children.",
        image: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780668696/IMG_7480_vgnyk9.jpg",
        timeLine1: "02 PM To 05 PM",
        timeLine2: "15 July 2026",
        locationLine1: "Lead City International School Hall",
        locationLine2: "Ibadan, Nigeria"
      },
      {
        id: "e3",
        title: "The Boy-child Digital Skill Acquisition",
        description: "Fostering technical intelligence and digital proficiency in the next generation of resilient tech leaders.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
        timeLine1: "06 PM To 09 PM",
        timeLine2: "15 July 2026",
        locationLine1: "Kakanfo Inn Conference Suite",
        locationLine2: "Ibadan, Nigeria"
      }
    ]
  },
  "day-02": {
    daysInfo: { title: "Day 02", date: "17 July 2026" },
    events: []
  },
  "day-03": {
    daysInfo: { title: "Day 03", date: "20 July 2026" },
    events: []
  }
};

export default function EventSchedule() {
  const [activeDay, setActiveDay] = useState<string>("day-01");
  const [ticketModalSuccess, setTicketModalSuccess] = useState<boolean>(false);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const activeData = SCHEDULE_DATA[activeDay];

  const handleBuyTicket = (eventName: string) => {
    setSelectedEventName(eventName);
    setTicketModalSuccess(true);
    setTimeout(() => {
      setTicketModalSuccess(false);
    }, 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-[#050914] text-white overflow-hidden" id="event-schedule-section">
      {/* EVENT SCHEDULE SUB-SECTION */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col justify-start">
        
        {/* UPPER TITLE & BADGES BAR ROW EXACTLY REPLICATING SCREENSHOT */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          {/* LEFT HEADLINE ZONE */}
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#ab8bfd] font-sans uppercase block mb-3">
              EVENT SCHEDULE
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Follow Event Schedule
            </h2>
          </div>

          {/* RIGHT TABS LISTING ZONE WITH GRADIENT BALLOONS EXACTLY AS IN THE SCREENSHOT */}
          <div className="flex items-center gap-3 self-stretch md:self-auto overflow-x-auto scrollbar-none py-2 pr-4">
            {Object.keys(SCHEDULE_DATA).map((dayKey) => {
              const day = SCHEDULE_DATA[dayKey];
              const isSelected = activeDay === dayKey;

              if (isSelected) {
                return (
                  <button
                    key={dayKey}
                    onClick={() => setActiveDay(dayKey)}
                    className="relative flex-shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#d91e5a] to-[#592be3] text-left text-white shadow-lg focus:outline-none cursor-pointer transition-all duration-300 scale-102"
                    id={`tab-${dayKey}`}
                  >
                    {/* Top bold Label */}
                    <div className="font-sans font-bold text-xs sm:text-[13px] leading-tight flex items-center gap-1.5">
                      <span>{day.daysInfo.title}</span>
                    </div>
                    {/* Sub title details */}
                    <div className="font-sans text-[10px] opacity-90 font-light mt-0.5 whitespace-nowrap">
                      {day.daysInfo.date}
                    </div>
                    
                    {/* Speech marker downward arrow exactly styled */}
                    <div className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 bg-[#a323a6] rotate-45 select-none pointer-events-none" />
                  </button>
                );
              }

              return (
                <button
                  key={dayKey}
                  onClick={() => setActiveDay(dayKey)}
                  className="flex-shrink-0 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-black/45 hover:bg-black/60 text-left text-white/80 focus:outline-none cursor-pointer transition-all duration-300"
                  id={`tab-${dayKey}`}
                >
                  <div className="font-sans font-semibold text-xs sm:text-[13px] text-white">
                    {day.daysInfo.title}
                  </div>
                  <div className="font-sans text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                    {day.daysInfo.date}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LIST OF CARDS WITH HIGH FIDELITY GRADIENTS & EXACT SPACING AS SCREENSHOT */}
        <div className="flex flex-col gap-5 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              {activeData.events.length === 0 ? (
                <div className="w-full bg-[#0d1222]/50 border border-white/5 rounded-3xl p-12 text-center my-6 flex flex-col items-center justify-center">
                  <Clock className="w-8 h-8 text-[#ab8bfd]/60 mb-3 animate-pulse" />
                  <p className="font-sans text-gray-300 font-semibold text-base">New Schedule Coming Soon</p>
                  <p className="font-sans text-xs text-gray-400 mt-1 max-w-sm">We are cooking up high impact masterclasses for this session block. Check back shortly!</p>
                </div>
              ) : (
                activeData.events.map((event) => (
                  <div
                    key={event.id}
                    className="w-full bg-[#0d1222]/90 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#11172a] transition-all duration-300 shadow-md group"
                  >
                    
                    {/* TEXT BLOCK (TITLE AND SUBTEXT) */}
                    <div className="flex-1 text-left max-w-sm">
                      <h3 className="font-sans font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug group-hover:text-[#ab8bfd] transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="font-sans font-light text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* THUMBNAIL PICTURE IN MIDDLE */}
                    <div className="w-full md:w-[150px] lg:w-[180px] h-[100px] sm:h-[110px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none grayscale saturate-0 contrast-110"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* TIME & LOCATION SECTION */}
                    <div className="flex flex-col gap-4 text-left font-sans text-xs sm:text-[13px] text-gray-300 min-w-[200px] flex-shrink-0 pl-[2px] md:pl-4">
                      {/* TIME */}
                      <div className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5" />
                        <div>
                          {event.timeLine1 && <strong className="font-semibold text-white/95 block">{event.timeLine1}</strong>}
                          <span className="text-gray-400 font-light text-[11px] sm:text-xs">{event.timeLine2}</span>
                        </div>
                      </div>
                      {/* LOCATION */}
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-3.5 h-3.5 text-white/50 mt-[2px] flex-shrink-0" />
                        <div>
                          {event.locationLine1 && <strong className="font-semibold text-white/95 block">{event.locationLine1}</strong>}
                          <span className="text-gray-400 font-light text-[11px] sm:text-xs">{event.locationLine2}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA BUTTON COMPLIANT WITH Buy Ticket -> SCREENSHOT */}
                    <div className="w-full md:w-auto flex justify-start md:justify-end flex-shrink-0">
                      <button
                        onClick={() => handleBuyTicket(event.title)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#ca1a66] via-[#7e2be6] to-[#592be3] hover:from-[#e31e78] hover:to-[#6328f5] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-lg shadow-[#701db5]/15 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Register Now</span>
                        <MousePointerClick className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FEEDBACK POPUP/MODAL WHEN RESERVED / BOUGHT TICKET */}
      <AnimatePresence>
        {ticketModalSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-10 right-6 md:right-12 z-50 bg-[#12182c] border border-emerald-500/30 shadow-2xl rounded-2xl p-4 max-w-sm flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold font-sans text-white uppercase tracking-wider">Registration Logged</h4>
              <p className="text-[11px] text-gray-300 font-sans mt-0.5">
                We've reserved your seat for <strong className="text-white">{selectedEventName}</strong>. See you in Ibadan!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GET LATEST UPDATES SUBSCRIBE TO OUR NEWSLETTER ZONE EXACTLY AS IN THE BOTTOM GRAPHIC SCREENSHOT */}
      <div className="w-full bg-[#050914] pt-8 pb-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto rounded-[32px] overflow-hidden bg-gradient-to-r from-[#4d1fb2] via-[#ab1476] to-[#dd195b] shadow-2xl p-10 sm:p-14 lg:p-16 text-center relative">
          {/* Subtle noise grid filter or light beam behind the texts */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
            <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-[42px] leading-tight text-white tracking-tight mb-8 drop-shadow-sm uppercase">
              Get Latest Updates Subscribe<br className="hidden sm:inline" /> To Our Newsletter
            </h2>
            
            {/* INPUT FORM FIELD MATCHING THE COMPACT BAR DESIGN IN THE IMAGE */}
            <form onSubmit={handleSubscribe} className="w-full max-w-lg relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder-white/60 font-sans text-xs sm:text-sm pl-6 pr-14 py-3"
              />
              <button
                type="submit"
                className="absolute right-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center text-[#9b2075] hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm"
                title="Subscribe Now"
              >
                <Send className="w-4 h-4 text-violet-700" />
              </button>
            </form>

            <AnimatePresence>
              {newsletterSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-sans font-semibold text-xs sm:text-sm text-emerald-250 mt-4 text-white"
                >
                  🎉 Successfully subscribed! You will receive our premium event logs.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
