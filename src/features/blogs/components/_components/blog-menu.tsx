"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link as LinkIcon, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { BlogWithAuthorAndCover } from "../../types/blogs";

interface BlogMenuProps {
  blog: BlogWithAuthorAndCover;
}

export function BlogMenu({ blog }: BlogMenuProps) {
  const handleCopyLink = async () => {
    const url = `${window.location.origin}/blog/${blog.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={handleCopyLink}>
          <LinkIcon className="size-3" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
