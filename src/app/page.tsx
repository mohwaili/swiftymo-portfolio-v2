import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

export const revalidate = 0;

export default async function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/start-page`);
    const data = await response.json();
    const { description, cv_download_url, profile_photo, social_links, counted_values } = data.data;

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 lx:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I&apos;m <br />
              <span className="text-accent">Mohammed Al Waili</span>
            </h1>
            <p className="max-w-[800px] mb-9 text-white/80">
            { description }
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a href={cv_download_url} download target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 hover:cursor-pointer"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
              <div className="mb-8 xl:mb-0">
                <Social
                  social_links={social_links}
                  containerClass={"flex gap-6"}
                  iconClass={
                    "w-9 h-9 border border-accent rounded-full flex justify-center items-center tet-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  }
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo profile_photo={profile_photo.url} />
          </div>
        </div>
      </div>
      <Stats counted_values={counted_values} />
    </section>
  );
}
