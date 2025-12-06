"use client";

import { INavLink, navLinks } from "@/data/nav-links";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AssetImages } from "@/assets/images";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"), { ssr: false });

interface Props {}

export const Header = ({}: Props) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width: 600px)");

  const [isOpen, setOpen] = useState(false);
  const { path, navigate } = useNavigation({
    scrollOnMount: true,
  });

  const onClickLink = (link: INavLink) => {
    navigate(link.path);
    setOpen(false);

    sendEvent(AnalyticsEvent.PAGE_VIEW, {
      name: link.name,
    });
  };

  return (
    <motion.header
      initial={{ y: -64, top: 0, opacity: 0 }}
      animate={{
        y: 0,
        top: isSmallDevice ? 0 : 12,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeIn",
        top: {
          delay: 1,
        },
      }}
      className={`fixed inset-x-0 z-40 sm:px-8`}
    >
      <nav className="max-w-full sm:max-w-5xl sm:mx-auto">
        <motion.div
          initial={{ borderColor: "hsl(0 0% 0%)" }}
          animate={{
            borderColor: "var(--border)",
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.8,
          }}
          className={cn(
            isOpen ? "h-screen" : "h-16",
            "w-full relative sm:h-13 md:w-auto md:border md:border-muted md:rounded-4xl bg-background/20 backdrop-blur-lg md:backdrop-blur-sm flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 py-2.5 transition-all duration-200 ease-out"
          )}
        >
          <div
            className={cn(
              "mt-1 flex flex-row justify-between items-center w-full md:w-auto"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              onClick={() => onClickLink({ name: "Home", path: "/" })}
              className="flex items-center"
            >
              <Image
                alt="Logo"
                src={AssetImages.logo}
                priority
                width={32}
                height={32}
                className="size-8 sm:size-7 text-primary rounded-md"
              />
              <span className="sr-only">Go to home</span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              title="Open Menu"
              onClick={() => setOpen(!isOpen)}
            >
              <AnimatePresence initial={false} mode="sync">
                {isOpen ? (
                  <X size={20} className="text-white active:text-primary" />
                ) : (
                  <Menu size={20} className="text-white active:text-primary" />
                )}
              </AnimatePresence>
              <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
            </Button>
          </div>
          <div
            className={cn(
              !isOpen && "hidden",
              "md:block",
              isOpen &&
                "flex-1 md:flex-none flex flex-col justify-center self-stretch"
            )}
            onClick={() => setOpen(false)}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
              {navLinks.map((link, index) => {
                const isActive = link.path === path;
                return (
                  <React.Fragment key={link.name}>
                    <div className="relative flex flex-col items-center">
                      <Link
                        href={link.path}
                        className={cn(
                          "font-medium text-xl sm:text-sm transition-colors",
                          isActive ? "text-white" : "text-muted-foreground"
                        )}
                        onClick={() => onClickLink(link)}
                      >
                        {link.name}
                        <span className="sr-only">Navigate to {link.name}</span>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};
