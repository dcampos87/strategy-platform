interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-red-600 mb-3">
      {children}
    </p>
  );
}
