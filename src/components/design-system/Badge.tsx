import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-accent tracking-wider uppercase select-none",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-earth text-white hover:bg-earth-dark",
                secondary:
                    "border-transparent bg-olive text-white hover:bg-olive-dark",
                outline: "text-text-primary border border-text-primary",
                stone: "bg-stone text-text-onStone hover:bg-stone-dark", // Ensure text contrast
                linen: "bg-linen text-text-primary hover:bg-linen-dark",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
