import * as React from "react";
import { Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * International phone field — accepts any country, as long as the number
 * includes its dialing code (e.g. +1 415 555 2671, +977 98 1234 5678).
 * Spreads react-hook-form's register() output straight onto the inner
 * native input so ref/onChange/onBlur wiring works as normal.
 */
export function PhoneInput({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<"input"> & { wrapperClassName?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 items-stretch overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-3 has-[input[aria-invalid=true]]:ring-destructive/20 dark:bg-input/30",
        wrapperClassName
      )}
    >
      <span className="flex select-none items-center border-r border-input bg-muted/40 px-3 text-muted-foreground">
        <Phone className="size-4" />
      </span>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+1 415 555 2671"
        className={cn(
          "h-full rounded-none border-0 bg-transparent focus-visible:border-transparent focus-visible:ring-0",
          className
        )}
        {...props}
      />
    </div>
  );
}
