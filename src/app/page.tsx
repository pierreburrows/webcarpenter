import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedProjects from "@/components/FeaturedProjects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site, reviews, services, positioning } from "@/lib/site";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: positioning.sub,
    url: site.url,
    telephone: "+447710124265",
    email: site.email,
    image: `${site.url}/opengraph-image`,
    // TODO: fill in once Antony confirms the town and area covered.
    address: { "@type": "PostalAddress", addressCountry: "GB" },
    areaServed: site.area,
    priceRange: "££",
    knowsAbout: services.map((s) => s.name),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <FeaturedProjects />
        <Process />
        <Services />
        <ProjectGrid />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
