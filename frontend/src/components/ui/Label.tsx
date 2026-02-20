import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- association provided by consumer via htmlFor or wrapping
    <label
      className={cn(
        "text-xs font-semibold uppercase tracking-wider font-mono pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
