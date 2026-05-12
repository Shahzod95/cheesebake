type IngredientProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Berry({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <radialGradient id="berry-g" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F8C0AA" />
          <stop offset="35%" stopColor="#C75A4A" />
          <stop offset="100%" stopColor="#5A1D1D" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="25" r="18" fill="url(#berry-g)" />
      <ellipse cx="18" cy="18" rx="4" ry="2.5" fill="#FFEDE0" opacity="0.4" />
      <path
        d="M22 6c0 3 1.5 5 4 6"
        stroke="#3D5A2D"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Chocolate({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient id="choco-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A4528" />
          <stop offset="50%" stopColor="#3D1F0F" />
          <stop offset="100%" stopColor="#1A0B05" />
        </linearGradient>
        <linearGradient id="choco-h" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C28A5E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C28A5E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M8 26 Q14 12, 26 18 T44 22 Q40 30, 30 32 T8 26 Z"
        fill="url(#choco-g)"
      />
      <path
        d="M10 24 Q16 14, 26 19 T42 23"
        stroke="url(#choco-h)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

export function Leaf({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient id="leaf-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7CA46B" />
          <stop offset="100%" stopColor="#3A5A2A" />
        </linearGradient>
      </defs>
      <path
        d="M8 38 Q4 24, 14 14 Q28 4, 42 8 Q40 22, 30 34 Q20 44, 8 38 Z"
        fill="url(#leaf-g)"
      />
      <path
        d="M10 36 Q22 26, 40 10"
        stroke="#2A4520"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 32 Q20 28, 26 28 M22 26 Q28 22, 32 22 M14 28 Q16 24, 20 24"
        stroke="#2A4520"
        strokeWidth="0.6"
        opacity="0.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Caramel({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <radialGradient id="caramel-g" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F5D89C" />
          <stop offset="50%" stopColor="#C28A4E" />
          <stop offset="100%" stopColor="#6E3F1E" />
        </radialGradient>
      </defs>
      <path
        d="M24 4 C28 14, 36 20, 36 30 C36 38, 30 44, 24 44 C18 44, 12 38, 12 30 C12 20, 20 14, 24 4 Z"
        fill="url(#caramel-g)"
      />
      <ellipse cx="20" cy="18" rx="2.5" ry="4" fill="#FFF1D6" opacity="0.4" />
    </svg>
  );
}

export function Nut({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient id="nut-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9A86B" />
          <stop offset="60%" stopColor="#8E5A2E" />
          <stop offset="100%" stopColor="#4A2C13" />
        </linearGradient>
      </defs>
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="12"
        fill="url(#nut-g)"
        transform="rotate(-25 24 24)"
      />
      <path
        d="M10 22 Q24 18, 38 26"
        stroke="#2E1A0A"
        strokeWidth="0.8"
        opacity="0.55"
        fill="none"
        transform="rotate(-25 24 24)"
      />
      <path
        d="M14 26 Q24 22, 34 28"
        stroke="#2E1A0A"
        strokeWidth="0.6"
        opacity="0.4"
        fill="none"
        transform="rotate(-25 24 24)"
      />
    </svg>
  );
}

export function Sprinkle({ size = 48, className, style }: IngredientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient id="sprinkle-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2C99B" />
          <stop offset="100%" stopColor="#9C7E48" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="22"
        width="36"
        height="4"
        rx="2"
        fill="url(#sprinkle-g)"
        transform="rotate(-15 24 24)"
      />
      <rect
        x="6"
        y="22"
        width="36"
        height="1"
        rx="0.5"
        fill="#FFEFC2"
        opacity="0.5"
        transform="rotate(-15 24 24)"
      />
    </svg>
  );
}

export const ingredientMap = {
  berry: Berry,
  chocolate: Chocolate,
  leaf: Leaf,
  caramel: Caramel,
  nut: Nut,
  sprinkle: Sprinkle,
} as const;

export type IngredientKey = keyof typeof ingredientMap;
