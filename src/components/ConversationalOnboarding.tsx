import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, ArrowRight, Check, Eye, EyeOff, Sparkles, User, Mail, 
  Phone, MapPin, ShieldCheck, HelpCircle, ArrowLeft, Loader2
} from 'lucide-react';

interface ConversationalOnboardingProps {
  onComplete: (userProfile: any) => void;
  onCancel: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string | React.ReactNode;
  timestamp: string;
}

export default function ConversationalOnboarding({ onComplete, onCancel }: ConversationalOnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Form states to collect
  const [fullName, setFullName] = useState('');
  const [preferredTitle, setPreferredTitle] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<'father' | 'boy_child' | ''>('');
  const [username, setUsername] = useState('');
  const [customUsername, setCustomUsername] = useState('');
  const [isCustomUsernameSelected, setIsCustomUsernameSelected] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation States
  const [errorMsg, setErrorMsg] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'invalid'>('idle');

  // Chat scroll anchor
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Dynamic values helper
  const getSalutationName = () => {
    const formattedTitle = preferredTitle === 'Other' ? customTitle : preferredTitle;
    if (role === 'boy_child') {
      // For boy child, do not use heavy titles, just name
      return fullName.split(' ')[0] || fullName;
    }
    if (formattedTitle) {
      return `${formattedTitle} ${fullName.split(' ')[0] || fullName}`;
    }
    return fullName.split(' ')[0] || fullName;
  };

  const getShorthandName = () => {
    return fullName.split(' ')[0] || fullName;
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Add bot message helper with artificial warm delay
  const addBotMessage = (text: string | React.ReactNode, delay = 800) => {
    setIsTyping(true);
    scrollToBottom();
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      scrollToBottom();
    }, delay);
  };

  // Add user message helper
  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    scrollToBottom();
  };

  // Trigger conversational flow
  useEffect(() => {
    // Initial welcome setup
    if (step === 1) {
      // Step 1: Welcome is handled by a beautiful custom overlay screen
    }
  }, []);

  const handleBegin = () => {
    setStep(2);
    addBotMessage(
      "Welcome. Before we begin, may we know your full name?",
      600
    );
  };

  // 1. Submit Name
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please enter your genuine full name.");
      return;
    }
    setErrorMsg('');
    addUserMessage(fullName);
    
    setStep(3);
    const shortName = fullName.split(' ')[0] || fullName;
    addBotMessage(
      <div>
        <p className="mb-2">Thank you. I can't address you without a fitting title—that would be disrespectful.</p>
        <p>How would you like us to address you during our journey?</p>
      </div>,
      800
    );
  };

  // 2. Submit Title
  const handleTitleSubmit = (selected: string) => {
    setPreferredTitle(selected);
    scrollToBottom();
    
    if (selected !== 'Other') {
      const finalTitle = selected;
      addUserMessage(finalTitle);
      proceedFromTitle(finalTitle);
    }
  };

  const handleCustomTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) {
      setErrorMsg("Please enter how we should address you.");
      return;
    }
    setErrorMsg('');
    addUserMessage(customTitle);
    proceedFromTitle(customTitle);
  };

  const proceedFromTitle = (titleToUse: string) => {
    setStep(4);
    const salutation = titleToUse ? `${titleToUse} ${fullName.split(' ')[0]}` : fullName.split(' ')[0];
    addBotMessage(
      `Thank you, ${salutation}. What email address would you like to use for your secure account?`,
      800
    );
  };

  // 3. Submit Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMsg("Please enter a valid, secure email address.");
      return;
    }
    setErrorMsg('');
    addUserMessage(email);

    setStep(5);
    const salutation = getSalutationName();
    addBotMessage(
      `Wonderful, ${salutation}. What's the best phone number to reach you with updates, events, and premium mentorship opportunities?`,
      800
    );
  };

  // 4. Submit Phone
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
    if (!phone.trim() || !phoneRegex.test(phone)) {
      setErrorMsg("Please enter a valid phone number (e.g. +234 803 123 4567 or 08031234567).");
      return;
    }
    setErrorMsg('');
    addUserMessage(phone);

    setStep(6);
    addBotMessage(
      "And which city are you joining us from?",
      800
    );
  };

  // 5. Submit City
  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || city.trim().length < 2) {
      setErrorMsg("Please enter your city.");
      return;
    }
    setErrorMsg('');
    addUserMessage(city);

    setStep(7);
    addBotMessage(
      "We'd love to know where you currently are on this journey. Which of these paths speaks to you?",
      800
    );
  };

  // 6. Role submission
  const handleRoleSubmit = (selectedRole: 'father' | 'boy_child') => {
    setRole(selectedRole);
    addUserMessage(selectedRole === 'father' ? "Father Path" : "Boy Child Path");
    
    setStep(8);
    
    // Select personalized message
    const salutation = selectedRole === 'father' 
      ? (preferredTitle === 'Other' ? customTitle : preferredTitle) + " " + fullName.split(' ')[0]
      : fullName.split(' ')[0];

    // Generate suggested usernames based on their name & prefix
    const nameClean = fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const firstClean = (fullName.split(' ')[0] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTitle = (preferredTitle !== 'Other' ? preferredTitle : customTitle).toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const suggestion1 = firstClean;
    const suggestion2 = `${firstClean}_${fullName.split(' ')[1]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'father'}`;
    const suggestion3 = `${firstClean}${Math.floor(Math.random() * 89) + 10}`;
    const suggestion4 = cleanTitle && selectedRole === 'father' ? `${cleanTitle}_${firstClean}` : `${firstClean}_son`;

    // Pick first as default
    setUsername(suggestion2);

    if (selectedRole === 'father') {
      addBotMessage(
        <div>
          <p className="font-semibold text-white mb-2">Thank you, {salutation}.</p>
          <p className="mb-4 text-white/90">Your presence today has the power to shape generations tomorrow. We're honored to have fathers like you in this movement.</p>
          <hr className="border-white/10 my-3" />
          <p>Let's reserve your unique handle. Here are custom suggestions we generated based on your profile. Which would you prefer?</p>
        </div>,
        1000
      );
    } else {
      addBotMessage(
        <div>
          <p className="font-semibold text-white mb-2">Thank you, {salutation}.</p>
          <p className="mb-4 text-white/90">The man you become tomorrow is being shaped by the choices you make today. We're excited to have you with us.</p>
          <hr className="border-white/10 my-3" />
          <p>Let's reserve your unique handle. Here are custom suggestions we generated based on your profile. Which would you prefer?</p>
        </div>,
        1000
      );
    }
  };

  // Username generator & check
  const handleSelectSuggestedUsername = (suggested: string) => {
    setIsCustomUsernameSelected(false);
    setUsername(suggested);
    setErrorMsg('');
    setUsernameStatus('checking');
    
    setTimeout(() => {
      setUsernameStatus('available');
    }, 400);
  };

  const handleCustomUsernameChange = (val: string) => {
    setIsCustomUsernameSelected(true);
    setCustomUsername(val);
    
    // Instant validation checks
    const usernameRegex =/^[a-zA-Z0-9_]+$/;
    if (val.length < 3) {
      setUsernameStatus('invalid');
      setErrorMsg('Username must be at least 3 characters.');
    } else if (!usernameRegex.test(val)) {
      setUsernameStatus('invalid');
      setErrorMsg('Only letters, numbers, and underscores are permitted.');
    } else {
      setErrorMsg('');
      setUsernameStatus('checking');
      setTimeout(() => {
        setUsernameStatus('available');
      }, 500);
    }
  };

  const handleUsernameSubmit = () => {
    const finalUser = isCustomUsernameSelected ? customUsername : username;
    const usernameRegex =/^[a-zA-Z0-9_]+$/;
    
    if (finalUser.length < 3) {
      setErrorMsg('Username must be at least 3 characters.');
      return;
    }
    if (!usernameRegex.test(finalUser)) {
      setErrorMsg('Only letters, numbers, and underscores are permitted.');
      return;
    }

    setErrorMsg('');
    addUserMessage(`Handle: @${finalUser}`);

    setStep(9);
    addBotMessage(
      `Almost done, ${getSalutationName()}. Please select a secure password to seal your membership in the Foundation.`,
      800
    );
  };

  // Password assessment strength calculator
  const checkPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'None', color: 'bg-gray-700' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    switch (score) {
      case 1: return { score: 1, text: 'Weak', color: 'bg-red-500 w-1/4' };
      case 2: return { score: 2, text: 'Medium', color: 'bg-amber-500 w-2/4' };
      case 3: return { score: 3, text: 'Strong', color: 'bg-emerald-500 w-3/4' };
      case 4: return { score: 4, text: 'Excellent', color: 'bg-green-400 w-full' };
      default: return { score: 0, text: 'Too short', color: 'bg-red-600 w-[10%]' };
    }
  };

  const passwordStrength = checkPasswordStrength(password);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setErrorMsg("Password must contain at least 1 number.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-verify.");
      return;
    }

    setErrorMsg('');
    addUserMessage("My secure password has been formulated.");
    setStep(10);
    
    addBotMessage(
      <div className="text-left font-sans">
        <p className="font-extrabold text-[18px] text-white mb-2 uppercase tracking-wide">Welcome To The Foundation, {getSalutationName()}.</p>
        <p className="mb-3 text-white/9 text-xs sm:text-sm font-light leading-relaxed">You are now part of a growing community committed to raising intentional boys, strengthening men, and building future fathers.</p>
        <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">Together, we are shaping stronger families, stronger communities, and stronger generations.</p>
      </div>,
      1000
    );
  };

  const handleJoinDashboard = () => {
    // Export membership profile to App level handler
    const finalUsername = isCustomUsernameSelected ? customUsername : username;
    onComplete({
      fullName,
      preferredTitle: preferredTitle === 'Other' ? customTitle : preferredTitle,
      email,
      phone,
      city,
      role,
      username: finalUsername,
      password,
      joinedDate: 'June 2026'
    });
  };

  // Rendering percentage of completion
  const getPercentage = () => {
    switch (step) {
      case 1: return 0;
      case 2: return 10;
      case 3: return 20;
      case 4: return 30;
      case 5: return 45;
      case 6: return 60;
      case 7: return 75;
      case 8: return 85;
      case 9: return 95;
      case 10: return 100;
      default: return 0;
    }
  };

  const titlesList = ["Mr.", "Mrs.", "Miss", "Pastor", "Rev.", "Dr.", "Prof.", "Chief", "Engr.", "Other"];

  // Name suggestions based on title and name
  const nameClean = fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const firstClean = (fullName.split(' ')[0] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanTitle = (preferredTitle !== 'Other' ? preferredTitle : customTitle).toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const suggestions = [
    firstClean,
    `${firstClean}_${fullName.split(' ')[1]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'father'}`,
    `${firstClean}${23}`,
    cleanTitle && role === 'father' ? `${cleanTitle}_${firstClean}` : `${firstClean}_son`
  ].filter(s => s && s.length >= 3);  return (
    <div className="relative w-full h-screen bg-[#0E1B3D] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* 🔴 HEADER BAR - CENTERING AND STYLING */}
      <header className="px-6 py-4 md:px-12 md:py-6 border-b border-white/5 grid grid-cols-3 items-center bg-[#0E1B3D]/80 backdrop-blur-md z-30 pointer-events-auto w-full">
        {/* Left Column: back button */}
        <div className="flex items-center justify-start">
          {step > 1 && (
            <button 
              onClick={() => {
                setErrorMsg('');
                if (step === 2) {
                  setStep(1);
                  setMessages([]);
                } else {
                  setStep((prev) => prev - 1);
                }
              }}
              className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              title="Go back a step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[10px] uppercase font-mono tracking-widest hidden sm:inline-block">Back</span>
            </button>
          )}
        </div>

        {/* Center Column: Step and completion progress */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] tracking-[0.2em] text-[#E31E24] block font-mono font-extrabold uppercase select-none">
            Step {step} of 10
          </span>
          <div className="flex items-center gap-2 mt-1 justify-center w-full">
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E31E24] transition-all duration-500 ease-out"
                style={{ width: `${getPercentage()}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-white/50 font-bold">{getPercentage()}%</span>
          </div>
        </div>

        {/* Right Column: Cancel exit button */}
        <div className="flex justify-end">
          <button 
            onClick={onCancel}
            className="text-white/40 hover:text-white/80 text-[10px] tracking-widest font-mono uppercase bg-white/5 border border-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer select-none"
          >
            Cancel
          </button>
        </div>
      </header>

      {/* STEP 1: DECORATIVE WELCOME OVERLAY SCREEN (Premium, elegant 14pt styling without emoji icon) */}
      {step === 1 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-y-auto max-w-4xl mx-auto z-10 w-full py-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            {/* 14pt premium header (18px) */}
            <h1 className="font-sans font-extrabold text-[18px] sm:text-[19px] text-white tracking-[0.15em] leading-normal uppercase mb-6 max-w-2xl select-none text-center">
              Welcome To The <span className="text-[#E31E24]">Intentional Father</span> Foundation
            </h1>

            <div className="bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-xl shadow-lg">
              <p className="font-sans font-extrabold text-[#E31E24] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
                Every Present Father Raises A Future Father.
              </p>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light tracking-wide">
                Whether you're a father shaping the next generation or a young man preparing for the future, we are deeply honored to have you here. Let's build your premium membership together.
              </p>
            </div>

            <button 
              onClick={handleBegin}
              className="px-8 py-4 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full shadow-lg hover:shadow-[#E31E24]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Begin Registration</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-[10px] text-gray-400 font-mono tracking-widest block uppercase mt-6 select-none">
              TAKES LESS THAN 2 MINUTES &bull; SECURE MEMBERSHIP RESERVATION
            </span>
          </motion.div>

        </div>
      ) : step === 10 ? (
        /* STEP 10: PREMIUM RE-DESIGNED THANK YOU PAGE WITH LOGIN TO DASHBOARD (14pt elegance) */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-y-auto max-w-3xl mx-auto z-10 w-full py-10">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* Elegant Checkmark Badge */}
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-3xl flex items-center justify-center text-4xl mb-8 relative shadow-xl">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl animate-ping opacity-30 pointer-events-none" />
            </div>

            <h1 className="font-sans font-extrabold text-[18px] sm:text-[19px] text-white tracking-[0.15em] leading-normal uppercase mb-4 max-w-2xl select-none text-center">
              Welcome To The <span className="text-[#E31E24]">Intentional Father</span> Foundation,<br />
              <span className="text-white">{getSalutationName()}</span>!
            </h1>

            <div className="bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-left w-full shadow-lg space-y-4 max-w-xl">
              <p className="font-sans font-extrabold text-[#E31E24] text-xs sm:text-sm tracking-[0.2em] uppercase">
                REGISTRATION SEALED SUCCESSFULLY
              </p>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light tracking-wide">
                You are now part of a growing community committed to raising intentional boys, strengthening men, and building future fathers. Together, we are shaping stronger families, stronger communities, and stronger generations.
              </p>
              
              {/* Visual credential metadata box */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-gray-400 space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">MEMBER HANDLE:</span>
                  <span className="text-white font-bold">@{isCustomUsernameSelected ? customUsername : username}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-550 font-bold uppercase tracking-widest text-[9px]">IDENTITY REGION:</span>
                  <span className="text-white font-bold uppercase">{city || 'Lagos, Nigeria'}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-550 uppercase tracking-widest text-[9px]">PATH ACTIVATED:</span>
                  <span className="text-[#E31E24]">
                    {role === 'boy_child' ? "👦 BOY CHILD LEGACY PATH" : "👨 INTENTIONAL FATHER PATH"}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleJoinDashboard}
              className="px-10 py-4.5 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full shadow-lg hover:shadow-[#E31E24]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Login to Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-[10px] text-gray-500 font-mono tracking-widest block uppercase mt-6 select-none">
              PROVISION SECURED SECURELY &bull; WELCOME ABOARD BROTHER
            </span>
          </motion.div>

        </div>
      ) : (
        /* CONVERSATIONAL CHAT ENGINE FOR STEPS 2-9 - ADAPTIVE STACKS TO PREVENT OVERLAPPING */
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row max-w-7xl mx-auto w-full relative">
          
          {/* LEFT SIDE CHAT LOG (SCROLLABLE AREA IN SPLIT SCREEN LAYOUT) */}
          <div className="flex-1 min-h-0 flex flex-col md:h-full bg-[#0B1530] md:border-r border-white/5 relative">
            <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 space-y-4 no-scrollbar">
              
              {/* Automated initial instruction greeting */}
              <div className="flex gap-3 max-w-[85%] text-left">
                <div className="w-8 h-8 rounded-lg bg-[#E31E24]/10 border border-[#E31E24]/20 flex items-center justify-center text-sm flex-shrink-0 select-none">
                  🧭
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5 font-bold">FOUNDATION GUIDE</span>
                  <div className="bg-[#121E3D] text-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-[13px] leading-relaxed border border-white/5 font-light">
                    Welcome. We will guide you step-by-step to reserve your profile on this foundation's high-end accountability framework.
                  </div>
                </div>
              </div>

              {/* Dynamic generated messages list */}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 select-none ${
                    msg.sender === 'user' 
                      ? 'bg-white/10 text-white' 
                      : 'bg-[#E31E24]/15 text-[#E31E24] border border-[#E31E24]/20'
                  }`}>
                    {msg.sender === 'user' ? '👤' : '🛡️'}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5">
                      {msg.sender === 'user' ? 'YOU' : 'FOUNDATION COUNSEL'}
                    </span>
                    <div className={`rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-[#E31E24] text-white border-[#E31E24] rounded-tr-none font-medium'
                        : 'bg-[#121E3D] text-gray-200 border-white/5 rounded-tl-none font-light'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Dynamic artificial typing indicator */}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] text-left">
                  <div className="w-8 h-8 rounded-lg bg-[#E31E24]/10 border border-[#E31E24]/20 flex items-center justify-center text-sm flex-shrink-0">
                    🛡️
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5">FOUNDATION COUNSEL</span>
                    <div className="bg-[#121E3D] rounded-2xl rounded-tl-none p-3.5 border border-white/5 flex items-center gap-1.5 h-10 w-16 justify-center">
                      <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* ERROR DISCLOSURE TO UNBLOCK USER */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   className="mx-4 mb-3 p-3 bg-red-950/40 border border-[#E31E24]/30 rounded-xl text-xs text-red-300 text-left flex items-center gap-2"
                >
                  <span className="text-sm">⚠️</span>
                  <p>{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE INTERACTIVE INPUT ACTION HUB (SCROLLABLE INDEPENDENT PANEL TO PREVENT OVERFLOW CRASHES) */}
          <div className="w-full md:w-[360px] lg:w-[400px] bg-[#0E1B3D] border-t md:border-t-0 p-6 flex flex-col justify-start md:justify-center overflow-y-auto text-left relative z-10 no-scrollbar max-h-[48%] md:max-h-none shrink-0 border-white/5">
            <h3 className="text-gray-400 text-[10px] tracking-wider uppercase font-mono mb-4 border-b border-white/5 pb-2">
              Action Prompt Required
            </h3>

            {/* STEP 2 INPUT: NAME */}
            {step === 2 && (
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-2">
                    Enter your real full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Samuel Adewale"
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.2em] uppercase rounded-xl transition-all shadow-md active:scale-99 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 3 SELECTION: TITLE */}
            {step === 3 && (
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-1">
                  Select address title
                </span>

                {preferredTitle !== 'Other' ? (
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1 no-scrollbar border border-white/5 p-2 rounded-xl bg-[#121E3D]/50">
                    {titlesList.map((itemValue) => (
                      <button
                        key={itemValue}
                        type="button"
                        onClick={() => handleTitleSubmit(itemValue)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center cursor-pointer transition-all ${
                          preferredTitle === itemValue 
                            ? 'bg-[#E31E24] border-[#E31E24] text-white' 
                            : 'bg-[#121E3D] border-white/5 hover:border-white/15 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {itemValue}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleCustomTitleSubmit} className="space-y-3">
                    <div>
                      <input 
                        type="text"
                        required
                        value={customTitle}
                        onChange={(e) => {
                          setCustomTitle(e.target.value);
                          setErrorMsg('');
                        }}
                        placeholder="e.g. Pastor, Elder, Chief"
                        className="w-full bg-[#121E3D] border border-[#E31E24] rounded-xl py-3 px-4 text-xs text-white uppercase placeholder-gray-500 focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setPreferredTitle('')}
                        className="px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs uppercase cursor-pointer"
                      >
                        Reset
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl cursor-pointer"
                      >
                        Confirm Title
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 4: EMAIL */}
            {step === 4 && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-2">
                    Enter email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="samuel@gmail.com"
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 5: PHONE */}
            {step === 5 && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-2">
                    Enter mobile phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. +234 803 123 4567"
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 6: CITY */}
            {step === 6 && (
              <form onSubmit={handleCitySubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-2">
                    Which city are you joining from?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="text"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Lagos, Abuja, London"
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 7: ROLE SELECTION */}
            {step === 7 && (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-1">
                  Select your journey identity
                </span>

                <div 
                  onClick={() => handleRoleSubmit('father')}
                  className="group bg-[#121E3D] hover:bg-[#16254F] border border-white/10 hover:border-[#E31E24]/50 rounded-2xl p-4 transition-all cursor-pointer flex gap-3 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[#E31E24]/10 transition-colors">
                    👨
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-[13px] text-white tracking-wider uppercase mb-1">FATHER</h4>
                    <p className="text-[10px] text-gray-300 font-sans leading-normal">
                      I am a father, father figure, mentor, or preparing for high-impact fatherhood.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => handleRoleSubmit('boy_child')}
                  className="group bg-[#121E3D] hover:bg-[#16254F] border border-white/10 hover:border-[#E31E24]/50 rounded-2xl p-4 transition-all cursor-pointer flex gap-3 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[#E31E24]/10 transition-colors">
                    👦
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-[13px] text-white tracking-wider uppercase mb-1">BOY CHILD</h4>
                    <p className="text-[10px] text-gray-300 font-sans leading-normal">
                      I am a boy or young man preparing deliberate action for my legacy future.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: USERNAME RESERVATION - STYLED CLEANLY TO ALIGN SCROLLS AND ELIMINATE OVERLAPS */}
            {step === 8 && (
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block mb-1">
                  Reserve your Foundation Username
                </span>

                {/* Recommendations container */}
                <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar pr-1 border border-white/5 p-2 rounded-xl bg-[#121E3D]/40">
                  <span className="text-[9px] text-gray-400 block font-mono uppercase pb-1 select-none">Recommended Suggestions:</span>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSelectSuggestedUsername(suggestion)}
                      className={`w-full py-2 px-3 rounded-lg border flex items-center justify-between text-xs transition-all cursor-pointer select-none ${
                        !isCustomUsernameSelected && username === suggestion
                          ? 'bg-[#E31E24]/10 border-[#E31E24] text-white font-extrabold'
                          : 'bg-[#121E3D] border-white/5 hover:border-white/10 text-white/80'
                      }`}
                    >
                      <span>@{suggestion}</span>
                      {!isCustomUsernameSelected && username === suggestion ? (
                        <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      ) : (
                        <span className="text-[9px] text-white/20 uppercase tracking-wider">Use</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Manual input */}
                <div className="border-t border-white/5 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-gray-400 font-mono uppercase">Or create custom prefix</span>
                    {isCustomUsernameSelected && usernameStatus === 'available' && (
                      <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> available
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-mono text-gray-400">@</span>
                    <input 
                      type="text"
                      value={isCustomUsernameSelected ? customUsername : ''}
                      onChange={(e) => handleCustomUsernameChange(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      placeholder="enter_custom_handle"
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-2 pl-8 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleUsernameSubmit}
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.15em] uppercase rounded-xl transition-all shadow-md active:scale-99 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Username</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 9: PASSWORD REGISTRATION */}
            {step === 9 && (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#E31E24] block">
                      Choose Password
                    </label>
                    <span className="text-[8px] text-gray-400 font-mono uppercase">min 8 chars &bull; 1 number</span>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="Secure passphrase..."
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors pr-10 font-mono"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Password confirmation security */}
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400 block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="Repeat secure passphrase..."
                      className="w-full bg-[#121E3D] border border-white/10 hover:border-white/20 focus:border-[#E31E24] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white cursor-pointer"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Micro strength indicators */}
                {password.length > 0 && (
                  <div className="space-y-1 bg-[#121E3D]/40 p-2 rounded-lg border border-white/5 font-mono">
                    <div className="flex justify-between items-center text-[8px] uppercase tracking-wider text-gray-400">
                      <span>Strength rating:</span>
                      <span className="font-bold text-white uppercase">{passwordStrength.text}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${passwordStrength.color}`} />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#B51218] text-white font-sans font-extrabold text-xs tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <span>Seal Account</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
