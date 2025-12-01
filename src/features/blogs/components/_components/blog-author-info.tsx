import Image from "next/image";
import type { BlogWithAuthorAndCover } from "../../types/blogs";

interface BlogAuthorInfoProps {
  author: BlogWithAuthorAndCover["author"];
}

export function BlogAuthorInfo({ author }: BlogAuthorInfoProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-2">
      {author.avatar ? (
        <Image
          src={author.avatar.uri}
          alt={author.name}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-medium">
            {author.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="text-sm font-medium">{author.name}</span>
    </div>
  );
}
