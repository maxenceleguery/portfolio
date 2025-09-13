'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  siteUrl?: string;
  category: 'graphics' | 'ai' | 'game' | 'web';
  reference?: {
    title: string;
    url: string;
  };
}


export default function Projects() {
  const [activeAccordion, setActiveAccordion] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 'raytracer',
      title: 'C++ Raytracer Engine',
      description: 'A realistic 3D renderer with raytracing built from scratch using C++. Features CUDA acceleration for massive performance improvements and real-time rendering capabilities.',
      image: '/raytracer_card.png',
      category: 'graphics',
      features: [
        'Render triangles and polygons with triangle decomposition',
        'Bounding Volume Hierarchy (BVH) optimization',
        'Advanced material system with light emission, color, glossiness, transparency',
        'Dynamic camera with adaptable parameters (FOV, image size)',
        'SDL2 live screen with keyboard camera control',
        'PNG export functionality',
        'OBJ file format support'
      ],
      technologies: ['C++', 'CUDA', 'SDL2', 'OpenGL', 'Linear Algebra', 'Computer Graphics'],
      githubUrl: 'https://github.com/maxenceleguery/3d-render-engine'
    },
    {
      id: 'fixmatch',
      title: 'FixMatch Algorithm Implementation',
      description: 'Implementation of the FixMatch semi-supervised learning algorithm for training ML models with limited labeled data by leveraging pseudolabeling on unlabeled examples.',
      image: '/fixmatch-pseudolabel.png',
      category: 'ai',
      features: [
        'Semi-supervised learning implementation',
        'Pseudolabeling for data augmentation',
        'Consistency regularization techniques',
        'State-of-the-art performance on benchmark datasets',
        'Comprehensive evaluation metrics'
      ],
      technologies: ['Python', 'PyTorch', 'Machine Learning', 'Semi-Supervised Learning', 'Data Augmentation'],
      githubUrl: 'https://github.com/maxenceleguery/ENSTA_courses/tree/master/MI201',
      reference: {
        title: 'FixMatch: Simplifying Semi-Supervised Learning',
        url: 'https://arxiv.org/abs/2001.07685'
      }
    },
    {
      id: 'tetris',
      title: '3D Tetris Game',
      description: 'A modern 3D interpretation of the classic Tetris game, featuring enhanced graphics, smooth animations, and immersive gameplay mechanics.',
      image: '/tetris_preview.png',
      category: 'game',
      features: [
        '3D block mechanics and physics',
        'Smooth rotation and movement animations',
        'Multiple camera angles',
        'Score tracking and level progression',
        'Modern OpenGL rendering pipeline'
      ],
      technologies: ['C++', 'OpenGL', 'GLFW', 'Game Development', '3D Graphics'],
      githubUrl: 'https://github.com/maxenceleguery/tetris'
    },
    {
      id: 'tabichan',
      title: 'Tabichan, an AI-Driven Travel Planner',
      description: 'Tabichan brings your travel ideas to life. Easily find the best travel experiences by chatting with Tabichan.',
      image: '/tabichan.png',
      category: 'web',
      features: [
        "Simply ask Tabichan where you want to go, what you want to do, or even just how you're feeling.",
        "Tabichan instantly suggests unique tourist spots you've never seen before, tailored to your preferences.",
        'Choose your favorite plan, book, and enjoy the best trip ever!'
      ],
      technologies: ['Python Smolagents', 'Agentic AI', 'NextJS', 'React', 'Docker', 'AWS'],
      siteUrl: 'https://podtech-ai.com'
    },
    {
      id: 'parts_selection',
      title: 'Parts selection application',
      description: 'Leverage specialized large language models to instantly recommend optimal parts from vast component databases. Our AI agent understands your requirements and finds the perfect match.',
      image: '/parts_selection.png',
      category: 'web',
      features: [
        "Simply describe what you need in natural language. Our AI understands context and asks clarifying questions.",
        "Advanced algorithms search through multiple databases simultaneously, finding parts that match your exact specifications.",
        'Get recommendations in seconds, not hours. Our AI processes your requirements and delivers results instantly.',
        "Browse instantly though Monotaro, Castorama or SMC catalogs."
      ],
      technologies: ['Python Smolagents', 'Agentic AI', 'NextJS', 'React', 'Docker', 'AWS'],
      siteUrl: 'https://parts.podtech-ai.com/'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: '🚀' },
    { id: 'graphics', label: 'Graphics', icon: '🎨' },
    { id: 'ai', label: 'AI & ML', icon: '🤖' },
    { id: 'game', label: 'Games', icon: '🎮' },
    { id: 'web', label: 'Web', icon: '🌐' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'graphics': return 'from-pink-500 to-rose-600';
      case 'ai': return 'from-blue-500 to-indigo-600';
      case 'game': return 'from-green-500 to-emerald-600';
      case 'web': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical projects spanning graphics, AI, and software development
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${filter === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Project Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 group">
                {/* Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleAccordion(project.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(project.category)}`}>
                        <span className="text-2xl">
                          {categories.find(c => c.id === project.category)?.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mt-1">{project.description}</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${activeAccordion === project.id ? 'rotate-180' : ''
                      }`}>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 overflow-hidden ${activeAccordion === project.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="px-6 pb-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Project Image */}
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                        <div className="relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={350}
                            className="rounded-xl shadow-2xl w-full h-auto"
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-6">
                        {/* Features */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <span className="mr-2">✨</span>
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start space-x-3">
                                <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <span className="mr-2">🛠️</span>
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-gray-300 text-sm hover:border-blue-400 transition-all duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Reference */}
                        {project.reference && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                              <span className="mr-2">📚</span>
                              Reference
                            </h4>
                            <a
                              href={project.reference.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm hover:underline transition-colors duration-200"
                            >
                              {project.reference.title}
                            </a>
                          </div>
                        )}

                        {/* Action Button */}
                        {project.githubUrl && (<div className="pt-4">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            <span>View on GitHub</span>
                          </a>
                        </div>)}
                        {project.siteUrl && (<div className="pt-4">
                          <a
                            href={project.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <span>Try it yourself</span>
                          </a>
                        </div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}