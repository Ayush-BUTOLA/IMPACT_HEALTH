import { useState } from 'react';
import { User } from 'lucide-react';

/**
 * Automatically extracts doctor initials from their full name.
 * Strips common medical and formal prefixes (Dr., Prof., Mr., etc.)
 * Returns two-letter initials (e.g., "Dr. Romil Lotta" -> "RL").
 */
function getDoctorInitials(name) {
  if (!name || typeof name !== 'string') return '';

  const cleaned = name
    .replace(/^(Dr\.|Dr|Prof\.|Prof|Mr\.|Mr|Mrs\.|Mrs|Ms\.|Ms)\s+/i, '')
    .trim();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

/**
 * Premium circular doctor avatar with automatic initials fallback
 * when a display photo has not been uploaded or fails to load.
 */
export default function DoctorAvatar({
  src,
  name,
  className = "w-24 h-24 mb-5",
  alt
}) {
  const [hasError, setHasError] = useState(false);
  const initials = getDoctorInitials(name);
  const showImage = Boolean(src && !hasError);

  if (showImage) {
    return (
      <div className={`${className} rounded-full bg-slate-100 mx-auto flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-sm`}>
        <img
          src={src}
          alt={alt || name || 'Doctor profile photo'}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Premium clean initials / neutral silhouette fallback
  return (
    <div
      role="img"
      aria-label={alt || name ? `Avatar for ${name}` : 'Doctor avatar placeholder'}
      className={`${className} rounded-full bg-[#EDF3FC] mx-auto flex items-center justify-center overflow-hidden border-2 border-[#D4E2F5] shadow-xs select-none`}
    >
      {initials ? (
        <span className="font-sans font-bold text-[#030050] text-2xl tracking-normal leading-none select-none">
          {initials}
        </span>
      ) : (
        <User className="w-10 h-10 text-[#030050]/35 stroke-[1.75]" />
      )}
    </div>
  );
}
