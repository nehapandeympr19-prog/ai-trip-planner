import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-indigo-600 hover:to-blue-700 hover:shadow-lg",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:from-pink-600 hover:to-red-700 hover:shadow-lg",
        outline:
          "border border-gray-300 bg-white/70 backdrop-blur-md text-gray-800 hover:bg-gray-100 shadow-sm",
        secondary:
          "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 shadow-sm hover:from-gray-300 hover:to-gray-500",
        ghost:
          "bg-transparent hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        glass:
          "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:shadow-lg",
        neon:
          "relative bg-black text-white after:absolute after:inset-0 after:rounded-md after:blur-md after:bg-gradient-to-r after:from-pink-500 after:to-purple-600 after:opacity-60 hover:after:opacity-100",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-12 px-8 text-base rounded-lg",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
