'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

interface ContactMethod {
  name: string;
  icon: string;
  url?: string;
  display: string;
  description: string;
  color: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      name: 'LinkedIn',
      icon: '/linkedin_logo.webp',
      url: 'https://www.linkedin.com/in/maxence-leguery/',
      display: 'maxence-leguery',
      description: 'Connect with me professionally',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'GitHub',
      icon: '/github_logo.png',
      url: 'https://github.com/maxenceleguery',
      display: 'maxenceleguery',
      description: 'Check out my GitHub repositories',
      color: 'from-gray-700 to-gray-800'
    },
    {
      name: 'Email',
      icon: '/mail_logo.png',
      url: 'mailto:maxence.leguery@ensta-paris.fr',
      display: 'maxence.leguery@ensta-paris.fr',
      description: 'Send me a direct message',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I&apos;m always excited to discuss new opportunities, collaborations, or just have a chat about technology and innovation
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={method.name}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center group hover:scale-105 border border-gray-100">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                  <div className="relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-full inline-block">
                    <Image 
                      src={method.icon} 
                      alt={method.name} 
                      width={50} 
                      height={50} 
                      className="group-hover:scale-110 transition-transform duration-200" 
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {method.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {method.description}
                </p>
                <p className="text-gray-700 font-medium mb-6 text-sm">
                  {method.display}
                </p>

                {/* Action Button */}
                {method.url && (
                  <a
                    href={method.url}
                    target={method.name === 'Email' ? '_self' : '_blank'}
                    rel={method.name === 'Email' ? undefined : 'noopener noreferrer'}
                    className={`inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${method.color} text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full`}
                  >
                    <span className="mr-2">
                      {method.name === 'Email' && '✉️'}
                      {method.name === 'LinkedIn' && '💼'}
                      {method.name === 'GitHub' && '🚀'}
                    </span>
                    {method.name === 'Email' ? 'Send Email' : `Visit ${method.name}`}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Let&apos;s Build Something Amazing Together</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re looking for a passionate engineer, have an exciting project idea, 
              or just want to discuss the latest in AI and technology, I&apos;d love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:maxence.leguery@ensta-paris.fr"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <span className="mr-2">📧</span>
                Send me an email
              </a>
              <a
                href="https://www.linkedin.com/in/maxence-leguery/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-2">💼</span>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className={`mt-16 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-gray-600">Paris, France</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
              <p className="text-gray-600">Usually within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
              <p className="text-gray-600">AI, ML, MLOps, Computer Graphics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}