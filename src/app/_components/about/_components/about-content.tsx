import MotionWrapper from "@/app/_components/motion-wrapper";

export function AboutContent() {
  return (
    <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-5 md:px-6">
      <div className="flex flex-col gap-y-1">
        <h1 className="font-medium text-2xl sm:text-3xl">About</h1>
      </div>
      <div className="flex flex-col gap-5">
        <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left text-md whitespace-pre-line hyphens-auto text-justify">
          Ryam is a dynamic software engineer with{" "}
          <span className="text-blue-500">5 years of experience</span>{" "}
          building scalable, event-driven systems. Specializing in{" "}
          <span className="text-blue-500">NestJS</span>,{" "}
          <span className="text-blue-500">Next.js</span>,{" "}
          <span className="text-blue-500">MongoDB</span>, and{" "}
          <span className="text-blue-500">AWS</span>, he excels at breaking
          down complex challenges and delivering clean, reliable, and
          high-impact solutions. His expertise extends to architecting
          distributed workflows with message brokers like{" "}
          <span className="text-blue-500">Kafka</span> and{" "}
          <span className="text-blue-500">BullMQ</span>, and automating
          processes with <span className="text-blue-500">n8n</span> to boost
          system efficiency and resilience.
        </p>
        <p className="text-md whitespace-pre-line hyphens-auto text-justify">
          With proven success leading backend migrations and optimizing
          performance for high-traffic applications, Ryam ships seamless web
          and mobile experiences using{" "}
          <span className="text-blue-500">React</span>,{" "}
          <span className="text-blue-500">React Native</span>, and{" "}
          <span className="text-blue-500">TypeScript</span>. As an active
          open-source contributor, he&apos;s passionate about clean
          architecture, exceptional user experience, and modern full-stack
          engineering. Collaborative, adaptable, and driven by solving real
          problems with precision and innovation, Ryam continues to push the
          boundaries of what&apos;s possible in software engineering.
        </p>
      </div>
    </MotionWrapper>
  );
}
