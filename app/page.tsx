'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

interface Paper {
  title: string;
  authors: string[];
  summary: string;
  link: string;
  publishedDate: string;
}

export default function Home() {
  const [age, setAge] = useState<number>(0);
  const [activeAccordion, setActiveAccordion] = useState<string>('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAge = (birthDate: string) => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    };

    setAge(getAge('2001-09-23'));

    // Fetch ArXiv papers
    const fetchArxivPapers = async () => {
      try {
        const query = 'au:Maxence Leguery';
        const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=10`;
        
        const response = await fetch(url);
        const xmlText = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const entries = xmlDoc.getElementsByTagName('entry');
        const paperList: Paper[] = [];
        
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const title = entry.getElementsByTagName('title')[0]?.textContent || '';
          const summary = entry.getElementsByTagName('summary')[0]?.textContent || '';
          const authors = entry.getElementsByTagName('author');
          const authorsList: string[] = [];
          
          for (let index = 0; index < authors.length; index++) {
            const authorName = authors[index].getElementsByTagName('name')[0]?.textContent?.trim();
            if (authorName) {
              authorsList.push(authorName);
            }
          }
          
          // Only include papers where Maxence Leguéry is an author
          if (authorsList.some(author => author.includes('Maxence Leguéry') || author.includes('Maxence Leguery'))) {
            const link = entry.getElementsByTagName('id')[0]?.textContent || '';
            const publishedDate = entry.getElementsByTagName('published')[0]?.textContent || '';
            
            paperList.push({
              title: title.replace(/\s+/g, ' ').trim(),
              authors: authorsList,
              summary: summary.replace(/\s+/g, ' ').trim(),
              link: link,
              publishedDate: new Date(publishedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            });
          }
        }
        
        setPapers(paperList);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArxivPapers();
  }, []);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="font-sans bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-10 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold">Maxence Leguéry</a>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-white hover:text-blue-400">Home</a>
            <a href="#about" className="text-white hover:text-blue-400">About</a>
            <a href="#experiences" className="text-white hover:text-blue-400">Experiences</a>
            <a href="#skills" className="text-white hover:text-blue-400">Skills</a>
            <a href="#projects" className="text-white hover:text-blue-400">Projects</a>
            <a href="#papers" className="text-white hover:text-blue-400">Papers</a>
            <a href="#contact" className="text-white hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background.jpg)' }}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I am Maxence Leguéry</h1>
          <p className="text-xl md:text-2xl">I am a french engineering student specialized in computer science</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex justify-center">
              <Image src="/nextjs-github-pages/about.png" alt="Maxence Leguéry" width={300} height={400} className="rounded-lg" />
            </div>
            <div className="text-white space-y-6">
              <div className="space-y-2">
                <p><strong>Name:</strong> Maxence Leguéry</p>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Occupation:</strong> Engineering student in computer science</p>
                <p><strong>University:</strong> <a href="https://www.ensta-paris.fr/" className="text-blue-400 hover:underline">ENSTA Paris</a></p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400">Education</h3>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <div className="text-gray-400 text-sm">2021 - 2024</div>
                  <h4 className="text-xl font-semibold">Master of science in engineering</h4>
                  <p className="text-gray-300">ENSTA Paris, Palaiseau, France</p>
                  <p className="mt-2">
                    Top 10 Graduate school of engineering in France<br/>
                    Multiple courses: Sciences, language, economics, culture<br/>
                    Specialization in computer science (Pytorch, OpenCV, Machine Learning, Deep Learning)
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6">
                  <div className="text-gray-400 text-sm">2019 - 2021</div>
                  <h4 className="text-xl font-semibold">CPGE PTSI-PT*</h4>
                  <p className="text-gray-300">Lycée Gustave Eiffel, Bordeaux, France</p>
                  <p className="mt-2">
                    Advanced Physics and Mathematics Class<br/>
                    2 years of intense preparation for application to graduate schools
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6">
                  <div className="text-gray-400 text-sm">2016 - 2019</div>
                  <h4 className="text-xl font-semibold">Baccalauréat S</h4>
                  <p className="text-gray-300">Lycée Fernand Daguin, Mérignac, France</p>
                  <p className="mt-2">
                    French national academic qualification after secondary education<br/>
                    Graduated with honor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Professional Experiences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Engineer Internship in Deep Learning</h3>
              <p className="text-gray-600 mb-4">
                <a href="https://www.visionairy.io/" className="hover:underline">Visionairy</a> | February 2024 - August 2024
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Implemented AI solutions for anomaly detection in industrial environments.</li>
                <li>• Deployed machine learning models in production using Docker and Azure.</li>
                <li>• Collaborated with cross-functional teams to ensure smooth integration and continuous improvement of AI systems.</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Research Internship in Deep Learning</h3>
              <p className="text-gray-600 mb-4">
                <a href="https://u2is.ensta-paris.fr/?lang=en" className="hover:underline">U2IS Laboratory, ENSTA Paris</a> | September 2023 - February 2024
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Conducted research on uncertainty estimation to mitigate overconfident AI model predictions.</li>
                <li>• Collaborated with a teacher-researcher, resulting in a paper submitted to CVPR.</li>
                <li>• Contributed to advancing deep learning techniques for robust and reliable AI models.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Programming Languages</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Python</li>
                <li>C/C++</li>
                <li>JavaScript</li>
                <li>Java</li>
                <li>Rust</li>
                <li>MatLab</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Deep Learning & AI Tools</h3>
              <ul className="space-y-2 text-gray-700">
                <li>PyTorch</li>
                <li>Scikit-Learn</li>
                <li>OpenCV</li>
                <li>TensorFlow/Keras</li>
                <li>MLFlow</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Web Development</h3>
              <ul className="space-y-2 text-gray-700">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Next.js</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <Image src="/nextjs-github-pages/linux_logo.png" alt="Linux" width={50} height={50} />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">Tools & Technologies</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Git</li>
                <li>Docker</li>
                <li>Linux</li>
                <li>Azure</li>
                <li>CI/CD (GitHub Actions)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Languages</h3>
              <ul className="space-y-2 text-gray-700">
                <li>French (Native)</li>
                <li>English (Fluent)</li>
                <li>Spanish (Basic-Intermediate)</li>
                <li>Japanese (Basic)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Projects</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left bg-gray-300 hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                onClick={() => toggleAccordion('raytracer')}
              >
                C++ Raytracer
              </button>
              {activeAccordion === 'raytracer' && (
                <div className="p-6 bg-white">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Image src="/nextjs-github-pages/raytracer_card.png" alt="C++ Raytracer" width={400} height={300} className="rounded-lg" />
                    <div>
                      <p className="mb-4">
                        Using C++, I developed my own realistic 3D renderer with raytracing. I used Nvidia CUDA to massively accelerated calculations.
                      </p>
                      <h4 className="font-bold mb-2">Features:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Can render triangles and polygons decomposable in triangles</li>
                        <li>• Bounding volume hierarchy (BVH)</li>
                        <li>• Material: support light emission, color, glossiness, transparency</li>
                        <li>• Moving camera and adaptable parameters (fov, image size)</li>
                        <li>• SDL2 live screen with keyboard control of the camera</li>
                        <li>• Exportation in PNG format</li>
                        <li>• Support simple OBJ objects</li>
                      </ul>
                      <div className="mt-4">
                        <a href="https://github.com/maxenceleguery/3d-render-engine" 
                           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left bg-gray-300 hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                onClick={() => toggleAccordion('fixmatch')}
              >
                FixMatch Algorithm
              </button>
              {activeAccordion === 'fixmatch' && (
                <div className="p-6 bg-white">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Image src="/nextjs-github-pages/fixmatch-pseudolabel.png" alt="FixMatch Algorithm" width={400} height={300} className="rounded-lg" />
                    <div>
                      <p className="mb-4">
                        FixMatch is a semi-supervised machine learning algorithm aiming to train a ML model using a small amount of labelized examples by pseudolabeling many unlabelized examples to extend the train dataset.
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <a href="https://arxiv.org/abs/2001.07685" className="text-blue-600 hover:underline">Kihyuk Sohn and al.</a> 2020. FixMatch: simplifying semi-supervised learning with consistency and confidence.
                      </p>
                      <div className="mt-4">
                        <a href="https://github.com/maxenceleguery/ENSTA_courses/tree/master/MI201" 
                           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left bg-gray-300 hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                onClick={() => toggleAccordion('tetris')}
              >
                3D Tetris
              </button>
              {activeAccordion === 'tetris' && (
                <div className="p-6 bg-white">
                  <p className="mb-4">
                    3D version of the famous game: Tetris. Written in C++ using OpenGL.
                  </p>
                  <div className="mt-4">
                    <a href="https://github.com/maxenceleguery/tetris" 
                       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                      View Project
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Papers Section */}
      <section id="papers" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Scientific Papers</h2>
          
          {loading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading papers from ArXiv...</p>
            </div>
          ) : papers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {papers.map((paper, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">
                    <a href={paper.link} target="_blank" className="hover:underline" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Authors:</strong> {paper.authors.join(', ')}
                  </p>
                  <p className="text-gray-500 mb-4">
                    <strong>Published:</strong> {paper.publishedDate}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {paper.summary.length > 300 
                      ? `${paper.summary.substring(0, 300)}...` 
                      : paper.summary
                    }
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white">
              <p className="text-lg mb-4">No papers found on ArXiv at the moment.</p>
              <p className="text-gray-400">Papers will appear here automatically when published on ArXiv.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Contact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="flex justify-center mb-4">
                <Image src="/nextjs-github-pages/linkedin_logo.webp" alt="LinkedIn" width={40} height={40} />
              </div>
              <a href="https://www.linkedin.com/in/maxence-leguery/" 
                 className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block">
                LinkedIn
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="flex justify-center mb-4">
                <Image src="/nextjs-github-pages/github_logo.png" alt="GitHub" width={60} height={60} />
              </div>
              <a href="https://github.com/maxenceleguery" 
                 className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block">
                GitHub
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="flex justify-center mb-4">
                <Image src="/nextjs-github-pages/mail_logo.png" alt="Email" width={40} height={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">maxence.leguery(at)ensta-paris.fr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center py-4">
        <p>© Maxence Leguéry 2024</p>
      </footer>
    </div>
  );
}
