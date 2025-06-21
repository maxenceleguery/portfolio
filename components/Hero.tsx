export default function Hero() {
  return (
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
  );
}