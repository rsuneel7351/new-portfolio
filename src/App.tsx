import { MotionConfig } from 'framer-motion';
import { Backdrop } from './components/Backdrop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="selection:bg-primary/50 selection:text-white">
        <Backdrop />
        <div className="scanline"></div>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
