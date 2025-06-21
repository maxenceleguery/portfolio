import Image from "next/image";

interface AboutProps {
  age: number;
}

export default function About({ age }: AboutProps) {
  const personalInfo = [
    { label: "Name", value: "Maxence Leguéry", icon: "👤" },
    { label: "Age", value: age.toString(), icon: "🎂" },
    { label: "Occupation", value: "Engineering Student", icon: "🎓" },
    { label: "Location", value: "Paris, France", icon: "📍" },
  ];

  const education = [
    {
      period: "2021 - 2025",
      title: "Master of Science in Engineering",
      institution: "ENSTA Paris, Palaiseau, France",
      description: "Top 10 Graduate school of engineering in France. Specialization in computer science with focus on PyTorch, OpenCV, Machine Learning, and Deep Learning.",
      link: "https://www.ensta-paris.fr/"
    },
    {
      period: "2019 - 2021",
      title: "CPGE PTSI-PT*",
      institution: "Lycée Gustave Eiffel, Bordeaux, France",
      description: "Advanced Physics and Mathematics Class. 2 years of intense preparation for application to graduate schools."
    },
    {
      period: "2016 - 2019",
      title: "Baccalauréat S",
      institution: "Lycée Fernand Daguin, Mérignac, France",
      description: "French national academic qualification after secondary education. Graduated with honor."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Passionate about creating innovative solutions through technology and continuous learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-700 p-1 rounded-2xl">
                <Image 
                  src="/about.png" 
                  alt="Maxence Leguéry" 
                  width={350} 
                  height={450} 
                  className="rounded-xl shadow-2xl" 
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Personal Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.map((info, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{info.icon}</span>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-semibold">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Introduction */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a passionate engineering student at{' '}
                <a href="https://www.ensta-paris.fr/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-400/30 hover:decoration-blue-400">
                  ENSTA Paris
                </a>
                , specializing in computer science and machine learning. My journey combines theoretical knowledge with practical applications, 
                focusing on developing innovative AI solutions for real-world challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Education</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative flex items-start space-x-8">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 flex justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 shadow-lg"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                        {edu.title}
                      </h4>
                      <span className="text-blue-400 font-semibold bg-blue-400/10 px-3 py-1 rounded-full text-sm">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-300 font-medium mb-2">
                      {edu.link ? (
                        <a href={edu.link} className="hover:text-blue-400 transition-colors duration-200">
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </p>
                    <p className="text-gray-400 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}