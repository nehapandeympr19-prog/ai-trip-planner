// import * as React from "react"
// import * as AccordionPrimitive from "@radix-ui/react-accordion"
// import { ChevronDown } from "lucide-react"

// import { cn } from "@/lib/utils"

// const Accordion = AccordionPrimitive.Root

// const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
//   <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
// ))
// AccordionItem.displayName = "AccordionItem"

// const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Header className="flex">
//     <AccordionPrimitive.Trigger
//       ref={ref}
//       className={cn(
//         "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
//         className
//       )}
//       {...props}>
//       {children}
//       <ChevronDown
//         className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
//     </AccordionPrimitive.Trigger>
//   </AccordionPrimitive.Header>
// ))
// AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Content
//     ref={ref}
//     className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//     {...props}>
//     <div className={cn("pb-4 pt-0", className)}>{children}</div>
//   </AccordionPrimitive.Content>
// ))
// AccordionContent.displayName = AccordionPrimitive.Content.displayName

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }


import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-purple-200 rounded-xl shadow-sm mb-4 bg-white overflow-hidden",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between rounded-t-xl px-5 py-3 text-lg font-semibold text-purple-800 bg-purple-100 hover:bg-purple-200 transition-all border-b border-purple-200 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {/* Left: Calendar icon + label */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📅</span>
        <span>{children}</span>
      </div>

      {/* Right: Chevron */}
      <ChevronDown className="h-5 w-5 shrink-0 text-purple-700 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 px-4 bg-gray-50", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
