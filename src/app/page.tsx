import { Poppins } from "next/font/google";
import { getAbout, getContact, getData, getExperience } from "@/services/data";

import Main from "./components/main";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-Poppins",
});

export default async function Home() {
  const data = await getData();
  const about = await getAbout();
  const experience = await getExperience();
  const contact = await getContact();

  return (
    <main className={poppins.variable}>
      <Main
        data={data}
        about={about}
        experience={experience}
        contact={contact}
      />
    </main>
  );
}

// export const revalidate = 60;
