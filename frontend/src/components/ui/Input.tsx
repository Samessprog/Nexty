import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "peer flex h-12 w-full rounded-md border border-input bg-background px-4 pt-5 pb-1.5 text-sm text-foreground shadow-sm font-mono tracking-tight placeholder:text-transparent focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/20 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
