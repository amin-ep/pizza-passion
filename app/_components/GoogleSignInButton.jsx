import Image from "next/image";
import { signInAction } from "../_lib/actions";

function GoogleSignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center w-full justify-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default GoogleSignInButton;
