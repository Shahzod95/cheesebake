import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

export const Logo = ({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => {
  const { t } = useLanguage();

  return (
    <div className={cn("inline-flex flex-col items-center justify-center leading-none", className)}>
      <span className="font-serif italic text-[10px] tracking-[0.3em] uppercase text-current/70 mb-1">
        Maison
      </span>
      <span
        className={cn(
          "font-serif tracking-[0.22em] uppercase text-current leading-none",
          compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
        )}
      >
        Cheesebake
      </span>
      <span className="mt-1.5 h-px w-6 bg-current/40" aria-hidden />
      <span className="mt-1.5 text-[9px] font-light tracking-[0.35em] uppercase text-current/60">
        {t.logoTagline}
      </span>
    </div>
  );
};
