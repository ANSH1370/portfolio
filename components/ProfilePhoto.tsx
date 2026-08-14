"use client";

import { useState } from "react";

// Shows /profile.jpg from the public/ folder. Until Ansh adds that file,
// it falls back to a clean gradient monogram so the layout never breaks.
export default function ProfilePhoto() {
  const [missing, setMissing] = useState(false);

  return (
    <div className="relative">
      {/* gradient glow behind the photo */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet/50 to-cyan/40 blur-lg" />
      <div className="card relative aspect-[4/5] overflow-hidden rounded-3xl">
        {missing ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-soft">
            <span className="font-display bg-gradient-to-br from-violet to-cyan bg-clip-text text-7xl font-bold text-transparent">
              AM
            </span>
            <span className="px-6 text-center text-xs text-fog/70">
              add profile.jpg to the public folder
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/profile.jpg"
            alt="Ansh Mangukiya"
            className="h-full w-full object-cover"
            onError={() => setMissing(true)}
          />
        )}
      </div>
    </div>
  );
}
