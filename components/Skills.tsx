import Image from "next/image";

export default function Skills() {
  return (
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
              <Image src="/linux_logo.png" alt="Linux" width={50} height={50} />
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
  );
}