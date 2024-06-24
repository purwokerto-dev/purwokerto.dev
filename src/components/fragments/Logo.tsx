import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image
        src="/whitelogo.png"
        alt="logo"
        width={500}
        height={500}
        className="h-10 w-auto"
      />

      {/* <Image
        src="/whitemaskot.png"
        alt="logo"
        width={500}
        height={500}
        className="h-20 w-20 md:hidden"
      /> */}
    </>
  );
};

export default Logo;
