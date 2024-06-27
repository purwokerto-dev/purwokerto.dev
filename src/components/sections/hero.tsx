import Image from "next/image";
import React from "react";
import Button from "../fragments/button";

const Hero = () => {
  return (
    <div className="container-base transition-300 overflow-hidden grid grid-cols-1 lg:grid-cols-2 lg:items-center pt-8 lg:pt-0 xl:px-28">
      <div className="lg:pr-4">
        <h1 className="text-4xl font-bold mb-4 lg:text-5xl lg:mb-8">
          Komunitas Developer Purwokerto
        </h1>
        <p className="mb-4 text-lg">
          Wadah Komunitas Developer Purwokerto untuk Berkreasi, Terkoneksi dan
          Berkolaborasi.
        </p>
        <Button text="Gabung Komunitas" variant="bg" />
      </div>
      <div className="flex justify-center md:justify-end gap-4 sm:gap-8 mt-8">
        <div className="hidden sm:block transition-300 w-44 space-y-4 sm:space-y-8 mt-64 lg:mt-56">
          <div className="relative">
            <Image
              src="/img2.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="w-44 space-y-4 sm:space-y-8 transition-300 sm:mt-32 lg:mt-24">
          <div className="relative">
            <Image
              src="/img1.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[5/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/img3.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[4/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="w-44 space-y-4 sm:space-y-8 transition-300 mt-16 sm:mt-0">
          <div className="relative">
            <Image
              src="/img4.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[4/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/img5.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[5/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
