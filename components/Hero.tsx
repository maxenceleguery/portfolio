'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(/background.jpg)' }}
        />
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Maxence Leguéry
            </span>
          </h1>
          
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              French engineering student specialized in{' '}
              <span className="text-blue-400 font-semibold">computer science</span> and{' '}
              <span className="text-purple-400 font-semibold">machine learning</span>
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#about"
                className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More About Me
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}