import "server-only";

import { cache } from "react";
import type { Experience, Project, Technology } from "@/payload-types";
import { getPayloadClient } from "./client";

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    sort: ["order", "-startedAt"],
    depth: 2,
    limit: 200,
    trash: false,
  });
  return docs;
});

export const getFeaturedProjects = cache(async (limit = 4): Promise<Project[]> => {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
});

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experiences",
    sort: "-startedAt",
    depth: 2,
    limit: 100,
    trash: false,
  });
  return docs;
});

/** Technologies shown in the home-page marquee, strongest first. */
export const getFeaturedTechnologies = cache(async (): Promise<Technology[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "technologies",
    where: { featured: { equals: true } },
    sort: ["-proficiency", "name"],
    depth: 0,
    limit: 100,
  });
  return docs;
});
