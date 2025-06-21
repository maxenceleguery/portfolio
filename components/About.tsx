import Image from "next/image";

interface AboutProps {
  age: number;
}

export default function About({ age }: AboutProps) {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center">
            <Image src="/about.png" alt="Maxence Leguéry" width={300} height={400} className="rounded-lg" />
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
  );
}