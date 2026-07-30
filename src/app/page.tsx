import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutMotion } from "@/components/motion/AboutMotion";
import { CapabilitiesMotion } from "@/components/motion/CapabilitiesMotion";
import { CompletionMotion } from "@/components/motion/CompletionMotion";
import { InformationLandscapeMotion } from "@/components/motion/InformationLandscapeMotion";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Demonstration } from "@/components/sections/Demonstration";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { InformationLandscape } from "@/components/sections/InformationLandscape";
import { Method } from "@/components/sections/Method";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <InformationLandscapeMotion>
          <Hero />
          <InformationLandscape />
        </InformationLandscapeMotion>
        <CapabilitiesMotion>
          <Capabilities />
        </CapabilitiesMotion>
        <CompletionMotion>
          <Demonstration />
          <Method />
          <AboutMotion>
            <About />
          </AboutMotion>
          <FinalCta />
        </CompletionMotion>
      </main>
      <SiteFooter />
    </>
  );
}
