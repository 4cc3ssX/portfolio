import Image from "next/image";
import type { ImageSelect } from "@/features/shared/types/images";

interface BlogCoverImageProps {
  cover: ImageSelect;
  title: string;
}

export function BlogCoverImage({ cover, title }: BlogCoverImageProps) {
  return (
    <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
      <Image
        src={cover.uri}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
