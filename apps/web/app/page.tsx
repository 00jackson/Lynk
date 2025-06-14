'use client';
import { useState, useEffect, Suspense } from 'react';
import Loading from '@/components/Loading';
import Hero from "./sections/Hero";
import Testimonials from './sections/Testimonials';
import FeatureOverview from './Features/page';
import FAQSection from './FAQ/page';

import MicroCoaching from './sections/MicroCoaching';
import PremiumSection from './Pricing/page';
import ProjectMatchmaking from './Community/page';
import SkillTrackingSection from './sections/SkillTracking';
import { Footer } from './sections/Footer'
// import DocsPage from './docs/page';
// ... other imports

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with actual loading logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="gap-10">
      <Suspense fallback={<Loading />}>
        <Hero />
        {/* <DocsPage /> */}
        <Testimonials />
        <FeatureOverview />
        <ProjectMatchmaking />2
        <MicroCoaching />
        <SkillTrackingSection />
        <PremiumSection />
        <FAQSection />
        <Footer />
      </Suspense>
    </main>
  );
}