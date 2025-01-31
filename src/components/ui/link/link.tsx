import { cn } from "@/utils/cn";
import { Link as RouterLink, type LinkProps } from "react-router";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn("text-slate-600 hover:text-slate-900", className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
