"use client";

import { navLinks } from "@/data/nav-links";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UseNavigationOptions {
  scrollOnMount?: boolean;
}

export const useNavigation = ({
  scrollOnMount = false,
}: UseNavigationOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<string>(pathname);

  const navigate = useCallback(
    (path: string | (typeof navLinks)[number]["name"]) => {
      router.push(path);
      setPath(path);
    },
    [router]
  );

  useEffect(() => {
    const pathWithHash = pathname + window.location.hash;
    if (!pathWithHash.includes("#") || !scrollOnMount) {
      return;
    }

    const timeoutId = setTimeout(() => {
      navigate(pathWithHash);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [navigate, pathname, scrollOnMount]);

  return {
    path,
    navigate,
  };
};
