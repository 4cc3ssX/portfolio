import { FC, SVGProps } from "react";

import ApacheKafka from "./apachekafka.svg";
import Express from "./express.svg";
import MongoDB from "./mongodb.svg";
import PostgreSQL from "./postgresql.svg";
import Supabase from "./supabase.svg";
import CPlusPlus from "./cplusplus.svg";
import Firebase from "./firebase.svg";
import Kotlin from "./kotlin.svg";
import NestJS from "./nestjs.svg";
import Prisma from "./prisma.svg";
import Swift from "./swift.svg";
import Drizzle from "./drizzle.svg";
import GitHub from "./github.svg";
import LinkedIn from "./linkedin.svg";
import NextJS from "./nextdotjs.svg";
import React from "./react.svg";
import TypeScript from "./typescript.svg";
import Socketio from "./socketdotio.svg";
import Amazon from "./amazon.svg";
import Docker from "./docker.svg";
import Kubernetes from "./kubernetes.svg";
import Terraform from "./terraform.svg";

export type IconName =
  | "kafka"
  | "expressjs"
  | "mongodb"
  | "postgresql"
  | "supabase"
  | "cplusplus"
  | "firebase"
  | "kotlin"
  | "nestjs"
  | "prisma"
  | "swift"
  | "drizzle"
  | "github"
  | "linkedin"
  | "nextjs"
  | "react"
  | "typescript"
  | "socketio"
  | "aws"
  | "docker"
  | "kubernetes"
  | "terraform";

export const icons: Record<IconName, FC<SVGProps<SVGElement>>> = {
  kafka: ApacheKafka,
  expressjs: Express,
  mongodb: MongoDB,
  postgresql: PostgreSQL,
  supabase: Supabase,
  cplusplus: CPlusPlus,
  firebase: Firebase,
  kotlin: Kotlin,
  nestjs: NestJS,
  prisma: Prisma,
  swift: Swift,
  drizzle: Drizzle,
  github: GitHub,
  linkedin: LinkedIn,
  nextjs: NextJS,
  react: React,
  typescript: TypeScript,
  socketio: Socketio,
  aws: Amazon,
  docker: Docker,
  kubernetes: Kubernetes,
  terraform: Terraform,
};
