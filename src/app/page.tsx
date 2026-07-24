import { SiteHeader } from "@/components/layout/SiteHeader";
import { InformationLandscapeMotion } from "@/components/motion/InformationLandscapeMotion";
import { Hero } from "@/components/sections/Hero";
import { InformationLandscape } from "@/components/sections/InformationLandscape";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <InformationLandscapeMotion>
          <Hero />
          <InformationLandscape />
        </InformationLandscapeMotion>
      </main>
    </>
  );
}
