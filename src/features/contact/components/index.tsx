import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { ContactContent } from "./_components/contact-content";

interface Props {
  user: UserWithLinksAndAvatar;
}

export default function Contact({ user }: Props) {
  return (
    <div id="contact" className="relative flex pt-14 min-h-svh">
      <div className="absolute left-0 right-0 bottom-5">
        <p className="text-xs text-hint text-center">
          Designed & Built by{" "}
          <span className="font-medium">{user.nickname} 🚀</span>
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <ContactContent email={user.email} />
      </div>
    </div>
  );
}
