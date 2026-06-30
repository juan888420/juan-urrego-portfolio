import { cn } from "@/lib/utils";

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-12 border-t border-white/5 bg-black",
        className
      )}
    />
  );
}