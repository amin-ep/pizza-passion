import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./_components/Toast";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-primary-950 text-primary-100`}>
        <Toast />
        <div>{children}</div>
      </body>
    </html>
  );
}
