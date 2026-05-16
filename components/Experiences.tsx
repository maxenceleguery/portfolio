'use client';

import { useInView } from '@/components/hooks/useInView';
import { EXPERIENCES } from '@/lib/data';

export default function Experiences() {
  const [sectionRef, isVisible] = useInView<HTMLElement>(0.2);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship': return '💼';
      case 'research': return '🔬';
      case 'project': return '🚀';
      default: return '💡';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'from-green-500 to-emerald-600';
      case 'research': return 'from-blue-500 to-indigo-600';
      case 'project': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section ref={sectionRef} id="experiences" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My journey through internships and research positions in AI and computer science
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10"></div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:mr-8' : 'md:pl-1/2 md:ml-8'}`}>
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group hover:scale-[1.02]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getTypeIcon(exp.type)}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-gray-700">
                            {exp.companyUrl ? (
                              <a 
                                href={exp.companyUrl} 
                                className="hover:text-blue-600 transition-colors duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {exp.company}
                              </a>
                            ) : (
                              exp.company
                            )}
                          </p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} text-white text-sm font-medium`}>
                        {exp.period}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-500">📍</span>
                      <span className="text-gray-600 font-medium">{exp.location}</span>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <ul className="space-y-3">
                        {exp.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start space-x-3">
                            <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}