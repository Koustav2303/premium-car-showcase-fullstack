import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroTextRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP Animation System for premium motion design 
    const tl = gsap.timeline();

    // Subtle zoom effect on the background
    tl.fromTo(bgRef.current, 
      { scale: 1.1, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
    )
    // Staggered reveal for the hero text
    .fromTo(heroTextRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=1.5" // Start this animation slightly before the background finishes
    )
    // Fade in the Call to Action button
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center text-center">
      {/* Fullscreen cinematic hero background [cite: 66] */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black -z-10"
      >
        {/* Note: Later, we can replace this gradient with a static 3D render or a high-quality video background before they enter the actual 3D configurator */}
      </div>
      
      <div ref={heroTextRef} className="z-10 px-4">
        <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-4 text-white uppercase">
          Define Your <span className="font-bold">Legacy</span>
        </h1>
        <p className="text-sm md:text-xl font-light tracking-[0.3em] text-gray-400 uppercase mt-6">
          The Next Generation Automotive Experience
        </p>
      </div>

      <div ref={ctaRef} className="z-10 mt-16">
        <Link 
          to="/configurator" 
          className="px-10 py-4 border border-white text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
        >
          Enter Configurator
        </Link>
      </div>
    </div>
  );
};

export default Home;