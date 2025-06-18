import OfflinePaymentForm from "@/app/_components/OfflinePaymentForm";
import OfflinePaymentHeading from "@/app/_components/OfflinePaymentHeading";

function Page() {
  return (
    <div className="mt-1 mx-auto max-w-[38rem] bg-primary-800 p-5 rounded-sm">
      <OfflinePaymentHeading />
      <OfflinePaymentForm />
    </div>
  );
}

export default Page;
