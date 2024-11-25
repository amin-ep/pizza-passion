import AccessSection from "@/app/_components/AccessSection";
import AccessTab from "@/app/_components/AccessTab";
import GoogleSignInButton from "../_components/GoogleSignInButton";

export const metadata = {
  title: "Access",
};

function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
      <AccessSection />
      <AccessTab>
        <GoogleSignInButton />
      </AccessTab>
    </div>
  );
}

export default Page;
