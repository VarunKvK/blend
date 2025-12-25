import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
    ({ text = "Button", className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-full border border-white/20 bg-background px-8 py-2 text-center font-medium transition-all duration-300 hover:border-white/40 hover:shadow-lg",
                    className,
                )}
                {...props}
            >
                <span className="relative z-20 inline-block transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-0">
                    {text}
                </span>
                <div className="absolute left-0 top-0 z-30 flex h-full w-full translate-x-[-100%] items-center justify-center gap-2 text-primary-foreground transition-all duration-300 group-hover:translate-x-0">
                    <span className="font-medium">{text}</span>
                    <ArrowRight className="h-4 w-4" />
                </div>
                <div className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"></div>
            </button>
        );
    }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
