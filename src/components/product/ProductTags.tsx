import { Badge } from "../ui/badge";

export default function ProductTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div>
      <h3 className="font-semibold mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
