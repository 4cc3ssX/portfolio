"use client";

import { navLinks } from "@/data/nav-links";
import { handleNavigate } from "@/utils";
import { useState } from "react";

export const useNavigation = () => {
  const [path, setPath] = useState<string>("");

  const navigate = (path: string | (typeof navLinks)[number]["name"]) => {
    const pathToNavigate =
      navLinks.find((link) => link.name.toLowerCase() === path)?.path || path;

    handleNavigate(pathToNavigate);
    setPath(pathToNavigate);
  };

  return {
    path,
    navigate,
  };
};
