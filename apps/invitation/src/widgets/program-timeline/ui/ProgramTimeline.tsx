import type { ProgramItem } from "@wedding/entity-wedding";

type ProgramTimelineProps = {
  items: ProgramItem[];
};

export function ProgramTimeline({ items }: ProgramTimelineProps) {
  return (
    <ol className="mt-8 space-y-4 text-left max-w-md mx-auto">
      {items.map((item) => (
        <li
          key={`${item.time}-${item.title}`}
          className="flex gap-4 border-l-2 border-rose-200 pl-4"
        >
          <span className="font-medium text-rose-700 shrink-0 w-12">
            {item.time}
          </span>
          <div>
            <p className="font-medium text-rose-900">{item.title}</p>
            {item.description && (
              <p className="text-sm text-rose-600 mt-0.5">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
