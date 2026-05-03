import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-500">
       <nav className={`px-6 py-4 rounded-full flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl border border-dark/10 text-dark shadow-sm' : 'bg-transparent text-primary'}`}>
         <div className="font-sans font-bold tracking-tight text-xl">EAA.</div>
         <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold uppercase">
           <a href="#features" className="link-hover">Afzalliklar</a>
           <a href="#philosophy" className="link-hover">Falsafa</a>
           <a href="#protocol" className="link-hover">Protokol</a>
         </div>
         <a href="#cta" className={`btn-magnetic px-6 py-2 rounded-full text-sm font-sans ${scrolled ? 'bg-accent text-white' : 'bg-primary text-dark'}`}>
            <span className="relative z-10">Ro'yxatdan o'tish</span>
         </a>
       </nav>
    </div>
  )
}

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-12 bg-dark" ref={containerRef}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80" 
          alt="Industrial architecture" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <h1 className="flex flex-col gap-2">
          <span className="hero-elem font-sans font-bold text-3xl md:text-5xl text-primary uppercase tracking-tight">Quring va optimallashtiring</span>
          <span className="hero-elem font-serif italic text-6xl md:text-8xl lg:text-[10rem] text-accent leading-none tracking-tighter pr-4">Energiya tizimini.</span>
        </h1>
        <p className="hero-elem mt-8 text-primary/80 font-mono text-sm max-w-md leading-relaxed">
          Sanoat korxonalari va bino energiya samaradorligi bo‘yicha milliy sertifikatlash markazi. Xalqaro standartlar va akademik amaliyot.
        </p>
        <div className="hero-elem mt-10">
          <a href="#cta" className="btn-magnetic bg-accent text-white px-8 py-4 rounded-full text-lg shadow-xl shadow-accent/20">
            <span className="relative z-10 flex items-center gap-2">Saralashda qatnashish <ChevronRight size={20} /></span>
          </a>
        </div>
      </div>
    </section>
  )
}

const Card1 = () => {
  const [items, setItems] = useState([
    "Sanoat korxonalari",
    "Zamonaviy binolar",
    "ASHRAE standartlari"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary border border-dark/10 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between h-[22rem]">
      <div>
        <h3 className="font-sans font-bold text-2xl text-dark mb-2">Ikki Yo‘nalish</h3>
        <p className="text-dark/70 text-sm font-mono">Chuqurlashtirilgan o‘quv modullari</p>
      </div>
      <div className="relative h-40 mt-4">
        {items.map((item, i) => (
          <div 
            key={item} 
            className="absolute left-0 w-full bg-background border border-dark/5 rounded-2xl p-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center shadow-sm"
            style={{
              top: i * 20,
              zIndex: 10 - i,
              opacity: 1 - i * 0.2,
              transform: `scale(${1 - i * 0.05})`
            }}
          >
             <span className="font-mono text-xs font-bold text-dark uppercase">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const Card2 = () => {
  const text = "Obyektlarning real energiya modellarini yaratishni o‘rganish... TDTU baza simulyatsiyasi faollashtirildi... Analiz davom etmoqda...";
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if(i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        i = 0; 
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary border border-dark/10 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between h-[22rem]">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="text-xs font-mono text-accent font-bold uppercase">Jonli efir</span>
        </div>
        <h3 className="font-sans font-bold text-2xl text-dark mb-2">Akademik Simulyatsiya</h3>
        <p className="text-dark/70 text-sm font-mono">TDTU laboratoriya bazasi</p>
      </div>
      <div className="bg-dark text-background p-5 rounded-2xl h-32 font-mono text-[11px] overflow-hidden relative shadow-inner">
        <p className="leading-relaxed">{displayed}<span className="inline-block w-1.5 h-3 bg-accent ml-1 animate-pulse"></span></p>
      </div>
    </div>
  )
}

const Card3 = () => {
  const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const buttonRef = useRef(null);
  const dayRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.to(cursorRef.current, {
        x: 140, y: 30, duration: 1, ease: "power2.inOut"
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(dayRefs.current[4], { backgroundColor: '#E63B2E', color: '#FFF', duration: 0.1 }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      .to(cursorRef.current, { x: 200, y: 90, duration: 1, ease: "power2.inOut", delay: 0.5 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(buttonRef.current, { scale: 0.95, duration: 0.1 }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      .to(buttonRef.current, { scale: 1, duration: 0.1 }, "<")
      .to(dayRefs.current[4], { backgroundColor: 'transparent', color: '#111', duration: 0.5, delay: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-primary border border-dark/10 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between h-[22rem]" ref={containerRef}>
      <div>
         <h3 className="font-sans font-bold text-2xl text-dark mb-2">Professional Status</h3>
         <p className="text-dark/70 text-sm font-mono">Rasmiy hujjat va litsenziya</p>
      </div>
      <div className="mt-4 relative bg-background p-4 rounded-2xl">
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days.map((d, i) => (
             <div key={d} ref={el => {if(el) dayRefs.current[i] = el;}} className="text-[10px] font-mono text-center py-2 rounded-md border border-dark/10 text-dark transition-colors">
               {d}
             </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div ref={buttonRef} className="bg-dark text-background text-xs font-mono font-bold py-2 px-4 rounded-full border border-dark">Sertifikat</div>
        </div>
        <div ref={cursorRef} className="absolute top-0 left-0 text-dark z-10 drop-shadow-md">
          <MousePointer2 fill="#111111" size={24} />
        </div>
      </div>
    </div>
  )
}

const FeaturesSection = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-32 px-6 md:px-12 bg-background" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans font-bold text-4xl md:text-6xl text-dark mb-16 uppercase tracking-tight">Tizim<br/><span className="text-accent">Afzalliklari</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card"><Card1 /></div>
          <div className="feature-card"><Card2 /></div>
          <div className="feature-card"><Card3 /></div>
        </div>
      </div>
    </section>
  )
}

const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-text-1", {
        scrollTrigger: {
          trigger: ".phil-text-1",
          start: "top 80%"
        },
        y: 30, opacity: 0, duration: 1, ease: "power3.out"
      });
      gsap.from(".phil-text-2 span", {
        scrollTrigger: {
          trigger: ".phil-text-2",
          start: "top 80%"
        },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const statement = "xalqaro ASHRAE standartlariga asoslangan real energiya modellashtirish amaliyoti.".split(" ");

  return (
    <section id="philosophy" className="relative py-40 px-6 md:px-12 bg-dark text-primary overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80" 
          alt="Blueprint texture" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="phil-text-1 font-mono text-sm md:text-base text-primary/60 mb-12 uppercase max-w-xl">
          Ko'pchilik o'quv markazlari quyidagilarga e'tibor qaratadi: faqat nazariy bilimlarni berish va yuzaki tahlil.
        </p>
        <h2 className="phil-text-2 font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight">
          Bizning asosiy e'tiborimiz: <br />
          {statement.map((word, i) => (
             <span key={i} className={`inline-block mr-3 mt-4 ${word.includes('ASHRAE') || word.includes('real') ? 'text-accent font-sans not-italic font-bold uppercase' : ''}`}>{word}</span>
          ))}
        </h2>
      </div>
    </section>
  )
}

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if(i === cards.length - 1) return;
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top top",
            endTrigger: cards[i + 1],
            end: "top top",
            scrub: true,
            pin: true,
            pinSpacing: false
          },
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(10px)",
          ease: "none"
        });
      });
      
      gsap.to(".gear-spin", { rotation: 360, repeat: -1, duration: 10, ease: "linear", transformOrigin: "center" });
      gsap.to(".scanner-line", { y: 200, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut" });
      gsap.to(".pulse-path", { strokeDashoffset: 0, repeat: -1, duration: 3, ease: "linear" });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Saralash Bosqichi",
      desc: "Nomzodlarning bazaviy muhandislik bilimlari va tahliliy qobiliyatlarini sinovdan o'tkazish.",
      visual: (
         <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-dark">
           <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" className="gear-spin" strokeDasharray="10 5" />
           <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none" className="gear-spin" style={{animationDirection: 'reverse'}} strokeDasharray="5 5" />
         </svg>
      )
    },
    {
      num: "02",
      title: "Simulyatsiya",
      desc: "ASHRAE standartlari asosida obyektlarning real energiya modellarini yaratishni o‘rganish.",
      visual: (
        <div className="w-full h-full relative opacity-30 text-dark border border-current mt-10 h-4/5 rounded-xl overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3}}></div>
          <div className="scanner-line absolute top-0 left-0 w-full h-1 bg-current shadow-[0_0_15px_currentColor]"></div>
        </div>
      )
    },
    {
      num: "03",
      title: "Sertifikatlash",
      desc: "Imtihonni muvaffaqiyatli topshirish va professional auditor maqomini tasdiqlovchi rasmiy hujjatni olish.",
      visual: (
         <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-dark">
           <path d="M0 50 L30 50 L40 20 L60 80 L70 50 L100 50" stroke="currentColor" strokeWidth="2" fill="none" className="pulse-path" strokeDasharray="200" strokeDashoffset="200" />
         </svg>
      )
    }
  ];

  return (
    <section id="protocol" className="bg-background pt-20 pb-40" ref={containerRef}>
       <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-dark uppercase tracking-tight">Akademiya<br/><span className="text-accent">Protokoli</span></h2>
       </div>
       <div className="relative">
         {steps.map((step, i) => (
            <div key={i} className="protocol-card h-[100vh] flex items-center justify-center sticky top-0 p-6">
               <div className="w-full max-w-5xl bg-primary rounded-[3rem] p-8 md:p-20 shadow-2xl border border-dark/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 h-full max-h-[600px]">
                  <div className="absolute -right-20 -top-20 w-3/4 md:w-1/2 h-[120%] pointer-events-none">
                    {step.visual}
                  </div>
                  <div className="relative z-10 w-full md:w-1/2">
                    <div className="font-mono text-accent text-5xl md:text-7xl font-bold mb-6">{step.num}</div>
                    <h3 className="font-sans font-bold text-3xl md:text-5xl text-dark mb-6 tracking-tight leading-tight">{step.title}</h3>
                    <p className="font-mono text-dark/70 text-sm md:text-base max-w-md leading-relaxed">{step.desc}</p>
                  </div>
               </div>
            </div>
         ))}
       </div>
    </section>
  )
}

const CallToAction = () => {
  return (
    <section id="cta" className="py-32 px-6 md:px-12 bg-background flex justify-center">
      <div className="w-full max-w-6xl bg-dark rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full transform scale-150"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-serif italic text-4xl md:text-7xl text-primary mb-8 leading-tight">
            Professional auditorlar <br/> korpusiga qo'shiling.
          </h2>
          <p className="font-mono text-primary/70 mb-12 max-w-xl text-sm md:text-base">
            Sanoat korxonalari va zamonaviy binolarning energiya samaradorligini tahlil qilish bo'yicha milliy sertifikatga ega bo'ling.
          </p>
          <button className="btn-magnetic bg-accent text-white px-10 py-5 rounded-full text-xl shadow-2xl shadow-accent/40 font-sans tracking-wide">
             <span className="relative z-10">Kursga ro'yxatdan o'tish va saralash</span>
          </button>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-dark text-primary pt-20 pb-10 px-6 md:px-12 rounded-t-[4rem]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-primary/10 pb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-sans font-bold text-4xl mb-4 tracking-tight">EAA.</h3>
            <p className="font-mono text-sm text-primary/50 max-w-sm mb-8 leading-relaxed">
               TDTU bazasidagi sanoat va bino energiya samaradorligi bo‘yicha milliy sertifikatlash markazi.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary/70 font-bold">Tizim Faol</span>
            </div>
          </div>
          <div>
            <h4 className="font-sans font-bold text-lg mb-6 text-white tracking-wide">Navigatsiya</h4>
            <ul className="flex flex-col gap-4 font-mono text-sm text-primary/60">
               <li><a href="#features" className="hover:text-accent transition-colors">Afzalliklar</a></li>
               <li><a href="#philosophy" className="hover:text-accent transition-colors">Falsafa</a></li>
               <li><a href="#protocol" className="hover:text-accent transition-colors">Protokol</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-sans font-bold text-lg mb-6 text-white tracking-wide">Aloqa</h4>
             <ul className="flex flex-col gap-4 font-mono text-sm text-primary/60">
               <li>Toshkent Davlat Texnika Universiteti</li>
               <li>info@eaa.uz</li>
               <li>+998 71 234 56 78</li>
             </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs text-primary/40">
           <p>&copy; {new Date().getFullYear()} Energy Audit Academy. Barcha huquqlar himoyalangan.</p>
           <p className="mt-4 md:mt-0 font-bold tracking-widest uppercase">Brutal Signal Tizimi</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="w-full bg-background min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Philosophy />
      <Protocol />
      <CallToAction />
      <Footer />
    </div>
  )
}
