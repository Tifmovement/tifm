import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Play, Award, Calendar, BookOpen, User, Trophy, Flame, Bell, CheckCircle, 
  Search, Bookmark, Sliders, ChevronRight, Share2, LogIn, Sparkles, MessageSquare, 
  MapPin, Clock, ArrowRight, ArrowLeft, Zap, PlayCircle, Eye, ThumbsUp, Send, UserCheck, Shield, HelpCircle, Radio
} from 'lucide-react';
import Logo from './Logo';

interface ComponentProps {
  onBackToWeb: () => void;
  userProfile?: {
    fullName: string;
    preferredTitle: string;
    email: string;
    phone: string;
    city: string;
    role: 'father' | 'boy_child';
    username: string;
    joinedDate?: string;
  };
}

// Badge tier milestones
const BADGES = [
  { name: "Seed", icon: "🌱", minPoints: 0, description: "Just starting your intentional fatherhood journey." },
  { name: "Root", icon: "🪵", minPoints: 200, description: "Strong foundation, building roots of presence." },
  { name: "Branch", icon: "🌿", minPoints: 500, description: "Reaching out, active in brotherhood and skill learning." },
  { name: "Tree", icon: "🌳", minPoints: 1000, description: "A pillar of strength, deeply shelter-providing and wise." },
  { name: "Forest", icon: "🌲", minPoints: 2000, description: "Leading a legacy movement of intentional legacy generation." }
];

// List of all point actions for rules table
const POINT_ACTIONS = [
  { key: "challenge", action: "Complete a Daily Challenge", points: 10 },
  { key: "video", action: "Watch a JIGI video (>80% watched)", points: 20 },
  { key: "reflection", action: "Answer JIGI Reflection Question", points: 10 },
  { key: "replay", action: "Watch Breakfast Meeting Replay", points: 15 },
  { key: "community", action: "Post in Community (story/discussion)", points: 5 },
  { key: "event", action: "Attend/Register for a live event", points: 25 },
  { key: "skill", action: "Complete a Skill Module lesson", points: 15 },
  { key: "streak7", action: "7-day challenge streak bonus", points: 50 },
  { key: "streak30", action: "30-day challenge streak bonus", points: 150 },
  { key: "referral", action: "Refer a new member", points: 30 }
];

const INITIAL_CHALLENGES = [
  {
    id: "c-1",
    day: "Today",
    title: "Eye-Level Connection",
    category: "Presence",
    task: "Spend 15 minutes of uninterrupted, eye-level play or deep conversation with your child. No screens allowed.",
    points: 10,
    icon: "👁️"
  },
  {
    id: "c-2",
    day: "Yesterday",
    title: "The Verbal Affirmation",
    category: "Words",
    task: "Say 'I am proud of the person you are becoming' to your child, mentioning a specific character trait (e.g., integrity).",
    points: 10,
    icon: "🗣️"
  },
  {
    id: "c-3",
    day: "2 Days ago",
    title: "The Legacy Budget Review",
    category: "Financial",
    task: "Review and carve out a specific 'Family Education or Character Development' savings category.",
    points: 10,
    icon: "💰"
  },
  {
    id: "c-4",
    day: "3 Days ago",
    title: "Family Prayer/Reflection",
    category: "Spiritual",
    task: "Lead your children in a 10-minute bedtime prayer session centered purely around thankfulness.",
    points: 10,
    icon: "🙌"
  },
  {
    id: "c-5",
    day: "4 Days ago",
    title: "Physical Run / Stamina",
    category: "Physical Health",
    task: "Go on a 20-minute physical walk or run outdoors with your child. Speak about health, stamina, and growth.",
    points: 10,
    icon: "🏃‍♂️"
  }
];

const INITIAL_JIGI_EPISODES = [
  {
    id: "jigi-1",
    title: "THE INTENTIONAL FATHER LAUNCH IBADAN",
    summary: "equipping Fathers to lead intentionally, build stronger families, and shape societies that reflect God’s design for greatness. 🌍",
    youtubeId: "-QR8DqbI0qA", // YouTube Live Video ID
    duration: "165:00",
    publishedAt: "This Week",
    reflectionQuestion: "What is your primary resolution from the Ibadan Launch lesson? Write down how you will equip your household with intentionality.",
    watches: 1240,
    likes: 382,
    commentsCount: 42,
    videoUrl: "https://www.youtube.com/embed/-QR8DqbI0qA", // Embed link
    coverImg: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780599162/27_mimugw.jpg",
    grayscale: true
  },
  {
    id: "jigi-2",
    title: "Fathering From the Heart: Active Listening",
    summary: "Discover the difference between listening to reply versus listening to understand. We break down the 'eye-level' conversational model.",
    youtubeId: "PCH6z5l9UxE",
    duration: "11:20",
    publishedAt: "1 week ago",
    reflectionQuestion: "When was the last time you listened to your child without jumping in to give immediate advice? How did they react?",
    watches: 942,
    likes: 210,
    commentsCount: 19,
    videoUrl: "https://www.youtube.com/embed/PCH6z5l9UxE",
    coverImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200&h=675",
    grayscale: false
  },
  {
    id: "jigi-3",
    title: "The Financial Legacy Framework",
    summary: "Equiping fathers to build multi-generational investments. We look at setting up assets, starting trust conversations early.",
    youtubeId: "PCH6z5l9UxE",
    duration: "18:40",
    publishedAt: "2 weeks ago",
    reflectionQuestion: "What is one physical or financial skill you must teach your children before they turn 18?",
    watches: 1530,
    likes: 492,
    commentsCount: 56,
    videoUrl: "https://www.youtube.com/embed/PCH6z5l9UxE",
    coverImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    grayscale: false
  }
];

const INITIAL_LEADERBOARD = [
  { id: 1, rank: 1, name: "Pastor Tim", displayName: "@PastorTim", avatar: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780587384/3_opqxbm.jpg", points: 280, tier: "Forest", region: "Lagos" },
  { id: 2, rank: 2, name: "Olawale Johnson", displayName: "@WaleJ", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=100&h=100", points: 245, tier: "Tree", region: "Abuja" },
  { id: 3, rank: 3, name: "David Okon", displayName: "@DaveO", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100", points: 230, tier: "Tree", region: "Port Harcourt" },
  { id: 4, rank: 4, name: "Tunde Opeyemi", displayName: "@TundeO", avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=100&h=100", points: 185, tier: "Branch", region: "Lagos" },
  { id: 5, rank: 5, name: "Chidi Nwachukwu", displayName: "@ChidiN", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100", points: 160, tier: "Branch", region: "Ibadan" },
  { id: 6, rank: 6, name: "Emeka Okoye", displayName: "@EmekaO", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100", points: 140, tier: "Root", region: "Abuja" },
  { id: 7, rank: 7, name: "Abubakar Ibrahim", displayName: "@AbubakarI", avatar: "https://images.unsplash.com/photo-1507152832244-10d45a7e3488?auto=format&fit=crop&q=80&w=100&h=100", points: 120, tier: "Root", region: "London" }
];

const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Flagship Breakfast Meeting: Lagos Chapter",
    date: "June 20, 2026",
    time: "7:30 AM - 10:30 AM (WAT)",
    location: "The Continental Lounge, Victoria Island, Lagos & Zoom Link",
    description: "Join hundreds of intentional fathers as we tackle the core pillars of character development in boys. A panel of veteran fathers share interactive perspectives.",
    isReplay: false,
    capacity: "250 seats remaining"
  },
  {
    id: "evt-2",
    title: "Regional Mentorship Campfire Weekend",
    date: "July 11, 2026",
    time: "4:00 PM (Saturday)",
    location: "Whispering Palms Resort, Badagry & Virtual Stream",
    description: "An intensive bonding weekend for fathers and their sons. Outdoor activities, peer reflection councils, and deep campfire brotherhood reviews.",
    isReplay: false,
    capacity: "50 slots left"
  },
  {
    id: "evt-3",
    title: "School Impact Strategy Assembly",
    date: "June 12, 2026",
    time: "10:00 AM (WAT)",
    location: "Virtual Webinar (Zoom Portal)",
    description: "Planning our secondary school tours for the upcoming academic cycle. Reviewing curriculum, books deployment, and hardware donation coordination.",
    isReplay: false,
    capacity: "Unlimited Webcast Slots"
  }
];

const INITIAL_REPLAYS = [
  {
    id: "rep-1",
    title: "May Breakfast Meeting: The Emotional Present Father",
    date: "May 16, 2026",
    duration: "2h 15m",
    watches: 420,
    youtubeId: "v72186VwWns",
    pointsAwarded: 15,
    splashImg: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rep-2",
    title: "April Breakfast Meeting: Financial Stewardship & Trusts",
    date: "April 18, 2026",
    duration: "1h 50m",
    watches: 580,
    youtubeId: "PCH6z5l9UxE",
    pointsAwarded: 15,
    splashImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
  }
];

const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "10 Sentences Every Boy Needs to Hear From His Father",
    category: "Parenting",
    author: "Pastor Tim",
    readTime: "6 mins",
    summary: "Affirmations of identity, safety, faith, and purpose. We break down the psychology behind active fatherly blessings.",
    isSaved: false
  },
  {
    id: "res-2",
    title: "Stewardship: Setting up a Family Trust Fund in West Africa",
    category: "Finance",
    author: "Legacy Legal Board",
    readTime: "12 mins",
    summary: "Step-by-step guidelines for safeguarding your assets and ensuring your children access assets responsibly based on maturity milestones.",
    isSaved: false
  },
  {
    id: "res-3",
    title: "Managing Stress & Active Longevity for Patriarchs",
    category: "Mental Health",
    author: "Dr. Olumide Philips",
    readTime: "8 mins",
    summary: "As fathers, physical and emotional fitness is our currency of legacy. Read methods to manage pressure and remain fully alert.",
    isSaved: false
  },
  {
    id: "res-4",
    title: "The Father-Daughter Security Dynamic",
    category: "Relationships",
    author: "Brothers Advisory Council",
    readTime: "10 mins",
    summary: "How a father's emotional availability outlines your daughter's future relationship parameters, confidence, and self-worth.",
    isSaved: true
  }
];

export default function FatherDashboard({ onBackToWeb, userProfile }: ComponentProps) {
  // Safe user profile fallback defaults
  const profile = userProfile || {
    fullName: "Tunde Opeyemi",
    preferredTitle: "Mr.",
    email: "tunde@opeyemi.com",
    phone: "+234 803 123 4567",
    city: "Lagos",
    role: "father" as const,
    username: "TundeO",
    joinedDate: "June 2026"
  };

  // Helper to format greeting with title / respect
  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    let textAndTitle = "Welcome Back";
    if (hour < 12) {
      textAndTitle = "Good Morning";
    } else if (hour < 17) {
      textAndTitle = "Good Afternoon";
    } else {
      textAndTitle = "Good Evening";
    }

    if (profile.role === 'boy_child') {
      // Shorter, friendly, no title overuse
      const shortName = profile.fullName.split(' ')[0] || profile.fullName;
      return `${textAndTitle}, ${shortName}`;
    } else {
      const shortName = profile.fullName.split(' ')[0] || profile.fullName;
      const titlePrefix = profile.preferredTitle ? `${profile.preferredTitle} ` : "";
      return `${textAndTitle}, ${titlePrefix}${shortName}`;
    }
  };

  const getDynamicDisplayName = () => {
    if (profile.role === 'boy_child') {
      return profile.fullName;
    }
    const titlePrefix = profile.preferredTitle ? `${profile.preferredTitle} ` : "";
    return `${titlePrefix}${profile.fullName}`;
  };

  const getUserAvatarUrl = (name: string, defaultAvatar?: string) => {
    if (name && (name.toLowerCase().includes("pastor tim") || name.toLowerCase().includes("tim"))) {
      return "https://res.cloudinary.com/dsmsugpys/image/upload/v1780587384/3_opqxbm.jpg";
    }
    return defaultAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100";
  };

  const isBoy = profile.role === 'boy_child';

  // Member Specific States (Fully Persistent React Level State)
  const [userPoints, setUserPoints] = useState(185);
  const [lifetimePoints, setLifetimePoints] = useState(1185);
  const [streak, setStreak] = useState(6);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(["c-2", "c-4"]);
  const [answeredReflections, setAnsweredReflections] = useState<string[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [savedResources, setSavedResources] = useState<string[]>(["res-4"]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [reflectionTextInput, setReflectionTextInput] = useState("");
  const [selectedJigi, setSelectedJigi] = useState(INITIAL_JIGI_EPISODES[0]);
  const [activeTab, setActiveTab] = useState<'home' | 'jigi' | 'challenges' | 'points' | 'leaderboard' | 'breakfast' | 'events' | 'resources' | 'profile' | 'watch'>('home');
  const [isLivePlaying, setIsLivePlaying] = useState(false);
  const [notepadNotes, setNotepadNotes] = useState<{ id: string; text: string; date: string }[]>([
    { id: "note-1", text: "A father's primary legacy is not financial accumulation, but deliberate emotional presence and authentic discipline.", date: "Today, 10:45 AM" }
  ]);
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [liveChatMessages, setLiveChatMessages] = useState<{ id: string; author: string; text: string; time: string; avatar: string }[]>([
    { id: "msg-1", author: "Pastor Tim", text: "Welcome fathers to the Live Stream! Today we are discussing practical keys of active engagement.", time: "10 mins ago", avatar: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780587384/3_opqxbm.jpg" },
    { id: "msg-2", author: "Olawale Johnson", text: "Ready to learn. Streaming from Ibadan live!", time: "8 mins ago", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: "msg-3", author: "Engr. Abubakar", text: "The presentation is super clear. Let us make Ibadan proud.", time: "5 mins ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" }
  ]);
  const [newLiveMessage, setNewLiveMessage] = useState("");
  const [leaderboardFilter, setLeaderboardFilter] = useState("All");
  const [isJigiPlaying, setIsJigiPlaying] = useState(false);
  const [jigiPlayPercent, setJigiPlayPercent] = useState(0);
  const [isJigiCompleted, setIsJigiCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  
  // Reflection Text Modal/Box States
  const [pendingChallengeId, setPendingChallengeId] = useState<string | null>(null);
  const [challengeReflectionText, setChallengeReflectionText] = useState("");
  
  // Custom Replay Watch States
  const [watchingReplayId, setWatchingReplayId] = useState<string | null>(null);
  const [replayStateTimer, setReplayStateTimer] = useState(0);

  // New Content notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New weekly JIGI video released: 'The Weight of an Unspoken Word'", read: false },
    { id: 2, text: "Lagos Chapter Breakfast Meeting registration is now active!", read: false },
    { id: 3, text: "Olawale Johnson liked your comment in Brotherhood group", read: true }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Comments for the current active JIGI episode
  const [jigiComments, setJigiComments] = useState<{ [key: string]: { author: string, text: string, time: string, avatar: string }[] }>({
    "jigi-1": [
      { author: "Pastor Tim", text: "Absolute cornerstone lesson. Fathers, share your specific resolutions below.", time: "2 hours ago", avatar: "https://res.cloudinary.com/dsmsugpys/image/upload/v1780587384/3_opqxbm.jpg" },
      { author: "Olawale Johnson", text: "This hit me deep. I sat down with my son today and just apologized for my harsh tone last Friday. Radical change starter.", time: "1 day ago", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=100&h=100" }
    ]
  });
  const [newJigiComment, setNewJigiComment] = useState("");

  // Determine active badge tier based on lifetime points
  const activeBadge = BADGES.reduce((best, curr) => {
    if (lifetimePoints >= curr.minPoints) return curr;
    return best;
  }, BADGES[0]);

  // Points Notification Toast Trigger helper
  const triggerNotification = (message: string) => {
    setNotificationMsg(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4500);
  };

  // 1. Action: Complete a Daily Challenge
  const handleCompleteChallenge = (id: string, reflection: string = "") => {
    if (completedChallenges.includes(id)) return;
    
    const nextCompleted = [...completedChallenges, id];
    setCompletedChallenges(nextCompleted);

    // Compute standard points
    let pointsToAdd = 10;
    let message = "Daily Challenge Completed! +10 Points";

    // Streak logic (if completing today's challenge)
    if (id === "c-1") {
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Streak milestone triggers
      if (newStreak === 7) {
        pointsToAdd += 50;
        message += " & 7-Day Streak Bonus! +50 Points";
      } else if (newStreak === 30) {
        pointsToAdd += 150;
        message += " & 30-Day Master Streak Bonus! +150 Points";
      } else {
        message += `! Continuous streak: ${newStreak} days.`;
      }
    }

    setUserPoints(prev => prev + pointsToAdd);
    setLifetimePoints(prev => prev + pointsToAdd);
    triggerNotification(message);

    // Add activity record log to member notification list
    setNotifications(prev => [
      { id: Date.now(), text: `You completed Daily Challenge: "${INITIAL_CHALLENGES.find(c => c.id === id)?.title}"`, read: false },
      ...prev
    ]);
  };

  // 2. Action: Watch a JIGI video
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isJigiPlaying) {
      interval = setInterval(() => {
        setJigiPlayPercent(prev => {
          if (prev >= 100) {
            setIsJigiPlaying(false);
            // Award JIGI watching points (20 Points)
            const videoId = selectedJigi.id;
            if (!watchedVideos.includes(videoId)) {
              setWatchedVideos(curr => [...curr, videoId]);
              setUserPoints(p => p + 20);
              setLifetimePoints(p => p + 20);
              triggerNotification(`JIGI Ep. "${selectedJigi.title}" Watched! +20 Points`);
              setIsJigiCompleted(true);
            }
            return 100;
          }
          return prev + 10; // Rapidly simulation of watch progress for flawless, premium, non-boring user testing
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isJigiPlaying, selectedJigi, watchedVideos]);

  // JIGI play trigger from custom play overlay button
  const startJigiPlayback = () => {
    setIsJigiPlaying(true);
    if (jigiPlayPercent === 100) {
      setJigiPlayPercent(0);
    }
  };

  // 3. Action: Answer Reflection Question
  const handleSubmitReflection = () => {
    if (!reflectionTextInput.trim()) return;
    
    const reflectionId = `reflect-${selectedJigi.id}`;
    if (answeredReflections.includes(reflectionId)) {
      triggerNotification("Reflection updated!");
    } else {
      setAnsweredReflections(prev => [...prev, reflectionId]);
      setUserPoints(p => p + 10);
      setLifetimePoints(p => p + 10);
      triggerNotification("Answered Reflection Question! +10 Points added.");
    }

    // Add reflection comment instantly in local JIGI feed as well
    const oldComments = jigiComments[selectedJigi.id] || [];
    setJigiComments({
      ...jigiComments,
      [selectedJigi.id]: [
        {
          author: `${getDynamicDisplayName()} (You)`,
          text: reflectionTextInput,
          time: "Just now",
          avatar: getUserAvatarUrl(profile.fullName, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100")
        },
        ...oldComments
      ]
    });

    setReflectionTextInput("");
  };

  // Add standard user comments
  const handleAddComment = () => {
    if (!newJigiComment.trim()) return;
    const oldComments = jigiComments[selectedJigi.id] || [];
    
    // Earn 5 Points for community posting
    setUserPoints(p => p + 5);
    setLifetimePoints(p => p + 5);
    triggerNotification("Comment Posted in Brotherhood forum! +5 Points");

    setJigiComments({
      ...jigiComments,
      [selectedJigi.id]: [
        {
          author: `${getDynamicDisplayName()} (You)`,
          text: newJigiComment,
          time: "Just now",
          avatar: getUserAvatarUrl(profile.fullName, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100")
        },
        ...oldComments
      ]
    });
    setNewJigiComment("");
  };

  // 4. Action: Register for Events
  const handleRegisterEvent = (id: string) => {
    if (registeredEvents.includes(id)) {
      triggerNotification("You are already registered for this event.");
      return;
    }
    setRegisteredEvents(prev => [...prev, id]);
    setUserPoints(p => p + 25);
    setLifetimePoints(p => p + 25);
    triggerNotification("RSVP Successfully Registered! +25 Event Points Added.");
  };

  // 5. Action: Watch Replays
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (watchingReplayId) {
      interval = setInterval(() => {
        setReplayStateTimer(prev => {
          if (prev >= 100) {
            setWatchingReplayId(null);
            // Awarding 15 Points
            setUserPoints(p => p + 15);
            setLifetimePoints(p => p + 15);
            triggerNotification("Breakfast Replay Watched! +15 Points");
            return 0;
          }
          return prev + 20; // Simulated progress speed for testability
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [watchingReplayId]);

  const handleWatchReplay = (id: string) => {
    setWatchingReplayId(id);
    setReplayStateTimer(0);
  };

  // 6. Save/unsave resources
  const handleToggleSaveResource = (id: string) => {
    if (savedResources.includes(id)) {
      setSavedResources(prev => prev.filter(r => r !== id));
      triggerNotification("Removed from Saved Reading List.");
    } else {
      setSavedResources(prev => [...prev, id]);
      triggerNotification("Saved to Reading List!");
    }
  };

  // Filtered lists
  const filteredLeaderboard = INITIAL_LEADERBOARD
    .map(member => {
      // Dynamic rendering of current user point status inside leaderboard
      if (member.id === 4) {
        return { 
          ...member, 
          name: getDynamicDisplayName(), 
          displayName: `@${profile.username}`, 
          region: profile.city || "Lagos", 
          points: userPoints, 
          tier: activeBadge.name 
        };
      }
      return member;
    })
    .filter(member => leaderboardFilter === "All" || member.region === leaderboardFilter)
    .sort((a,b) => b.points - a.points);

  const filteredResources = INITIAL_RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#081129] text-white flex flex-col font-sans antialiased text-[14px]">
      
      {/* 🚀 FIXED POINTS NOTIFICATION BAR */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-55 flex items-center gap-3 bg-gradient-to-r from-[#FE0000] to-orange-600 px-6 py-4.5 rounded-2xl shadow-2xl border border-white/20 text-white font-sans max-w-md w-[calc(100%-32px)]"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-bounce flex-shrink-0">
              <Award className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="text-left">
              <h5 className="font-extrabold tracking-wide uppercase text-[10px] text-white/80">Accountability Surge</h5>
              <p className="text-xs sm:text-sm font-semibold">{notificationMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛎️ TOP DASHBOARD NAVIGATION ROW */}
      <header className="sticky top-0 z-30 bg-[#0E1B3D]/95 backdrop-blur-md border-b border-white/5 py-3 md:py-4 px-4 sm:px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToWeb}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all text-xs uppercase tracking-wider bg-white/5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>PUBLIC PAGE</span>
          </button>
          
          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
          
          <div className="flex items-center">
            <Logo />
          </div>
        </div>

        {/* NOTIFICATION HUB, USER BADGE AND PROFILE SHORTCUT */}
        <div className="flex items-center gap-4">
          
          {/* Notifications Center */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white hover:text-[#FE0000] hover:bg-white/10 active:scale-95 transition-all relative cursor-pointer"
              aria-label="Notification center"
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FE0000] animate-ping" />
              )}
            </button>

            {/* NOTIFICATIONS DROPDOWN */}
            <AnimatePresence>
              {showNotificationsDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotificationsDropdown(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 5, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#16203B] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                      <h4 className="font-extrabold text-xs tracking-wider uppercase text-white/80">Notifications</h4>
                      <button 
                        onClick={() => {
                          setNotifications(p => p.map(n => ({ ...n, read: true })));
                          setShowNotificationsDropdown(false);
                        }}
                        className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest bg-transparent cursor-pointer"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2 rounded-lg text-xs leading-relaxed transition-colors ${n.read ? 'bg-transparent text-gray-400' : 'bg-white/5 text-white border-l-2 border-[#FE0000]'}`}>
                          <p>{n.text}</p>
                          <span className="text-[9px] text-gray-500 block mt-1 font-mono">Real-time update</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Quick-Stats Badge Pill */}
          <div 
            onClick={() => setActiveTab('points')}
            className="hidden md:flex items-center gap-2 bg-[#FE0000]/10 border border-[#FE0000]/30 rounded-full px-3 py-1 cursor-pointer hover:bg-[#FE0000]/20 transition-all"
          >
            <span className="text-base">{activeBadge.icon}</span>
            <span className="font-mono font-bold text-xs text-white uppercase">{activeBadge.name}</span>
            <div className="h-3 w-[1px] bg-[#FE0000]/30" />
            <span className="text-amber-400 text-xs font-black font-mono">{userPoints} pts this week</span>
          </div>

          {/* User Profile Avatar Frame */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-xl py-1 px-1.5 sm:py-1 sm:px-3 transition-all cursor-pointer group"
          >
            <img 
              src={getUserAvatarUrl(profile.fullName, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100")} 
              alt="User"
              referrerPolicy="no-referrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all border border-white/10"
            />
            <div className="hidden sm:block text-left">
              <h4 className="font-extrabold text-xs text-white leading-tight">{getDynamicDisplayName()}</h4>
              <span className="text-[9px] text-gray-400 font-mono tracking-widest font-light">@{profile.username}</span>
            </div>
          </div>

        </div>
      </header>

      {/* 🧭 HORIZONTAL SCROLL SUB-MENU ON MOBILE / STATIC MENU ON DESKTOP */}
      <nav className="bg-[#0E1B3D] border-b border-white/5 px-4 overflow-x-auto flex items-center gap-1 sm:gap-2 no-scrollbar scroll-smooth py-1.5 text-xs sm:text-sm">
        {[
          { key: 'home', icon: Home, label: 'Overview' },
          { key: 'watch', icon: Radio, label: 'Watch Live' },
          { key: 'jigi', icon: Play, label: 'Weekly JIGI' },
          { key: 'challenges', icon: Flame, label: 'Daily Challenge' },
          { key: 'points', icon: Award, label: 'Gamification' },
          { key: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
          { key: 'breakfast', icon: PlayCircle, label: 'Breakfast Meetings' },
          { key: 'events', icon: Calendar, label: 'Events Hub' },
          { key: 'resources', icon: BookOpen, label: 'Resources' },
          { key: 'profile', icon: User, label: 'My Profile' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key as any);
                setIsJigiPlaying(false);
                setWatchingReplayId(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-sans text-xs tracking-wider uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-[#FE0000] text-white shadow-lg shadow-[#FE0000]/15 scale-102 border border-[#FE0000]' 
                  : 'text-white/60 hover:text-white bg-transparent hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 🔮 MAIN MAIN CONTENT OUTLET COMPONENT */}
      <main className="flex-grow p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: OVERVIEW HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            
            {/* 👑 AESTHETIC INTEGRATED SYSTEM WELCOME BANNER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-[#121A33] via-[#0E152B] to-[#0A0E1C] rounded-3xl p-6 sm:p-8 md:p-10 border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-800/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-between text-left relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#FE0000] font-black font-mono">Accountability Overview</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none mb-4 uppercase">
                    {getDynamicGreeting()}
                  </h1>
                  <p className="font-sans font-light text-xs sm:text-[13px] text-gray-400 max-w-lg leading-relaxed tracking-wide">
                    {profile.role === 'boy_child' ? (
                      "The man you become tomorrow is shaped by the choices you make today. Today is your deliberate turn to build character, learn from veteran mentors, and set your legacy trajectory."
                    ) : (
                      "Your focus is the compass of your child's future. Today is another deliberate turn to equip yourself, connect with premium brothers, and be emotionally present."
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-5 mt-8 border-t border-white/5 pt-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-light text-gray-400 block mb-1">Rank Classification</span>
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="text-sm">{activeBadge.icon}</span>
                      <span className="text-xs font-extrabold uppercase font-sans text-white tracking-wider">{activeBadge.name} Tier</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-light text-gray-400 block mb-1 font-bold">Continuous Streak</span>
                    <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 text-amber-500">
                      <Flame className="w-4 h-4 fill-amber-500/20" />
                      <span className="text-xs font-black font-mono">{streak} Days active</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-light text-gray-400 block mb-1">Weekly Target Meter</span>
                    <span className="text-xs font-extrabold text-white font-mono">{userPoints} / 300 PTS</span>
                  </div>
                </div>
              </div>

              {/* Weekly point tracker gauge using premium custom visual chart circles */}
              <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  
                  {/* Outer SVG Ring Gauge */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-white/5 fill-none" 
                      strokeWidth="8"
                    />
                    {/* Active Progress colored in signature Red */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-[#FE0000] fill-none transition-all duration-1000" 
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * Math.min(userPoints, 300)) / 300}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Center Points reading */}
                  <div className="absolute text-center flex flex-col justify-center items-center">
                    <span className="font-mono text-4xl font-extrabold tracking-tighter text-white">{userPoints}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">PTS THIS WEEK</span>
                  </div>

                </div>

                <p className="text-[10px] uppercase text-gray-400 mt-4 text-center font-mono tracking-widest font-semibold">
                  Eearned {userPoints} points this week &bull; Need {Math.max(0, 300 - userPoints)} pts for 100%
                </p>
              </div>

            </div>

            {/* 🎯 TODAY'S DAILY CHALLENGE CARD */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              <div className="col-span-1 md:col-span-7 bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden shadow-xl">
                
                {/* Visual Category badge and Completion Status */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 bg-[#FE0000]/10 border border-[#FE0000]/30 text-[#FE0000] text-[10px] tracking-widest font-mono uppercase font-black rounded-full">
                    {INITIAL_CHALLENGES[0].category} Category
                  </span>
                  {completedChallenges.includes("c-1") ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-500 font-sans text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs font-sans tracking-wide">
                      Points Worth: <span className="font-bold text-white font-mono">+10 XP</span>
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-start mb-6">
                  <span className="text-4xl filter saturate-150 select-none">{INITIAL_CHALLENGES[0].icon}</span>
                  <div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight text-white uppercase mb-2">
                      TODAY'S ACTION: {INITIAL_CHALLENGES[0].title.toUpperCase()}
                    </h3>
                    <p className="font-sans font-light text-xs sm:text-[13px] text-gray-300 leading-relaxed tracking-wide">
                      {INITIAL_CHALLENGES[0].task}
                    </p>
                  </div>
                </div>

                {completedChallenges.includes("c-1") ? (
                  <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/15 text-xs text-emerald-400/90 leading-relaxed font-sans font-light">
                    🌱 "Emotional intelligence is just as valuable as financial provision. Excellent work committing to intentional connection today."
                  </div>
                ) : (
                  <div className="space-y-4">
                    
                    {/* Add quick reflection text field optionally as requested */}
                    <div className="border-t border-white/5 pt-4">
                      <label className="text-[10px] uppercase font-mono tracking-wider font-light text-gray-400 block mb-2">
                        Add an optional reflection to post to the Brotherhood council
                      </label>
                      <textarea 
                        value={challengeReflectionText}
                        onChange={(e) => setChallengeReflectionText(e.target.value)}
                        placeholder="E.g., I did this with my daughter and noticed her eyes lit up as soon as I turned my phone off..." 
                        className="w-full bg-[#16203B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FE0000] transition-colors leading-relaxed min-h-[60px]"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        handleCompleteChallenge("c-1", challengeReflectionText);
                        setChallengeReflectionText("");
                      }}
                      className="w-full py-3 bg-[#FE0000] hover:bg-[#D00000] text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all hover:shadow-lg active:scale-99 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4.5 h-4.5" />
                      <span>MARK COMPLETED & COLLECT POINTS</span>
                    </button>
                  </div>
                )}

              </div>

              {/* QUICK ACTION TILES COMPONENT */}
              <div className="col-span-1 md:col-span-5 space-y-4 text-left">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#FE0000] font-black">
                  Quick Access Portal
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setActiveTab('jigi')}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group flex flex-col justify-between h-32"
                  >
                    <Play className="w-6 h-6 text-[#FE0000]" />
                    <div>
                      <h5 className="font-extrabold text-xs text-white uppercase group-hover:text-[#FE0000] transition-colors">JIGI Videos</h5>
                      <span className="text-[10px] text-gray-400 inline-block mt-1">Reflections</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('breakfast')}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#FE0000]/10 hover:border-[#FE0000]/25 transition-all cursor-pointer group flex flex-col justify-between h-32"
                  >
                    <PlayCircle className="w-6 h-6 text-amber-400 animate-pulse" />
                    <div>
                      <h5 className="font-extrabold text-xs text-white uppercase group-hover:text-[#FE0000] transition-colors">Breakfast Live</h5>
                      <span className="text-[10px] text-gray-400 inline-block mt-1">2 REPLAYS ACTIVE</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('events')}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group flex flex-col justify-between h-32"
                  >
                    <Calendar className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h5 className="font-extrabold text-xs text-white uppercase group-hover:text-cyan-400 transition-colors">Events Hub</h5>
                      <span className="text-[10px] text-gray-400 inline-block mt-1">June 20 Incoming</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('leaderboard')}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group flex flex-col justify-between h-32"
                  >
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h5 className="font-extrabold text-xs text-white uppercase group-hover:text-yellow-400 transition-colors">Leaderboard</h5>
                      <span className="text-[10px] text-gray-400 inline-block mt-1">Check Rankings</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 📖 SAVED READING LIST AND STATS PREVIEW BAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-black text-base tracking-tight text-white uppercase mb-1 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-[#FE0000]" />
                    YOUR SAVED READING LIST
                  </h3>
                  <p className="text-gray-400 text-xs font-sans font-light mb-4">
                    Quick bookmarking access to educational resources, family guidelines, parenting files etc.
                  </p>

                  <div className="space-y-3">
                    {savedResources.length === 0 ? (
                      <p className="text-xs text-gray-500 italic py-2">No bookmarks saved yet. Browse materials under 'Resources'.</p>
                    ) : (
                      INITIAL_RESOURCES.filter(r => savedResources.includes(r.id)).map(r => (
                        <div key={r.id} className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-all p-3 rounded-xl border border-white/5">
                          <div className="max-w-[75%]">
                            <h5 className="font-extrabold text-xs text-white truncate">{r.title}</h5>
                            <span className="font-mono text-[9px] text-gray-400 uppercase mt-0.5 inline-block">{r.category} &bull; {r.readTime}</span>
                          </div>
                          <button 
                            onClick={() => handleToggleSaveResource(r.id)}
                            className="text-xs hover:text-[#FE0000] transition-colors p-1 text-gray-400 uppercase font-bold tracking-widest bg-transparent cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="mt-6 text-xs text-[#FE0000] hover:text-[#D00000] flex items-center gap-1 uppercase tracking-wider font-extrabold bg-transparent border-none p-0 cursor-pointer"
                >
                  <span>MEMBER LIBRARY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* GAMIFICATION STATS SUMMARY BADGE DISPLAY */}
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-md text-left flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-black text-base tracking-tight text-white uppercase mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    ACCOUNTABILITY REWARD SUMMARY
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#16203B] p-4 rounded-2xl border border-white/5">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">LIFETIME XP</span>
                      <p className="text-2xl font-mono font-black text-white mt-1">{lifetimePoints} PTS</p>
                      <span className="text-[9px] text-amber-500 mt-0.5 block font-sans font-medium">To Tier Forest: {Math.max(0, 2000 - lifetimePoints)} XP more</span>
                    </div>

                    <div className="bg-[#16203B] p-4 rounded-2xl border border-white/5">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">COMPLETED CHECKS</span>
                      <p className="text-2xl font-mono font-black text-white mt-1">{completedChallenges.length} DAYS</p>
                      <span className="text-[9px] text-gray-400 mt-0.5 block font-sans font-medium">Every action recorded</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>Badge Level: <strong className="text-white font-mono uppercase bg-white/5 px-2 py-0.5 rounded ml-1">{activeBadge.icon} {activeBadge.name}</strong></span>
                  <button 
                    onClick={() => setActiveTab('points')}
                    className="text-[#FE0000] hover:text-[#D00000] uppercase tracking-wider font-extrabold bg-transparent border-none p-0 cursor-pointer"
                  >
                    REWARDS RULES
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: JIGI EPISODES (WEEKLY VIDEO) */}
        {activeTab === 'jigi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* LEFT MAIN MODULE: Live custom elegant video player */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
                
                {/* Custom Playback Container with SVG rotating design requested */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group border border-white/10">
                  {isJigiPlaying ? (
                    /* The Compliant YouTube IFrame embed without tracks overlaying custom mechanics */
                    <iframe 
                      src={`${selectedJigi.videoUrl}?autoplay=1&controls=1&modestbranding=1&showinfo=0&rel=0`} 
                      title={selectedJigi.title}
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Elegant Overlay Image and rotating Text Play Button */
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={selectedJigi.coverImg || "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200&h=675"} 
                        alt="Jigi backdrop"
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover brightness-[0.4] transition-transform duration-500 group-hover:scale-102 ${selectedJigi.grayscale ? 'grayscale' : ''}`}
                      />
                      
                      {/* CENTRED SPINNING PRESS PLAY TEXT AND BUTTON */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-36 h-36 flex items-center justify-center cursor-pointer select-none" onClick={startJigiPlayback}>
                          
                          {/* Circular Rotating text */}
                          <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                            <defs>
                              <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                            </defs>
                            <text className="text-[6px] tracking-[0.25em] font-bold font-sans fill-white/80 uppercase">
                              <textPath href="#circlePath">
                                • press play button • watch and grow • presence • legacy •
                              </textPath>
                            </text>
                          </svg>

                          {/* Central Solid Play Button and Ring */}
                          <div className="w-16 h-16 rounded-full bg-[#FE0000] hover:bg-[#D00000] hover:scale-110 active:scale-95 transition-all text-white flex items-center justify-center shadow-2xl border-4 border-white/10 z-10">
                            <Play className="w-6 h-6 fill-current text-white ml-1" />
                          </div>

                        </div>
                      </div>

                    </div>
                  )}

                  {/* Top-aligned details tags */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold text-[#FE0000] border border-[#FE0000]/20">
                      JIGI Ep. {selectedJigi.id.split('-')[1]}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold text-gray-300 border border-white/10">
                      {selectedJigi.duration} Mins
                    </span>
                  </div>

                  {/* Live Tracker progress bar */}
                  {isJigiPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                      <div 
                        className="h-full bg-[#FE0000] transition-all duration-300" 
                        style={{ width: `${jigiPlayPercent}%` }} 
                      />
                    </div>
                  )}

                </div>

                {/* Episode Details */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3 border-b border-white/5 pb-4">
                    <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase select-all">
                      {selectedJigi.title.toUpperCase()}
                    </h2>
                    <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-wider font-mono">
                      <span>👁️ {selectedJigi.watches} WATCHES</span>
                      <span>❤️ {selectedJigi.likes} LIKES</span>
                    </div>
                  </div>
                  <p className="font-sans font-light text-xs sm:text-[13px] text-gray-300 leading-relaxed tracking-wide mb-6">
                    {selectedJigi.summary}
                  </p>
                </div>

                {/* 🛡️ REFLECTION QUESTIONS ENTRY HUB */}
                <div className="bg-[#16203B] rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-amber-400 mb-3 uppercase tracking-wider font-mono text-[10px] font-black">
                    <Sparkles className="w-4 h-4" />
                    Weekly Reflection & Accountability Challenge (+10 pts)
                  </div>
                  
                  <h4 className="font-sans font-bold text-sm text-white leading-snug mb-4">
                    {selectedJigi.reflectionQuestion}
                  </h4>

                  {answeredReflections.includes(`reflect-${selectedJigi.id}`) ? (
                    <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 leading-relaxed font-sans font-medium flex gap-2.5 items-start">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                      <div>
                        <span>Reflection Submitted! Points claimed. Your answer has been saved securely for your historic audit.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <textarea 
                        value={reflectionTextInput}
                        onChange={(e) => setReflectionTextInput(e.target.value)}
                        placeholder="Write your honest reflections here to help hold yourself accountable..." 
                        className="w-full bg-[#0E152B] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FE0000] leading-relaxed min-h-[100px]"
                      />
                      <button 
                        onClick={handleSubmitReflection}
                        disabled={!reflectionTextInput.trim()}
                        className="px-6 py-3 bg-[#FE0000] hover:bg-[#D00000] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all h-10 flex items-center justify-center cursor-pointer"
                      >
                        Submit Reflection
                      </button>
                    </div>
                  )}

                </div>

                {/* 💬 INTERACTIVE DISCUSSION COMMENTS */}
                <div className="space-y-4">
                  <h4 className="font-sans font-black text-sm text-white uppercase tracking-wider border-t border-white/5 pt-6 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FE0000]" />
                    Brotherhood Discussion Feed ({jigiComments[selectedJigi.id]?.length || 0})
                  </h4>

                  {/* Add instant comment box */}
                  <div className="flex gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" 
                      alt="User"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="flex-grow flex gap-2">
                      <input 
                        type="text" 
                        value={newJigiComment}
                        onChange={(e) => setNewJigiComment(e.target.value)}
                        placeholder="Encourage a brother, share your testimony..." 
                        className="flex-grow bg-[#16203B] border border-white/10 rounded-xl px-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FE0000]"
                      />
                      <button 
                        onClick={handleAddComment}
                        disabled={!newJigiComment.trim()}
                        className="py-2.5 px-4 bg-white/5 hover:bg-white/10 hover:text-[#FE0000] disabled:bg-gray-800 disabled:text-gray-600 text-xs uppercase font-extrabold tracking-wider rounded-xl transition-all border border-white/10 cursor-pointer"
                      >
                        SEND
                      </button>
                    </div>
                  </div>

                  {/* Comments feed rendering */}
                  <div className="space-y-4 pt-2">
                    {(jigiComments[selectedJigi.id] || []).map((comm, idx) => (
                      <div key={idx} className="flex gap-3 items-start bg-white/[0.01] p-3 rounded-xl border border-white/5">
                        <img src={comm.avatar} alt={comm.author} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-white">{comm.author}</span>
                            <span className="text-[9px] text-gray-500 font-mono font-light">{comm.time}</span>
                          </div>
                          <p className="text-xs text-gray-300 font-sans font-light mt-1 leading-relaxed">
                            {comm.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE ARCHIVE LIST: Fully searchable by title */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-md">
                
                <h3 className="font-sans font-black text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">
                  Weekly Episodes Archive
                </h3>

                <div className="relative mb-5">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    placeholder="Search by topic or sermon..." 
                    className="w-full bg-[#16203B] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FE0000]"
                  />
                </div>

                <div className="space-y-3.5">
                  {INITIAL_JIGI_EPISODES.map((ep) => {
                    const isSelected = selectedJigi.id === ep.id;
                    return (
                      <div 
                        key={ep.id}
                        onClick={() => {
                          setSelectedJigi(ep);
                          setJigiPlayPercent(0);
                          setIsJigiPlaying(false);
                        }}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#FE0000]/10 border-[#FE0000]' 
                            : 'bg-white/5 hover:bg-white/10 border-white/5'
                        }`}
                      >
                        <span className="font-mono text-[9px] text-[#FE0000] uppercase font-bold tracking-widest block mb-1">
                          {ep.publishedAt}
                        </span>
                        
                        <h4 className={`font-extrabold text-xs uppercase ${isSelected ? 'text-[#FE0000]' : 'text-white'}`}>
                          {ep.title}
                        </h4>

                        <p className="text-[11px] text-gray-400 font-sans mt-1 line-clamp-2 leading-relaxed">
                          {ep.summary}
                        </p>
                        
                        <div className="flex gap-3 text-[9px] text-gray-500 mt-2 font-mono uppercase font-bold">
                          <span>⏱️ {ep.duration} MINS</span>
                          <span>&bull;</span>
                          <span>👁️ {ep.watches} DIRECTED</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: DAILY CHALLENGES HUB */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 text-left">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-6">
                  <div>
                    <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase">
                      DAILY FATHER ACCOUNTABILITY CHALLENGE
                    </h2>
                    <p className="text-gray-400 text-xs font-sans font-light mt-1">
                      A daily prompt targeted to stimulate authentic presence, emotional transparency, physical well-being or financial heritage.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 text-amber-500 flex items-center gap-1.5 self-start mt-3 sm:mt-0 font-bold">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs font-mono tracking-widest uppercase">{streak} Day streak!</span>
                  </div>
                </div>

                <div className="space-y-5">
                  {INITIAL_CHALLENGES.map((ch) => {
                    const isCompleted = completedChallenges.includes(ch.id);
                    return (
                      <div 
                        key={ch.id}
                        className={`p-5 rounded-2xl border transition-all text-left flex flex-col md:flex-row justify-between gap-4 items-start ${
                          isCompleted 
                            ? 'bg-emerald-500/[0.03] border-emerald-500/20 opacity-80' 
                            : 'bg-white/5 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex gap-4 items-start max-w-full md:max-w-[70%]">
                          <span className="text-3xl select-none filter saturate-150">{ch.icon}</span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-mono tracking-widest bg-white/5 border border-white/10 text-gray-400 font-bold px-2 py-0.5 rounded uppercase">
                                {ch.day}
                              </span>
                              <span className="px-2 py-0.5 bg-[#FE0000]/10 border border-[#FE0000]/20 text-[#FE0000] text-[9px] tracking-widest font-mono uppercase font-black rounded">
                                {ch.category}
                              </span>
                            </div>

                            <h4 className="font-extrabold text-sm text-white uppercase">
                              {ch.title}
                            </h4>

                            <p className="text-[11px] sm:text-xs text-gray-300 font-sans font-light mt-1.5 leading-relaxed tracking-wide">
                              {ch.task}
                            </p>
                          </div>
                        </div>

                        <div className="w-full md:w-auto self-stretch flex items-end justify-between md:flex-col md:justify-center md:items-end flex-shrink-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                          <span className="text-xs font-mono text-gray-400 font-medium">Claim Rewards: <strong className="text-[#FE0505] font-mono font-bold">+10 XP</strong></span>
                          
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-extrabold uppercase bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl md:mt-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Claimed
                            </span>
                          ) : (
                            <button 
                              onClick={() => {
                                handleCompleteChallenge(ch.id);
                              }}
                              className="px-4 py-2 bg-[#FE0000] hover:bg-[#D00000] text-white hover:scale-102 active:scale-98 font-sans font-black text-[11px] tracking-wider uppercase rounded-xl transition-all h-9 flex items-center justify-center cursor-pointer"
                            >
                              MARK DONE
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: GAMIFICATION & POINTS RULES */}
        {activeTab === 'points' && (
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="border-b border-white/5 pb-4 mb-6">
                <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase">
                  GAMIFIED MILESTONES & POINTS SYSTEM
                </h2>
                <p className="text-gray-400 text-xs font-sans font-light mt-1">
                  Intentional accountability has immediate outputs. Accumulate points with each proactive duty to earn badge classification tiers.
                </p>
              </div>

              {/* TIER TIMELINE TRACK */}
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#FE0000] font-black mb-6">
                Active Tier Milestone Trophies
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {BADGES.map((tg) => {
                  const isCurrent = activeBadge.name === tg.name;
                  const isUnlocked = lifetimePoints >= tg.minPoints;
                  return (
                    <div 
                      key={tg.name}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isCurrent 
                          ? 'bg-[#FE0000]/15 border-[#FE0000] scale-102' 
                          : isUnlocked 
                            ? 'bg-white/5 border-white/10 opacity-70' 
                            : 'bg-black/40 border-white/5 opacity-50'
                      }`}
                    >
                      <span className="text-4xl filter saturate-125 mb-2 block select-none">{tg.icon}</span>
                      <h5 className="font-extrabold text-xs text-white uppercase">{tg.name}</h5>
                      <span className="text-[10px] text-amber-500 font-mono block font-black mt-1 uppercase">{tg.minPoints} XP</span>

                      <p className="text-[9px] text-gray-450 font-sans font-light mt-2 leading-relaxed">
                        {tg.description}
                      </p>

                      {isCurrent && (
                        <span className="inline-block mt-3 bg-[#FE0000] text-white text-[8px] font-mono tracking-widest uppercase font-extrabold px-2 py-0.5 rounded-full">
                          ACTIVE TIER
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* POINTS RULES TABLE */}
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-sans font-black text-lg tracking-tight text-white uppercase mb-4">
                XP Accountability Metrics
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase text-gray-400 tracking-wider">
                      <th className="py-3 px-4 font-bold">Action Completed</th>
                      <th className="py-3 px-4 text-right font-bold">XP Awarded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-light">
                    {POINT_ACTIONS.map((ac) => (
                      <tr key={ac.key} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 border-none font-semibold">{ac.action}</td>
                        <td className="py-3 px-4 border-none text-right font-mono font-black text-[#FE0000]">+{ac.points} XP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: LEADERBOARD DISPLAY */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase">
                    BEST FATHERS OF THE WEEK
                  </h2>
                  <p className="text-gray-400 text-xs font-sans font-light mt-1">
                    Resetting weekly. Highlighting fathers who lead accountability with proactive measures of fatherly intentionality.
                  </p>
                </div>

                {/* City filters */}
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <span className="text-[10px] text-gray-400 font-mono tracking-widest font-extrabold uppercase">FILTER:</span>
                  <select 
                    value={leaderboardFilter}
                    onChange={(e) => setLeaderboardFilter(e.target.value)}
                    className="bg-[#16203B] border border-white/10 rounded-xl px-3 py-1 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Cities</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="London">London</option>
                  </select>
                </div>
              </div>

              {/* WEEK ARCHIVE HALL OF FAME ROW FOR THE TOP 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {filteredLeaderboard.slice(0, 3).map((item, idx) => {
                  const placeColor = idx === 0 ? 'border-yellow-400' : idx === 1 ? 'border-gray-300' : 'border-amber-600';
                  const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
                  return (
                    <div 
                      key={item.id}
                      className="bg-gradient-to-b from-[#16203B] to-[#0E152B] p-5 rounded-2xl border border-white/5 text-center flex flex-col items-center relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 text-xl select-none">{medal}</div>
                      
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className={`w-14 h-14 rounded-xl object-cover border-2 mb-3 ${placeColor}`}
                      />
                      
                      <h4 className="font-extrabold text-sm text-white uppercase">{item.name}</h4>
                      <span className="text-[10px] text-gray-400 font-mono mb-2 block">{item.displayName}</span>
                      
                      <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg">
                        <span className="text-xs text-[#FE0000] font-mono font-black">{item.points} PTS</span>
                        <span className="text-[9px] text-gray-400 font-mono font-medium">this week</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LIST REMAINING FATHERS ITEMS */}
              <div className="space-y-2.5">
                {filteredLeaderboard.map((member) => (
                  <div 
                    key={member.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      member.id === 4 
                        ? 'bg-[#FE0000]/10 border-[#FE0000]/30' 
                        : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank indicator */}
                      <span className="font-mono text-sm font-black text-gray-400 w-6">
                        #{member.rank}
                      </span>

                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs sm:text-xs text-white uppercase">{member.name}</h4>
                          <span className="text-[9px] px-1.5 py-0.5 bg-white/5 border border-white/5 text-gray-400 uppercase rounded font-mono font-bold">
                            {member.region}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-405 font-mono block mt-0.5">{member.displayName}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs sm:text-sm font-black text-[#FE0000] block">{member.points} PTS</span>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-sans font-light">this week</span>
                    </div>

                  </div>
                ))}
              </div>

              {/* MONDAY RESET NOTICE */}
              <div className="mt-8 border-t border-white/5 pt-4 text-center">
                <span className="inline-flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/15 text-[10px] text-amber-500 font-mono tracking-widest font-black uppercase select-none">
                  <Clock className="w-3 h-3" />
                  RESETS EVERY MONDAY AT MIDNIGHT
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TAB 6: THE BREAKFAST MEETINGS PORTAL */}
        {activeTab === 'breakfast' && (
          <div className="space-y-8 text-left">
            
            {/* INCOMING BREAKFAST MEETING HERO */}
            <div className="bg-gradient-to-r from-[#121A33] to-[#0E152B] border border-white/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
              
              <div className="max-w-xl text-left">
                <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] tracking-widest font-mono uppercase font-black rounded mb-4 inline-block">
                  FLAGSHIP MEETING COHORT INCOMING
                </span>

                <h2 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase mb-2">
                  THE INTENTIONAL FATHER BREAKFAST MEETING
                </h2>

                <p className="font-sans font-light text-xs sm:text-[13px] text-gray-300 leading-relaxed tracking-wide mb-4">
                  Join hundreds of committed patriarchs in a session dedicated to breaking generation curses, planning financial assets, and active emotional presence.
                </p>

                <div className="space-y-2 text-xs text-gray-400 font-mono uppercase font-bold">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>June 20, 2026 &bull; 7:30 AM WAT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Continental Lounge, Victoria Island, Lagos & Zoom Link</span>
                  </div>
                </div>
              </div>

              {registeredEvents.includes("evt-1") ? (
                <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase flex items-center justify-center gap-2 w-full md:w-auto">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>RSVP REGISTERED (+25 PTS CLAIMED)</span>
                </div>
              ) : (
                <button 
                  onClick={() => handleRegisterEvent("evt-1")}
                  className="w-full md:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  RSVP REGISTER NOW & CLAIM 25 PTS
                </button>
              )}

            </div>

            {/* BREAKFAST REPLAYS RECORDINGS */}
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-sans font-black text-lg tracking-tight text-white uppercase mb-6 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#FE0000]" />
                PAST BREAKFAST MEETING REPLAYS (+15 PTS)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_REPLAYS.map((rep) => {
                  const isWatching = watchingReplayId === rep.id;
                  return (
                    <div 
                      key={rep.id}
                      className="bg-[#121A33] border border-white/5 rounded-2xl overflow-hidden p-4 flex flex-col justify-between"
                    >
                      <div>
                        {/* Artwork splash image fallback */}
                        <div className="relative h-44 rounded-xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                          {isWatching ? (
                            /* Simulated watch process representation */
                            <div className="absolute inset-0 bg-[#0E152B] flex flex-col items-center justify-center p-4">
                              <span className="text-amber-500 text-4xl animate-spin mb-3">⚙️</span>
                              <p className="text-xs uppercase tracking-widest text-[#FE0000] font-mono font-bold">WATCHING ACTIVE REPLAY SESSION</p>
                              <div className="w-11/12 h-1 bg-white/10 rounded-full overflow-hidden mt-3 max-w-[200px]">
                                <div className="h-full bg-[#FE0000] transition-all" style={{ width: `${replayStateTimer}%` }} />
                              </div>
                            </div>
                          ) : (
                            <>
                              <img src={rep.splashImg} alt={rep.title} className="w-full h-full object-cover brightness-50" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button 
                                  onClick={() => handleWatchReplay(rep.id)}
                                  className="w-12 h-12 rounded-full bg-amber-500 text-black hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
                                  aria-label="Play replay"
                                >
                                  <Play className="w-5 h-5 fill-current text-black ml-0.5" />
                                </button>
                              </div>
                            </>
                          )}

                          <div className="absolute top-2 right-2 bg-black/60 px-2.5 py-0.5 rounded-full text-[9px] text-gray-300 font-mono">
                            {rep.duration}
                          </div>
                        </div>

                        <h4 className="font-extrabold text-sm uppercase text-white leading-tight mb-1">
                          {rep.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono uppercase block mb-3">Broadcast Date: {rep.date}</span>
                      </div>

                      <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-mono text-[9px] uppercase">🔥 Reward standard: +15 pt reward</span>
                        <div className="flex gap-2 text-[9px] uppercase font-mono text-gray-500">
                          <span>👁️ {rep.watches} WATCHES</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 7: EVENTS HUB */}
        {activeTab === 'events' && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="border-b border-white/5 pb-4 mb-6">
                <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase">
                  MOVEMENT EVENTS HUB (RSVP REGISTER)
                </h2>
                <p className="text-gray-400 text-xs font-sans font-light mt-1">
                  Attend retreats, character workshops, webinars. RSVP registration automatically grants <strong className="text-white">+25 points</strong> to your weekly ranking.
                </p>
              </div>

              <div className="space-y-4">
                {INITIAL_EVENTS.map((evt) => {
                  const isRegistered = registeredEvents.includes(evt.id);
                  return (
                    <div 
                      key={evt.id}
                      className={`p-5 rounded-2xl border flex flex-col md:flex-row justify-between gap-5 text-left items-start ${
                        isRegistered ? 'bg-emerald-500/[0.04] border-emerald-500/25' : 'bg-white/5 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-white/5 px-2 py-0.5 font-mono text-[9px] text-[#FE0000] border border-[#FE0000]/15 uppercase font-bold tracking-widest rounded-md">
                            {evt.date}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono uppercase">{evt.capacity}</span>
                        </div>

                        <h4 className="font-extrabold text-sm sm:text-base text-white uppercase">
                          {evt.title}
                        </h4>

                        <p className="text-[11px] sm:text-xs text-gray-300 font-sans font-light mt-2 leading-relaxed">
                          {evt.description}
                        </p>

                        <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400 font-mono font-medium uppercase">
                          <Clock className="w-3.5 h-3.5 text-gray-500" />
                          <span>{evt.time}</span>
                          <span>&bull;</span>
                          <span>📍 {evt.location.split(' & ')[0]}</span>
                        </div>
                      </div>

                      <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end md:justify-center self-stretch flex-shrink-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                        <span className="text-[10px] font-mono font-bold text-gray-400 block mb-1">Standard: +25 XP</span>
                        
                        {isRegistered ? (
                          <div className="text-center">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase font-bold bg-emerald-500/15 border border-emerald-500/35 px-4 py-2 rounded-xl">
                              <CheckCircle className="w-3.5 h-3.5" />
                              REGISTERED!
                            </span>
                            <button 
                              onClick={() => triggerNotification("Event calendar invitation saved to calendar mock!")}
                              className="text-[9px] text-cyan-400 underline block mt-2 mx-auto cursor-pointer font-bold uppercase tracking-wider bg-transparent border-none"
                            >
                              Add to device calendar
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleRegisterEvent(evt.id)}
                            className="px-5 py-2.5 bg-[#FE0000] hover:bg-[#D00000] text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer"
                          >
                            RSVP NOW
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 8: RESOURCES LIBRARY */}
        {activeTab === 'resources' && (
          <div className="max-w-5xl mx-auto space-y-6 text-left">
            
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-6 gap-4">
                <div>
                  <h2 className="font-sans font-black text-2xl tracking-tight text-white uppercase">
                    CURATED MEMBER RESOURCES & TOOLS
                  </h2>
                  <p className="text-gray-400 text-xs font-sans font-light mt-1">
                    Read strategic parenting guides, legacy structures, mental fitness outlines curated strictly for dedicated fathers.
                  </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {["All", "Parenting", "Finance", "Mental Health", "Relationships"].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                        selectedCategory === cat 
                          ? 'bg-[#FE0000] text-white' 
                          : 'bg-white/5 hover:bg-white/10 text-white/70'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEARCH METER */}
              <div className="relative mb-8 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Identify guidelines, titles (e.g. Ten Sentences, Trust Fund)..." 
                  className="w-full bg-[#16203B] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FE0000]"
                />
              </div>

              {/* RESOURCE CARDS DECK */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((res) => {
                  const isSaved = savedResources.includes(res.id);
                  return (
                    <div 
                      key={res.id}
                      className="bg-gradient-to-b from-[#16203B] to-[#0E152B] p-5 rounded-2xl border border-white/5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2.5">
                          <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-450 font-mono text-[9px] uppercase rounded">
                            {res.category}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono uppercase">{res.readTime} read</span>
                        </div>

                        <h4 className="font-extrabold text-sm sm:text-base text-white uppercase mb-2">
                          {res.title}
                        </h4>
                        
                        <p className="text-xs text-gray-400 font-sans font-light mt-2 leading-relaxed">
                          {res.summary}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-between text-[11px]">
                        <span className="text-gray-500 font-mono text-[10px] uppercase">Author: {res.author}</span>
                        
                        <button 
                          onClick={() => handleToggleSaveResource(res.id)}
                          className={`flex items-center gap-1 font-mono uppercase tracking-wider text-[10px] font-black cursor-pointer bg-transparent border-none ${
                            isSaved ? 'text-amber-500 hover:text-amber-600' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : 'fill-none'}`} />
                          <span>{isSaved ? 'Saved Bookmark' : 'Save reading list'}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 9: MEMBER PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            
            <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-white/5 pb-6 mb-6">
                
                <img 
                  src={getUserAvatarUrl(profile.fullName, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150")} 
                  alt="User Profile Avatar"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/10"
                />

                <div className="text-center sm:text-left flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-sans font-black text-2xl text-white uppercase leading-none">
                      {getDynamicDisplayName()}
                    </h3>
                    <span className="self-center sm:self-start bg-[#FE0000] text-white text-[9px] font-mono tracking-widest font-extrabold uppercase px-2.5 py-0.5 rounded-full ml-0 sm:ml-2 mt-2 sm:mt-0">
                      {activeBadge.icon} {activeBadge.name} Tier
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono block mb-3">@{profile.username} &bull; Joined {profile.joinedDate || 'June 2026'}</span>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                    <span className="text-[11px] text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      📍 {profile.city || "Lagos, Nigeria"}
                    </span>
                    <span className="text-[11px] text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      {profile.role === 'boy_child' ? "👦 Boy Child / Young Man" : "👶 Father / Mentor"}
                    </span>
                  </div>
                </div>

                <div className="bg-[#16203B] p-4 rounded-xl border border-white/5 text-right flex-shrink-0 self-stretch sm:self-center flex flex-col justify-center items-center sm:items-end">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">lifetime point currency</span>
                  <p className="text-3xl font-mono font-black text-amber-500 mt-1">{lifetimePoints} pts</p>
                </div>

              </div>

              {/* PRIVACY SETTINGS BOX */}
              <div className="space-y-4">
                <h4 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-3">
                  Accountability Privacy Control panel
                </h4>

                <div className="bg-[#16203B] p-4 rounded-2xl border border-white/5 space-y-3 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Leaderboard Visibility</span>
                      <span className="text-[11px] text-gray-455">Permit other brotherhood members to observe your weekly target metrics</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#FE0000] h-4.5 w-4.5 rounded" />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <span className="font-bold text-white block">Challenge Reflection Share</span>
                      <span className="text-[11px] text-gray-455">Automatically broadcast challenge reflection texts to the community forum</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#FE0000] h-4.5 w-4.5 rounded" />
                  </div>
                </div>
              </div>

              {/* ACTIVITY LOG HISTORY FEED */}
              <div className="space-y-4 mt-8">
                <h4 className="font-sans font-black text-sm text-white uppercase tracking-wider">
                  My Live Accountability Verification feed
                </h4>

                <div className="space-y-3">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between text-xs items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-base">📅</span>
                      <div>
                        <span className="font-bold text-white block">RSVP registered for Breakfast Lagos Chapter meeting</span>
                        <span className="text-[10px] text-gray-400 font-mono block mt-0.5">Points claimed: +25 XP</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-550 font-mono">Today</span>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between text-xs items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-base font-bold">👁️</span>
                      <div>
                        <span className="font-bold text-white block">JIGI Weekly Episode reflection question resolved</span>
                        <span className="text-[10px] text-gray-400 font-mono block mt-0.5">Points claimed: +10 XP</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-550 font-mono">Today</span>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between text-xs items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-base">🌱</span>
                      <div>
                        <span className="font-bold text-white block">Complete accountability daily challenge: "Eye-Level Connection"</span>
                        <span className="text-[10px] text-gray-400 font-mono block mt-0.5">Points claimed: +10 XP</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-550 font-mono">Today</span>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex justify-between text-xs items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-base">🪵</span>
                      <div>
                        <span className="font-bold text-white block">Accountability check milestone unlocked: "Root Tier Badge"</span>
                        <span className="text-[10px] text-amber-500 font-mono block mt-0.5">Accumulative: 300 XP exceeded</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-550 font-mono">1 week ago</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 10: WATCH US LIVE STREAM */}
        {activeTab === 'watch' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
            
            {/* LEFT MAIN STREAM PLAYBACK & DISCUSSION CHAT */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-sans font-black text-xl text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                      </span>
                      Watch Us Live
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Tune into active live streams, programs, and virtual fellowships</p>
                  </div>
                  
                  {/* LIVE XP REWARD INDICATION */}
                  <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-3.5 py-1.5 flex items-center gap-1.5 select-none self-start sm:self-center">
                    <span className="text-xs animate-pulse">🔥</span>
                    <span className="font-mono text-[10px] text-red-400 font-extrabold uppercase">Earn +25 XP / Hour</span>
                  </div>
                </div>

                {/* Custom Playback Container with SVG rotating design */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group border border-white/10">
                  {isLivePlaying ? (
                    <iframe 
                      src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&controls=1&modestbranding=1&showinfo=0&rel=0" 
                      title="Intentional Fatherhood Live Stream"
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Elegant Overlay Image and rotating Text Play Button */
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src="https://res.cloudinary.com/dsmsugpys/image/upload/v1780668261/10_y5fpy2.jpg" 
                        alt="Watch live broadcast backdrop"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-[0.35] transition-transform duration-500 group-hover:scale-102 grayscale filter contrast-110 select-none pointer-events-none"
                      />
                      
                      {/* CENTRED SPINNING PRESS PLAY TEXT AND BUTTON */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-36 h-36 flex items-center justify-center cursor-pointer select-none" onClick={() => setIsLivePlaying(true)}>
                          
                          {/* Circular Rotating text */}
                          <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                            <defs>
                              <path id="circlePathLive" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                            </defs>
                            <text className="text-[5px] tracking-[0.25em] font-bold font-sans fill-white/80 uppercase">
                              <textPath href="#circlePathLive">
                                • watch us live • join the brotherhood • learn and grow • live •
                              </textPath>
                            </text>
                          </svg>

                          {/* Central Pulsing Play Triangle Button */}
                          <div className="w-16 h-16 rounded-full bg-[#FE0000] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg shadow-[#FE0000]/30 z-10">
                            <Play className="w-6 h-6 fill-white translate-x-[2px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/5 font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Radio className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-white">THE INTENTIONAL FATHER ANNUAL COHORT</h4>
                      <p className="text-[11px] text-gray-400">Speaker: Pastor Tim &amp; Guest Mentors &bull; Live from Ibadan</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsLivePlaying(!isLivePlaying)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans text-xs font-semibold cursor-pointer transition-all"
                  >
                    {isLivePlaying ? "Reset Screen" : "Start Playback"}
                  </button>
                </div>

              </div>

              {/* LIVE FELLOWSHIP CHAT PANEL */}
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="font-sans font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    Brotherhood Live Chat Feed
                  </h4>
                  <span className="text-[10px] font-mono text-white/50 bg-[#FE0000]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold border border-[#FE0000]/30">
                    ● 1,240 Online
                  </span>
                </div>

                {/* Chat Stream Box */}
                <div className="h-[240px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {liveChatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 text-xs">
                      <img 
                        src={msg.avatar} 
                        alt={msg.author} 
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 font-sans">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-sans">{msg.author}</span>
                          <span className="text-[9px] text-gray-500 font-mono">{msg.time}</span>
                        </div>
                        <p className="text-gray-300 mt-0.5 leading-relaxed bg-[#16203B] p-2.5 rounded-r-xl rounded-bl-xl border border-white/5">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat send action */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if(!newLiveMessage.trim()) return;
                    const newMsg = {
                      id: `msg-custom-${Date.now()}`,
                      author: getDynamicDisplayName(),
                      text: newLiveMessage.trim(),
                      time: "Just now",
                      avatar: getUserAvatarUrl(profile.fullName, "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=100&h=100")
                    };
                    setLiveChatMessages([...liveChatMessages, newMsg]);
                    setNewLiveMessage("");
                    // Add standard feedback points!
                    setUserPoints(prev => prev + 5);
                    setLifetimePoints(prev => prev + 5);
                    triggerNotification("Sent to Live Chat Feed! +5 XP claimed!");
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    value={newLiveMessage}
                    onChange={(e) => setNewLiveMessage(e.target.value)}
                    placeholder="Type what you are learning to chat feed..."
                    className="flex-grow bg-[#16203B] border border-white/5 hover:border-white/12 focus:border-[#FE0000] focus:ring-1 focus:ring-[#FE0000] outline-none text-white text-xs px-4 py-3 rounded-xl transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-[#FE0000] hover:bg-[#ff1e1e] text-white p-3 rounded-xl transition-transform active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

            {/* RIGHT SIDE LESSON NOTEPAD TAKEAWAYS */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#111A33] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="border-b border-white/5 pb-3">
                  <h4 className="font-sans font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    My Learning Notepad
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1">Jot down insights, definitions, and action points as you watch.</p>
                </div>

                {/* Notepad Write Form */}
                <div className="space-y-3">
                  <textarea 
                    value={currentNoteText}
                    onChange={(e) => setCurrentNoteText(e.target.value)}
                    placeholder="E.g., I must schedule 15 minutes of uninterrupted, eye-level conversation with my children daily."
                    rows={4}
                    className="w-full bg-[#16203B] border border-white/5 hover:border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-white text-xs px-4 py-3 rounded-xl transition-all leading-relaxed resize-none font-sans"
                  />
                  
                  <button 
                    onClick={() => {
                      if (!currentNoteText.trim()) return;
                      const newNote = {
                        id: `note-${Date.now()}`,
                        text: currentNoteText.trim(),
                        date: "Just now"
                      };
                      setNotepadNotes([newNote, ...notepadNotes]);
                      setCurrentNoteText("");
                      setUserPoints(prev => prev + 10);
                      setLifetimePoints(prev => prev + 10);
                      triggerNotification("Learning insight saved to your secure diary! +10 XP claimed!");
                    }}
                    disabled={!currentNoteText.trim()}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50 disabled:pointer-events-none text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl cursor-pointer transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <span>Save Takeaway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* List of saved takeaways */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <h5 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Jotted Lessons Timeline</h5>
                  
                  {notepadNotes.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-[11px] leading-relaxed">
                      Your Notepad is currently empty. Start jotting thoughts above to construct your personalized playbook!
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                      {notepadNotes.map((note) => (
                        <div key={note.id} className="bg-[#16203B] p-3 rounded-xl border border-white/5 space-y-1">
                          <p className="text-[11px] text-gray-300 leading-relaxed font-sans">{note.text}</p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[9px] text-[#ab8bfd] font-mono">{note.date}</span>
                            <button 
                              onClick={() => {
                                setNotepadNotes(prev => prev.filter(n => n.id !== note.id));
                                triggerNotification("Takeaway entry removed.");
                              }}
                              className="text-[10px] text-red-400/70 hover:text-red-400 font-sans cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              {/* ACCOUNTABILITY RULES INFO BOX */}
              <div className="bg-gradient-to-br from-[#1E1122] to-[#120F35] border border-white/5 rounded-3xl p-5 space-y-2.5 font-sans">
                <span className="text-amber-400 text-xs font-mono">🎯 ACCOUNTABILITY REWARDS</span>
                <p className="font-sans font-bold text-xs text-white leading-normal uppercase">Write and Refine</p>
                <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                  Active, mindful participation activates critical centers of learning. By interacting with the chat feed and saving reflection takeaways in your notepad, you earn real-time points towards moving up the Brotherhood Leaderboard tiers.
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0E1B3D] border-t border-white/5 py-4 px-6 md:px-12 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans uppercase tracking-widest text-[9px] sm:text-[10px]">
          <span>THE INTENTIONAL FATHER FOUNDATION PORTAL</span>
          <span>© 2026 The Intentional Father Foundation. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
