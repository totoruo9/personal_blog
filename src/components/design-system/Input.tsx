import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-sm border border-border-medium bg-white px-3 py-2 text-base text-text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-quaternary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-earth/50",
                    className // h-11 is 44px (11*4), aligning with Button default size
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
