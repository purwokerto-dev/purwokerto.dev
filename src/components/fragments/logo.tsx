import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        loading="lazy"
        src={"/darklogo.svg"}
        alt="logo"
        width={100}
        height={100}
        className="h-10 w-auto hidden dark:block"
      />
      <Image
        loading="lazy"
        src={"/lightlogo.svg"}
        alt="logo"
        width={100}
        height={100}
        className="h-10 w-auto block dark:hidden"
      />
    </Link>
  );
};

export default Logo;
