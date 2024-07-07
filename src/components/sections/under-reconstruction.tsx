import { cn } from "@/lib/cn";
import { ABeeZee } from "next/font/google";

const aBeeZee = ABeeZee({ subsets: ["latin"], weight: "400" });

const UnderReconstruction = () => {
  return (
    <div
      className={cn(
        "container-base xl:px-28 flex justify-center box-border pt-10",
        aBeeZee.className
      )}>
      <div>
        <p className="text-xl font-bold text-center">Under Reconstruction</p>
      </div>
    </div>
  );
};

export default UnderReconstruction;
