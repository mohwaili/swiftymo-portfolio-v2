import React from "react";
import Image from "next/image";

export default function Photo({ profile_photo }: { profile_photo: string }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center perspective-1000">
      <div className="relative w-[298px] h-[298px] xl:w-[498px] xl:h-[498px]">
      <Image
            src={profile_photo}
            priority
            quality={100}
            fill
            alt="photo"
            className="object-cover rounded-full"
          />
          </div>
    </div>
  );
}
