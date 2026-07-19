import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Nepali-only phone field: fixed +977 prefix, numeric 10-digit input.
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
      <span className="flex select-none items-center gap-1.5 border-r border-input bg-muted/40 px-3 text-sm font-medium text-muted-foreground">
        <span className="rounded-sm bg-emerald/15 px-1 py-0.5 text-[10px] font-bold tracking-wide text-emerald">
          NP
        </span>
        +977
      </span>
      <Input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="98XXXXXXXX"
        maxLength={10}
        className={cn(
          "h-full rounded-none border-0 bg-transparent focus-visible:border-transparent focus-visible:ring-0",
          className
        )}
        {...props}
      />
    </div>
  );
}
