import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "dark",
  showText = true,
}: {
  className?: string
  variant?: "dark" | "light"
  showText?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky to-turquoise" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative size-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4Z"
            fill="currentColor"
            opacity="0.25"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="leading-tight">
          <p
            className={cn(
              "font-heading text-sm font-bold",
              variant === "dark" ? "text-navy" : "text-white",
            )}
          >
            Salta Estaciona
          </p>
          <p className="text-[11px] font-semibold text-sky -mt-0.5">Transparente</p>
        </div>
      )}
    </div>
  )
}
