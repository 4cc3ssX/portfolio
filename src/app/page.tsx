import { getAbout, getContact, getData, getExperience } from "@/services/data";
import Main from "./main";

export default async function Home() {
  const data = await getData();
  const about = await getAbout();
  const experience = await getExperience();
  const contact = await getContact();

  return (
    <Main data={data} about={about} experience={experience} contact={contact} />
  );
}

export const revalidate = 60;
