export const configs = {
  url:
    process.env.NODE_ENV === "production"
      ? `https://ryamjs.dev`
      : `http://localhost:3000`,
  name: "Ryam",
  title: "Ryam - Software Engineer",
  description:
    "Dynamic Software Engineer with 5 years of experience building scalable, event-driven systems using NestJS, Next.js, MongoDB, and AWS. Strong problem solver with a knack for breaking down complex challenges and delivering clean, reliable, and high-impact solutions. Skilled in architecting distributed workflows with message brokers and automating processes with n8n to boost system efficiency and resilience.",
  keywords: [
    "Software Engineer",
    "Full Stack Engineer",
    "Backend Engineer",
    "Frontend Engineer",
    "NestJS",
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Supabase",
    "AWS",
    "Event-Driven Architecture",
    "Message Brokers",
    "n8n",
    "Scalable Systems",
    "Distributed Systems",
    "Open Source",
    "Clean Architecture",
    "Ryam",
  ],
  author: {
    name: "Ryam",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ryam Portfolio",
  },
};
