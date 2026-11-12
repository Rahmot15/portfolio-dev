import { profile, socials } from "@/data/profile";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "MD Rahmatullah",
  jobTitle: profile.role,
  description:
    "Full-stack web developer based in Bangladesh, building responsive applications with Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.institution,
  },
  knowsAbout: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "MongoDB", "REST APIs"],
  sameAs: socials.filter(({ label }) => label !== "WhatsApp").map(({ href }) => href),
};

export default function PersonJsonLd() {
  const json = JSON.stringify(person).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
