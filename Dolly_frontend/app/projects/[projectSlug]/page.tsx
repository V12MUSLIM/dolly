import ProjectPage from "./projectPage";

export default async function Page({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  console.log("Page project slug",projectSlug);
  return <ProjectPage projectSlug={projectSlug} />;
}
