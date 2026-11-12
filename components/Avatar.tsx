export function Avatar({ hablando }: { hablando: boolean }) {
  return (
    <svg
      className={hablando ? "avatar avatar--hablando" : "avatar"}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Guía digital del recorrido"
    >
      <circle cx="60" cy="60" r="58" fill="#e3efe6" />
      <circle className="avatar__onda" cx="60" cy="60" r="56" fill="none" stroke="#f2c230" strokeWidth="4" />
      <path d="M18 112c2-22 18-34 42-34s40 12 42 34a58 58 0 0 1-84 0z" fill="#0b3d2e" />
      <path d="M48 80l12 14 12-14-4-6H52z" fill="#f6f4ee" />
      <rect x="52" y="64" width="16" height="16" rx="6" fill="#c98f6b" />
      <circle cx="60" cy="48" r="22" fill="#d9a07c" />
      <path d="M38 46c0-15 9-24 22-24s22 9 22 24c-5-8-12-12-22-12s-17 4-22 12z" fill="#2a2420" />
      <circle cx="52" cy="48" r="2.4" fill="#16211c" />
      <circle cx="68" cy="48" r="2.4" fill="#16211c" />
      <ellipse className="avatar__boca" cx="60" cy="58" rx="5" ry="2" fill="#7a2e22" />
      <path d="M36 48a24 24 0 0 1 48 0" fill="none" stroke="#f2c230" strokeWidth="3" strokeLinecap="round" />
      <rect x="32" y="44" width="7" height="13" rx="3.5" fill="#f2c230" />
      <rect x="81" y="44" width="7" height="13" rx="3.5" fill="#f2c230" />
      <path d="M36 57c0 8 6 11 14 11" fill="none" stroke="#f2c230" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
