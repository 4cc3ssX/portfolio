import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlogWithAuthorAndCover } from "../types/blogs";

interface BlogAuthorInfoProps {
  author: BlogWithAuthorAndCover["author"];
}

export function BlogAuthorInfo({ author }: BlogAuthorInfoProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={author.avatar?.uri} alt={author.name} />
        <AvatarFallback className="text-sm" delayMs={500}>
          {author.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{author.name}</span>
    </div>
  );
}
