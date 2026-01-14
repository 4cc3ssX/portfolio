"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { INavLink, navLinks } from "@/data/nav-links";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { AssetImages } from "@/assets/images";
import { MotionWrapper } from "@/features/shared";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { path, navigate } = useNavigation({
    scrollOnMount: true,
  });

  const onClickLink = (link: INavLink) => {
    navigate(link.path);
    setIsOpen(false);
    sendEvent(AnalyticsEvent.PAGE_VIEW, {
      name: link.name,
    });
  };

  return (
    <MotionWrapper
      as="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 bottom-auto z-50"
    >
      {/* Desktop Navigation */}
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:h-16">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => onClickLink({ name: "Home", path: "/" })}
          className="relative z-50 flex items-center gap-2"
        >
          <Image
            alt="Logo"
            src={AssetImages.logo}
            priority
            width={24}
            height={24}
            className="size-6"
          />
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = link.path === path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => onClickLink(link)}
                className={cn(
                  "relative text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 h-px w-full bg-foreground"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative z-50 h-8 w-8 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <X className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <Menu className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = link.path === path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.15 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => onClickLink(link)}
                      className={cn(
                        "text-xl font-medium transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/60"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionWrapper>
  );
}
