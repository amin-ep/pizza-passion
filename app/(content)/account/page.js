import { getMe } from "@/app/_services/user-api";

export const metadata = {
  title: "Account",
  description:
    "Manage your Pizza Passion account. View orders, update your profile, and customize your pizza experience — all in one place.",
};

async function Page() {
  const userData = await getMe();
  return <div>Welcome, {userData.firstName}</div>;
}

export default Page;
