export default function Experiences() {
  return (
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
  );
}