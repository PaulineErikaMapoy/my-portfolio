// src/App.jsx
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Involvement from "./components/Involvement";
import EventsHost from "./components/EventsHost";
import SocialMedia from "./components/SocialMedia";       // new social section
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import useScrollReveal from "./useScrollReveal";

export default function App() {
  useScrollReveal();

  return (
    <div>
      <Preloader />
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Hero />
          <div className="band-dots-white">
            <Experience />
          </div>
          <div className="band-dots">
            <Certifications />
          </div>
          <div className="band-dots-white">
            <Skills />
          </div>
          <div className="band-blush">
            <Involvement />
          </div>
          <div className="band-dots-white">
            <EventsHost />
          </div>
          <SocialMedia />
        </main>
      </div>
      <Footer />
    </div>
  );
}
