import Image from "next/image";
import React from "react";
import Button from "../fragments/button";

const Hero = () => {
  return (
    <div className="container-base transition-300 overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 lg:items-center pt-8 lg:pt-0 xl:px-28">
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 -top-2/4 md:-top-2/3 lg:-top-full -z-10 h-[32rem] w-[32rem] sm:h-[42rem] sm:w-[42rem] md:h-[52rem] md:w-[52rem] lg:h-[64rem] lg:w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] transition-all"
        aria-hidden="true">
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"></circle>
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#3b82f6"></stop>
            <stop offset="1" stopColor="#1d4ed8"></stop>
          </radialGradient>
        </defs>
      </svg>
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
          <div className="relative rounded-xl bg-primary">
            <Image
              src="/pin.png"
              className="absolute pointer-events-none w-10 h-auto -left-6 -top-6 z-30"
              alt=""
              width={200}
              height={200}
            />
            <Image
              src="/img2.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[2/3] w-full rounded-xl object-cover transition-transform animate-hangingWiggle"
            />
          </div>
        </div>
        <div className="w-44 space-y-4 sm:space-y-8 transition-300 sm:mt-32 lg:mt-24">
          <div className="relative rounded-xl bg-primary">
            <Image
              src="/pin3.png"
              className="absolute pointer-events-none w-10 h-auto -left-3 z-30"
              alt=""
              width={200}
              height={200}
            />
            <Image
              src="/img1.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[5/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
            <Image
              src="/pin2.png"
              className="absolute pointer-events-none invert w-8 h-auto -right-3 -bottom-2 z-30"
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="relative rounded-xl bg-primary">
            <Image
              src="/pin3.png"
              className="absolute pointer-events-none w-10 h-auto z-30"
              alt=""
              width={200}
              height={200}
            />
            <Image
              src="/img3.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[4/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
            <Image
              src="/pin3.png"
              className="absolute pointer-events-none w-10 h-auto bottom-0 right-0 z-30"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="w-44 space-y-4 sm:space-y-8 transition-300 mt-16 sm:mt-0">
          <div className="relative rounded-xl bg-primary">
            <Image
              src="/pin2.png"
              className="absolute pointer-events-none w-8 invert h-auto -translate-x-1/2 -top-4 left-2/3 z-30"
              alt=""
              width={200}
              height={200}
            />
            <Image
              src="/img4.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[4/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
            <Image
              src="/pin3.png"
              className="absolute pointer-events-none w-10 h-auto bottom-0 z-30"
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="relative rounded-xl bg-primary">
            <Image
              src="/pin.png"
              className="absolute pointer-events-none w-10 h-auto -left-6 -top-6 z-30"
              alt=""
              width={200}
              height={200}
            />
            <Image
              src="/img5.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[5/5] sm:aspect-[2/3] w-full rounded-xl object-cover"
            />
            <Image
              src="/pin3.png"
              className="absolute pointer-events-none w-10 h-auto bottom-0 right-3 z-30"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
