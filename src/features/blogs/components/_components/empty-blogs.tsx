import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { FileText } from "lucide-react";

export function EmptyBlogs() {
  return (
    <Empty className="bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>No Blog Posts Yet</EmptyTitle>
        <EmptyDescription>
          There are no published blog posts at the moment. Check back soon for
          new articles and insights!
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
