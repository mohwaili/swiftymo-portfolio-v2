import Image from "next/image";

export default function Home() {
  return (
    <main className="container">
      <div className="font-thin">Thin (100)</div>
      <div className="font-extralight">Extra Light (200)</div>
      <div className="font-light">Light (300)</div>
      <div className="font-normal">Normal (400)</div>
      <div className="font-medium">Medium (500)</div>
      <div className="font-semibold">Semibold (600)</div>
      <div className="font-bold">Bold (700)</div>
      <div className="font-extrabold">Extra Bold (800)</div>
    </main>
  );
}
