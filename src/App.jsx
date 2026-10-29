// src/App.jsx
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Hackathons from "./components/Hackathons";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Involvement from "./components/Involvement";
import EventsHost from "./components/EventsHost";
import Videos from "./components/Videos";
import SocialMedia from "./components/SocialMedia";       // new social section
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import WalkingPet from "./components/WalkingPet";
import useScrollReveal from "./useScrollReveal";
import useImageLoading from "./useImageLoading";

export default function App() {
  useScrollReveal();
  useImageLoading();

  return (
    <div>
      <Preloader />
      <WalkingPet />
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Hero />
          <div className="band-dots-white">
            <Experience />
          </div>
          <div className="accent-mint">
            <Hackathons />
          </div>
          <Projects />
          <div className="band-dots-white">
            <Education />
          </div>
          <div className="band-blush">
            <Involvement />
          </div>
          <div className="band-dots-white">
            <Certifications />
          </div>
          <div className="band-mint">
            <Skills />
          </div>
          <div className="band-dots-white">
            <EventsHost />
          </div>
          <Videos />
          <SocialMedia />
          {/* Inside the main column so the sticky sidebar stays put all the way to the bottom */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
