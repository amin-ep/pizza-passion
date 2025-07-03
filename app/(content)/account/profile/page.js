import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getMe } from "@/app/_services/user-api";

export const metadata = {
  title: "Update Profile",
  description:
    "Update your personal information, email, and preferences. Keep your Pizza Passion profile up to date for a smoother ordering experience.",
};

async function Page() {
  const userData = await getMe();

  return (
    <div>
      <UpdateProfileForm data={userData} />
    </div>
  );
}

export default Page;
