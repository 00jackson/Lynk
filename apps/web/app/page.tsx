'use client';
// import { motion } from "framer-motion";
// import Image from "next/image";
import Hero from "./sections/Hero";
import FeatureOverview from "./sections/FeatureOverview";
import ProjectMatchmaking from "./sections/ProjectMatchmaking";
import MicroCoaching from "./sections/MicroCoaching";
import SkillTrackingSection from "./sections/SkillTracking";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureOverview />
      <ProjectMatchmaking/>
      <MicroCoaching/>
      <SkillTrackingSection/>
    </main>
  );
}