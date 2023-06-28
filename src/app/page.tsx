import { getData } from "@/services/data";
import Main from "./main";

export default async function Home() {
  const data = await getData();

  return <Main {...data} />;
}

export const revalidate = 60;
