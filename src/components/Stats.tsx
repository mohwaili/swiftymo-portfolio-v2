"use client";

import CountUp from "react-countup";

const stats = [
  {
    num: 12,
    text: "Years of Experience",
  },
  {
    num: 15,
    text: "Projects participated in",
  },
  {
    num: 6,
    text: "Technologies mastered",
  }
];

export default function Stats() {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto mt-2 xl:mt-12">
        <div className="flex flex-wrap items-center xl:flex-row justify-center gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => (
            <div
              className="flex-1 flex-col xl:flex-row flex gap-4 items-center justify-start xl:justify-center text-center"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
