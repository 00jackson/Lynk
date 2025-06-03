'use client';
// import { motion } from "framer-motion";
// import Image from "next/image";
import Hero from "./sections/Hero";
import FeatureOverview from "./sections/FeatureOverview";
import ProjectMatchmaking from "./sections/ProjectMatchmaking";
import MicroCoaching from "./sections/MicroCoaching";
import SkillTrackingSection from "./sections/SkillTracking";
// import HowItWorks from "./sections/HowItWorks";
import FAQSection from "./sections/FAQsection";
import PremiumSection from "./sections/PremiumSection";
import { Footer } from "./sections/Footer";
// import LiveUsers from "./sections/LiveUsers";
// import TechStack from "./sections/TechStack";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureOverview />
      <ProjectMatchmaking/>
      <MicroCoaching/>
      <SkillTrackingSection/>
      <PremiumSection/>
      <FAQSection/>
      <Footer/>
    </main>
  );
}