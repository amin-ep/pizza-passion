import { getMe } from "../_lib/actions";

export const metadata = {
  title: "Account",
};

async function Page() {
  const userData = await getMe();
  return <div>Welcome, {userData?.data.user.fullName.split(" ")[0]}</div>;
}

export default Page;
