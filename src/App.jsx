// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import EventsHost from "./components/EventsHost";
import SocialMedia from "./components/SocialMedia";       // new social section
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="text-gray-800">
      <Navbar />
      <Hero />
      <AboutMe />
      <Certifications />
      <Skills />
      <EventsHost />
      <SocialMedia />
      <Footer />
    </div>
  );
}
