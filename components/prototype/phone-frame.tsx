import type { ReactNode } from "react"

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[400px]">
      {/* Desktop: render inside a phone shell. Mobile: full bleed. */}
      <div className="md:rounded-[2.5rem] md:border-8 md:border-navy md:bg-navy md:p-0 md:shadow-2xl">
        <div className="relative h-[100dvh] overflow-hidden bg-gray-soft md:h-[820px] md:rounded-[2rem]">
          {children}
        </div>
      </div>
    </div>
  )
}
