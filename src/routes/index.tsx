import { createFileRoute } from "@tanstack/react-router";
import { FxProvider } from "@/components/portfolio/fx";
import { DigitalRain } from "@/components/portfolio/DigitalRain";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { TopNav } from "@/components/portfolio/TopNav";
import { Hero } from "@/components/portfolio/Hero";
import { Dashboard } from "@/components/portfolio/Dashboard";
import {
  AboutSection, SkillsSection, CertificationsSection, ProjectsSection, CtfSection, ExperienceSection, ActivitySection,
} from "@/components/portfolio/Sections";
import { ContactSection, Footer, BackToTop } from "@/components/portfolio/Contact";
import { useGsapReveal } from "@/components/portfolio/useGsapReveal";

const title = "Abaidullah // UBI.SEC — Red Team Student & Cybersecurity Portfolio";
const description =
  "Abaidullah (ubi.sec) — red team student from Faisalabad, Pakistan. Web app security, Active Directory, Python offensive tools, CTFs and certifications. Targeting eJPT.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Page() {
  useGsapReveal();
  return (
    <>
      <DigitalRain />
      <Sidebar />
      <div className="lg:pl-[210px]">
        <TopNav />
        <main>
          <Hero />
          <Dashboard />
          <AboutSection />
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection />
          <CtfSection />
          <ExperienceSection />
          <ActivitySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}

function Index() {
  return (
    <FxProvider>
      <Page />
    </FxProvider>
  );
}
