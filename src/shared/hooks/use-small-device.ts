"use client";

import { useMediaQuery } from "usehooks-ts";

export const useSmallDevice = () =>
  useMediaQuery("only screen and (max-width: 600px)");
