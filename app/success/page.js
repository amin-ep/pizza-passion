import { IoMdCheckmark } from "react-icons/io";
import LinkButton from "../_components/LinkButton";

function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-64 shadow-lg bg-primary-800 text-center flex justify-center flex-col items-center py-4 px-3 rounded-xl">
        <h1 className="text-4xl">Success</h1>
        <span className="my-3">
          <IoMdCheckmark size={52} className="bg-green-600 rounded-full" />
        </span>
        <p className="mt-2 mb-5">
          Your order has been successfully placed <br />
          You can visit your account page to see status of your order .
        </p>
        <LinkButton href="/account/orders">Skip</LinkButton>
      </div>
    </div>
  );
}

export default Page;
