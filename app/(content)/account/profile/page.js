import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getMe } from "@/app/_services/user-api";

export const metadata = {
  title: "Update Profile",
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
