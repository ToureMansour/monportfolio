import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  ChevronRight,
  Menu,
  X,
  Download,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Languages
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Custom Icons ---
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

// --- Data ---
// --- Constants ---
const PROFILE_IMAGE = "/profile.png"; 
const TERRACOTTA_COLOR = "#A65D37";

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Parcours",
      projects: "Projets",
      contact: "Contact"
    },
    hero: {
      impact: "L'EXCELLENCE",
      central: "AU CŒUR DE",
      statement: "L'INNOVATION",
      scroll: "Découvrir mon univers"
    },
    about: {
      badge: "Disponible pour de nouveaux projets",
      title: "M. TOURE",
      subtitle: "SOULEYMANE",
      role: "Développeur Web & Mobile",
      description: "Passionné par la création de solutions web et mobiles modernes. Maîtrise de Laravel, Node.js et React Native avec une approche centrée sur la maintenabilité et la performance.",
      projects_btn: "Voir mes projets",
      cv_btn: "Télécharger CV"
    },
    expertise: {
      title: "Expertise Technique",
      subtitle: "Une stack technologique moderne et maîtrisée pour des solutions performantes.",
      vision_title: "Vision Technique",
      vision_desc: "Spécialisé dans l'écosystème **Full-Stack**, je privilégie des architectures propres (Clean Architecture) et évolutives. Mon expertise me permet de transformer des besoins complexes en solutions numériques fluides et performantes."
    },
    experience: {
      title: "Parcours &",
      subtitle: "Formation",
      desc: "Une trajectoire focalisée sur l'excellence technique et l'innovation numérique, alliant rigueur académique et expérience terrain.",
      pro: "Expertise Pro",
      pro_desc: "Focus sur le développement backend et la construction d'APIs robustes.",
      edu: "Formation",
      edu_desc: "Diplômé en Systèmes Informatiques et Logiciels.",
      degree: "Licence Professionnelle",
      field: "Système Informatique et Logiciel",
      school: "ESM-BENIN Calavi",
      present: "Présent"
    },
    projects: {
      title: "Projets Sélectionnés",
      desc: "Aperçu de mes travaux récents en développement web et mobile."
    },
    contact: {
      title: "Parlons de votre projet",
      desc: "Je suis à l'écoute de nouvelles opportunités de collaboration. N'hésitez pas à me contacter !",
      linkedin: "Me rejoindre sur LinkedIn",
      message: "Envoyer un message",
      location: "Localisation",
      address: "Abomey-Calavi Gbétagbo, Bénin"
    },
    footer: {
      rights: "Tous droits réservés.",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp"
    },
    projects_data: [
      {
        title: "Application Mobile Iwaju",
        description: "Optimisation et reprise d'une application mobile de Flutter vers React Native.",
        tags: ["React Native", "TypeScript", "API REST"],
        link: "#",
        image: "https://picsum.photos/seed/mobile/800/600"
      },
      {
        title: "Système de Gestion Backend",
        description: "Architecture modulaire basée sur le modèle Repository-Controller-Service avec Laravel.",
        tags: ["Laravel", "PHP", "MySQL", "API"],
        link: "#",
        image: "https://picsum.photos/seed/backend/800/600"
      },
      {
        title: "Dashboard Analytique",
        description: "Visualisation de données complexes et gestion d'interactions front/back fluides.",
        tags: ["React", "Node.js", "Express.js", "Tailwind"],
        link: "#",
        image: "https://picsum.photos/seed/dash/800/600"
      }
    ],
    experiences_data: [
      {
        role: "Développeur Web & Mobile",
        company: "",
        period: "Juillet 2025 - Présent",
        description: [
          "Développement et optimisation d'applications mobiles performantes.",
          "Migration technologique de Flutter vers React Native pour une meilleure maintenabilité.",
          "Conception et intégration d'APIs REST robustes.",
          "Mise en œuvre d'architectures modulaires (RCS) pour des systèmes évolutifs."
        ]
      }
    ]
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Journey",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      impact: "EXCELLENCE",
      central: "AT THE HEART OF",
      statement: "INNOVATION",
      scroll: "Explore my world"
    },
    about: {
      badge: "Available for new projects",
      title: "M. TOURE",
      subtitle: "SOULEYMANE",
      role: "Web & Mobile Developer",
      description: "Passionate about creating modern web and mobile solutions. Proficient in Laravel, Node.js, and React Native with an approach centered on maintainability and performance.",
      projects_btn: "View my projects",
      cv_btn: "Download CV"
    },
    expertise: {
      title: "Technical Expertise",
      subtitle: "A modern and mastered technology stack for high-performance solutions.",
      vision_title: "Technical Vision",
      vision_desc: "Specializing in the **Full-Stack** ecosystem, I prioritize clean and scalable architectures. My expertise allows me to transform complex needs into fluid and high-performing digital solutions."
    },
    experience: {
      title: "Journey &",
      subtitle: "Education",
      desc: "A trajectory focused on technical excellence and digital innovation, combining academic rigor and field experience.",
      pro: "Pro Expertise",
      pro_desc: "Focus on backend development and building robust APIs.",
      edu: "Education",
      edu_desc: "Graduated in Computer Systems and Software.",
      degree: "Professional License",
      field: "Computer Systems and Software",
      school: "ESM-BENIN Calavi",
      present: "Present"
    },
    projects: {
      title: "Selected Projects",
      desc: "Overview of my recent work in web and mobile development."
    },
    contact: {
      title: "Let's talk about your project",
      desc: "I am open to new collaboration opportunities. Feel free to contact me!",
      linkedin: "Join me on LinkedIn",
      message: "Send a message",
      location: "Location",
      address: "Abomey-Calavi Gbetagbo, Benin"
    },
    footer: {
      rights: "All rights reserved.",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp"
    },
    projects_data: [
      {
        title: "Iwaju Mobile App",
        description: "Optimization and takeover of a mobile application from Flutter to React Native.",
        tags: ["React Native", "TypeScript", "REST API"],
        link: "#",
        image: "https://picsum.photos/seed/mobile/800/600"
      },
      {
        title: "Backend Management System",
        description: "Modular architecture based on the Repository-Controller-Service model with Laravel.",
        tags: ["Laravel", "PHP", "MySQL", "API"],
        link: "#",
        image: "https://picsum.photos/seed/backend/800/600"
      },
      {
        title: "Analytical Dashboard",
        description: "Visualization of complex data and management of fluid front/back interactions.",
        tags: ["React", "Node.js", "Express.js", "Tailwind"],
        link: "#",
        image: "https://picsum.photos/seed/dash/800/600"
      }
    ],
    experiences_data: [
      {
        role: "Web & Mobile Developer",
        company: "",
        period: "July 2025 - Present",
        description: [
          "Development and optimization of high-performance mobile applications.",
          "Technological migration from Flutter to React Native for better maintainability.",
          "Design and integration of robust REST APIs.",
          "Implementation of modular architectures (RCS) for scalable systems."
        ]
      }
    ]
  }
};

// --- Components ---

const Navbar = ({ lang, setLang, activeSection }: { lang: 'fr' | 'en', setLang: (l: 'fr' | 'en') => void, activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.experience, href: '#experience' },
    { name: t.projects, href: '#projects' },
    { name: t.contact, href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "glass py-3 shadow-xl border-0 border-b border-white/5" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold font-sans tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">M</span>. TOURE
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          
          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-all glass px-3 py-1.5 rounded-full border border-white/5 active:scale-95"
            >
              <span className="text-base">{lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
              {lang === 'fr' ? 'FR' : 'EN'}
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isLangOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-36 glass rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl"
                >
                  <button 
                    onClick={() => { setLang('fr'); setIsLangOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/20 transition-colors text-left"
                  >
                    <span className="text-lg">🇫🇷</span> Français
                  </button>
                  <button 
                    onClick={() => { setLang('en'); setIsLangOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/20 transition-colors text-left"
                  >
                    <span className="text-lg">🇬🇧</span> English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-x-6 top-24 glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl z-50"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, idx) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "text-xl font-semibold transition-colors flex items-center justify-between",
                    activeSection === link.href.substring(1) ? "text-primary" : "text-slate-300"
                  )}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && <div className="w-2 h-2 rounded-full bg-primary" />}
                </motion.a>
              ))}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                <button 
                  onClick={() => { setLang('fr'); setIsOpen(false); }} 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                    lang === 'fr' ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-400"
                  )}
                >
                  <span className="text-lg">🇫🇷</span> FR
                </button>
                <button 
                  onClick={() => { setLang('en'); setIsOpen(false); }} 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                    lang === 'en' ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-400"
                  )}
                >
                  <span className="text-lg">🇬🇧</span> EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].hero;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[600px] md:h-[1000px] bg-primary/20 rounded-full blur-[100px] md:blur-[180px]" 
      />
      
      {/* Portrait Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          y: [-20, 20, -20]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-8 flex flex-col items-center">
            <div className="overflow-hidden py-2">
              <motion.span variants={item} className="block text-slate-200 opacity-20">{t.impact}</motion.span>
            </div>
            <div className="overflow-hidden py-2 -mt-2 md:-mt-4">
              <motion.span variants={item} className="block text-primary">{t.central}</motion.span>
            </div>
            <div className="overflow-hidden py-2 -mt-2 md:-mt-4">
              <motion.span variants={item} className="block text-white">{t.statement}</motion.span>
            </div>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
            <p className="text-xs uppercase tracking-[0.5em] text-slate-500 font-bold">
              {t.scroll}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].about;
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold leading-tight mb-6">
            {t.title} <br />
            <span className="text-gradient">{t.subtitle}</span>
          </h2>
          <h3 className="text-xl md:text-3xl font-semibold text-slate-300 mb-6">
            {t.role}
          </h3>
          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-lg break-words">
            {t.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95">
              {t.projects_btn}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 glass hover:bg-white/10 text-white rounded-xl font-semibold transition-all flex items-center gap-2 hover:-translate-y-1 active:scale-95 border border-white/10">
              <Download className="w-5 h-5" />
              {t.cv_btn}
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/mansourou-tour%C3%A9-souleymane-093ab3383/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="https://wa.me/2290158821692" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors"><WhatsAppIcon className="w-6 h-6" /></a>
            <a href="mailto:mansouroutoures@gmail.com" className="text-slate-400 hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-first md:order-last"
        >
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-white/5 shadow-2xl bg-primary/10 group">
            <img 
              src={PROFILE_IMAGE} 
              alt="M. TOURE SOULEYMANE" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].experience;
  return (
    <section id="experience" className="py-24 bg-slate-900/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {t.title} <br />
                <span className="text-gradient">{t.subtitle}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md break-words">
                {t.desc}
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-6 glass rounded-3xl border-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.pro}</h3>
                    <p className="text-sm text-slate-500">{t.pro_desc}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 glass rounded-3xl border-primary/10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.edu}</h3>
                    <p className="text-sm text-slate-500">{t.edu_desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {translations[lang].experiences_data.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 glass rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                    {exp.company && <p className="text-slate-400 font-medium">{exp.company}</p>}
                  </div>
                </div>
                <ul className="space-y-4 relative z-10">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-400 flex gap-3 text-sm md:text-base leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 glass rounded-[2.5rem] border-primary/5 bg-primary/5 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-primary">2025</span>
                  <h3 className="text-xl font-bold">{t.degree}</h3>
                </div>
              </div>
              <p className="text-lg font-medium mb-1 relative z-10">{t.field}</p>
              <p className="text-slate-500 relative z-10">{t.school}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].expertise;
  return (
    <section id="expertise" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-slate-400 max-w-xl">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Frontend Development", 
              icon: <Globe className="w-6 h-6" />,
              skills: ["React Native", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS"],
              color: "bg-blue-500/10 text-blue-500"
            },
            { 
              title: "Backend Development", 
              icon: <Terminal className="w-6 h-6" />,
              skills: ["PHP (Laravel)", "Node.js", "Express.js", "MySQL / PostgreSQL"],
              color: "bg-emerald-500/10 text-emerald-500"
            },
            { 
              title: "Architecture & API", 
              icon: <Cpu className="w-6 h-6" />,
              skills: ["Modèle RCS", "API RESTful", "Auth JWT", "Conception Modulaire"],
              color: "bg-amber-500/10 text-amber-500"
            },
            { 
              title: "Outils & DevOps", 
              icon: <Code2 className="w-6 h-6" />,
              skills: ["Git / GitHub", "Docker", "Postman", "Agile (Scrum)"],
              color: "bg-purple-500/10 text-purple-500"
            }
          ].map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10, translateZ: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ perspective: 1000 }}
              className="p-8 glass rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all group cursor-default"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-12", cat.color)}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1.5 bg-white/5 rounded-lg text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 p-10 glass rounded-[3rem] bg-primary/5 border-primary/10 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-2 h-10 bg-primary rounded-full" />
              {t.vision_title}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
              {t.vision_desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = ({ lang, onSelectProject }: { lang: 'fr' | 'en', onSelectProject: (p: Project) => void }) => {
  const t = translations[lang].projects;
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              {t.desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {translations[lang].projects_data.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="group relative glass rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-primary/10 rounded-md text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm group/btn">
                  {lang === 'fr' ? 'Détails du projet' : 'Project details'}
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].contact;
  return (
    <section id="contact" className="py-24 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass p-6 md:p-12 rounded-[2rem] border-primary/20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.title}</h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8">
                {t.desc}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
                    <a href="mailto:mansouroutoures@gmail.com" className="font-medium hover:text-primary transition-colors break-all">mansouroutoures@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">WhatsApp</p>
                    <a href="https://wa.me/2290158821692" target="_blank" rel="noreferrer" className="font-medium hover:text-primary transition-colors">01 58 82 16 92</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t.location}</p>
                    <p className="font-medium">{t.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-4 mt-8 md:mt-0">
              <a 
                href="https://www.linkedin.com/in/mansourou-tour%C3%A9-souleymane-093ab3383/"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95"
              >
                <Linkedin className="w-5 h-5" />
                {t.linkedin}
              </a>
              <a 
                href="mailto:mansouroutoures@gmail.com"
                className="px-8 py-4 glass hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 border border-white/10"
              >
                <Mail className="w-5 h-5" />
                {t.message}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: 'fr' | 'en' }) => {
  const t = translations[lang].footer;
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-slate-500 text-sm text-center md:text-left">
          © {new Date().getFullYear()} M. TOURE SOULEYMANE. {t.rights}
        </div>
        
        <div className="flex gap-6 items-center">
          <a href="mailto:mansouroutoures@gmail.com" className="text-slate-500 hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/mansourou-tour%C3%A9-souleymane-093ab3383/" className="text-slate-500 hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://wa.me/2290158821692" className="text-slate-500 hover:text-primary transition-colors">
            <WhatsAppIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Sort entries by intersection ratio or just pick the one that is intersecting
      // To avoid multiple sections being active, we can pick the one that started intersecting
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    const sections = ['home', 'about', 'experience', 'expertise', 'projects', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Explicitly handle the top of the page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="selection:bg-primary/30 selection:text-primary bg-slate-950 text-white min-h-screen">
      <Navbar lang={lang} setLang={setLang} activeSection={activeSection} />
      <main>
        <Hero lang={lang} />
        <AboutSection lang={lang} />
        <ExperienceSection lang={lang} />
        <ExpertiseSection lang={lang} />
        <Projects lang={lang} onSelectProject={setSelectedProject} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] bg-slate-900 border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-0 md:gap-8">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-widest font-bold px-3 py-1 bg-primary/10 rounded-full text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{selectedProject.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <a 
                      href={selectedProject.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 px-6 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 group"
                    >
                      {lang === 'fr' ? 'Voir le projet' : 'View Project'}
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
