import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Contact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="flex justify-center mb-4">
              <Image src="/linkedin_logo.webp" alt="LinkedIn" width={40} height={40} />
            </div>
            <a href="https://www.linkedin.com/in/maxence-leguery/" 
               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block">
              LinkedIn
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="flex justify-center mb-4">
              <Image src="/github_logo.png" alt="GitHub" width={60} height={60} />
            </div>
            <a href="https://github.com/maxenceleguery" 
               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block">
              GitHub
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="flex justify-center mb-4">
              <Image src="/mail_logo.png" alt="Email" width={40} height={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-700">maxence.leguery(at)ensta-paris.fr</p>
          </div>
        </div>
      </div>
    </section>
  );
}