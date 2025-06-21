import Image from "next/image";

interface ProjectsProps {
  activeAccordion: string;
  toggleAccordion: (id: string) => void;
}

export default function Projects({ activeAccordion, toggleAccordion }: ProjectsProps) {
  return (
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
                  <Image src="/raytracer_card.png" alt="C++ Raytracer" width={400} height={300} className="rounded-lg" />
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
                  <Image src="/fixmatch-pseudolabel.png" alt="FixMatch Algorithm" width={400} height={300} className="rounded-lg" />
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
  );
}