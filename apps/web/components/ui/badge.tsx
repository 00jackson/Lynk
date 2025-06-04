// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
        secondary:
          "border-transparent bg-blue-100 text-blue-600 hover:bg-blue-100/80",
        outline:
          "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-50/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
        violet:
          "border-transparent bg-violet-600 text-white hover:bg-violet-600/80",
        violetOutline:
          "border-violet-200 text-violet-600 bg-violet-50 hover:bg-violet-50/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };