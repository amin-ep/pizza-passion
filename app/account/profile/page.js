import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getMe } from "@/app/_lib/actions";
import { cookies } from "next/headers";

export const metadata = {
  title: "Update Profile",
};

async function Page() {
  const userData = await getMe(cookies().get(process.env.JWT_SECRET).value);

  return (
    <div>
      <UpdateProfileForm data={userData} />
    </div>
  );
}

export default Page;
