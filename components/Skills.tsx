'use client';

import { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export default function Skills() {
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

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "Python", level: 95 },
        { name: "C/C++", level: 80 },
        { name: "TypeScript", level: 80 },
        { name: "Java", level: 70 },
        { name: "Rust", level: 60 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      skills: [
        { name: "PyTorch", level: 95 },
        { name: "Scikit-Learn", level: 85 },
        { name: "OpenCV", level: 80 },
        { name: "MLFlow", level: 70 }
      ]
    },
    {
      title: "Web Development",
      icon: "🌐",
      skills: [
        { name: "React", level: 75 },
        { name: "Next.js", level: 70 },
        { name: "Node.js", level: 70 },
        { name: "HTML/CSS", level: 60 }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 90 },
        { name: "Linux", level: 90 },
        { name: "CI/CD", level: 87 },
        { name: "AWS", level: 85 },
        { name: "Azure", level: 80 }
      ]
    }
  ];

  const languages = [
    { name: "French", level: "Native", flag: "🇫🇷" },
    { name: "English", level: "Fluent", flag: "🇺🇸" },
    { name: "Spanish", level: "Intermediate", flag: "🇪🇸" },
    { name: "Japanese", level: "Basic", flag: "🇯🇵" }
  ];

  const SkillBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">{category.icon}</span>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    skill={skill}
                    delay={categoryIndex * 200 + skillIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-white">Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <div
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-500 text-center group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {lang.flag}
                </div>
                <h4 className="text-white font-semibold mb-1">{lang.name}</h4>
                <p className="text-gray-400 text-sm">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Skills */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Machine Learning", "Deep Learning", "Computer Vision", "Large Language Models", "AI Engineering", "Software Architecture", "Research", "Problem Solving"
            ].map((skill, index) => (
              <span
                key={index}
                className={`px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-gray-300 hover:text-white hover:border-blue-400 transition-all duration-300 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}