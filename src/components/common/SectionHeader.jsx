function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 md:mb-6">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] uppercase tracking-[0.32em] text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-xl font-bold md:text-3xl">{title}</h2>
        {description ? <p className="mt-1 max-w-xl text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
