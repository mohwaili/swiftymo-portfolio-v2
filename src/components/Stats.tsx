"use client";

import CountUp from "react-countup";

interface CountedValue {
  number: number;
  value: string;
}

export default function Stats({ counted_values }: { counted_values: CountedValue[] }) {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto mt-2 xl:mt-12">
        <div className="flex flex-wrap items-center xl:flex-row justify-center gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {counted_values.map((item: CountedValue, index: number) => (
            <div
              className="flex-1 flex-col xl:flex-row flex gap-4 items-center justify-start xl:justify-center text-center"
              key={index}
            >
              <CountUp
                end={item.number}
                duration={5}
                delay={0.5}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.value.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
