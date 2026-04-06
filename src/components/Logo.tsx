import { cn } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

export const Logo = ({ className }: { className?: string }) => {
  const { t } = useLanguage();
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <span className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-current leading-none">
        Cheesebake
      </span>
      <span className="text-[10px] md:text-xs font-light tracking-[0.15em] text-current opacity-80 mt-1 lowercase leading-none">
        {t.logoTagline}
      </span>
    </div>
  );
};
