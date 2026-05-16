'use client';

import { useInView } from '@/components/hooks/useInView';
import {
  SKILL_CATEGORIES,
  LANGUAGES,
  ADDITIONAL_SKILLS,
} from '@/lib/data';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export default function Skills() {
  const [sectionRef, isVisible] = useInView<HTMLElement>(0.3);

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
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4" aria-hidden="true">{category.icon}</span>
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
            {LANGUAGES.map((lang, index) => (
              <div
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-500 text-center group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
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
            {ADDITIONAL_SKILLS.map((skill, index) => (
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