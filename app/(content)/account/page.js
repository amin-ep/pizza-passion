import { getMe } from "@/app/_services/user-api";

export const metadata = {
  title: "Account",
};

async function Page() {
  const userData = await getMe();
  return <div>Welcome, {userData.firstName}</div>;
}

export default Page;
