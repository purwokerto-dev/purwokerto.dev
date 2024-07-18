import { cn } from "@/lib/cn";
import { FC, ReactNode } from "react";

interface PageHeadderI {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const SectionHeader: FC<PageHeadderI> = ({
  children,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("container-base mb-20 xl:px-28", className)}>
      <h2 className="text-4xl font-extrabold text-center ">{title}</h2>
      <p className="text-center mt-1">{description}</p>
      {children}
    </div>
  );
};

export default SectionHeader;
