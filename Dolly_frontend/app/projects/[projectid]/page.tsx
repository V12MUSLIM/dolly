import ProjectPage from "./projectPage";

export default async function Page({
  params,
}: {
  params: Promise<{ projectid: string }>;
}) {
  const { projectid } = await params;

  return (
    <ProjectPage projectid={decodeURIComponent(projectid)} />
  );
}