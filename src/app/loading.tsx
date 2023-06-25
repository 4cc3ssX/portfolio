import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-Poppins",
});

export default function Loading() {
  return (
    <div className={`${poppins.className} w-screen h-screen flex flex-col justify-center items-center`}>
      <p className="font-sans text-xl">Loading...</p>
    </div>
  );
}
