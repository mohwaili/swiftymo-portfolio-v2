import React from "react";
import ResumeTabs from "./ResumeTabs";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/resume`);
  const data = await response.json();
  const { experiences, educations, skills, info } = data.data;
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <ResumeTabs experience={experiences} education={educations} skills={skills} info={info} />
      </div>
    </div>
  );
}
