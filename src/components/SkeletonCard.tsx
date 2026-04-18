export default function SkeletonCard() {
  return (
    <>
      <div className="aspect-[4/5] bg-surface-container-high animate-pulse" />
      <div className="p-6 bg-surface-container-low border-t border-outline-variant/10">
        <div className="h-8 bg-surface-container-high animate-pulse w-3/4 mb-3" />
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <div className="h-5 bg-surface-container-high animate-pulse w-16" />
            <div className="h-5 bg-surface-container-high animate-pulse w-20" />
          </div>
          <div className="h-5 w-5 bg-surface-container-high animate-pulse" />
        </div>
      </div>
    </>
  );
}