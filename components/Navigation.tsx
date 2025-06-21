export default function Navigation() {
  return (
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
  );
}