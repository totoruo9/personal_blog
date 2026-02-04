import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-earth disabled:pointer-events-none disabled:opacity-50 font-body tracking-wide cursor-pointer active:scale-[0.98]",
    {
        variants: {
            variant: {
                primary:
                    "bg-earth text-white hover:opacity-90 shadow-sm hover:shadow-md border border-transparent",
                secondary:
                    "bg-olive text-white hover:opacity-90 shadow-sm hover:shadow-md border border-transparent",
                outline:
                    "bg-transparent text-earth border-2 border-earth hover:bg-earth hover:text-white",
                ghost: "hover:bg-earth/10 text-earth hover:text-earth-dark",
                link: "text-earth underline-offset-4 hover:underline p-0 h-auto",
            },
            size: {
                default: "h-11 px-8 py-2", // 44px height (11 * 4) -> Good tap target
                sm: "h-9 px-4 text-sm",     // 36px height (9 * 4)
                lg: "h-14 px-10 text-lg",   // 56px height (14 * 4) - Increased for better touch target
                icon: "h-10 w-10 p-2",      // 40px height (10 * 4)
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
