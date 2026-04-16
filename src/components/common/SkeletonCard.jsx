function SkeletonCard() {
  return (
    <div className="glass-panel animate-pulse rounded-[28px] p-3">
      <div className="mb-3 h-56 rounded-[24px] bg-white/6" />
      <div className="mb-2 h-4 w-2/3 rounded-full bg-white/8" />
      <div className="mb-4 h-3 w-full rounded-full bg-white/6" />
      <div className="flex gap-2">
        <div className="h-9 w-9 rounded-full bg-white/6" />
        <div className="h-9 w-9 rounded-full bg-white/6" />
        <div className="h-9 w-9 rounded-full bg-white/6" />
      </div>
    </div>
  );
}

export default SkeletonCard;
