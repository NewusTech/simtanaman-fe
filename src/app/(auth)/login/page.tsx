import LoginForm from "@/components/ui/auth/LoginForm";
import Image from "next/image";

/**
 * The `LoginPage` component renders the login page layout.
 * It consists of two main sections:
 * 1. A section containing the `LoginForm` component.
 * 2. An optional section for displaying an image or additional content.
 *
 * The layout is responsive, with a vertical stack on smaller screens
 * and a horizontal split on medium and larger screens.
 *
 * @returns {JSX.Element} The rendered login page component.
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="w-full h-[100vh] p-10 pt-20 bg-white md:w-1/2">
        <div className="flex items-center mb-11">
          <img src="assets/images/LogoPali.svg" alt="" />
          <div className="text-2xl font-bold text-primary-500 ml-5">
            Selamat Datang di Website Tani
          </div>
        </div>
        <LoginForm />
        <div className="flex items-center justify-center mt-8">
          <div className="text-xs text-neutral-400">
            © Website Tani - All Rights Reserved
          </div>
        </div>
      </div>
      <div className="w-full flex-col h-[100vh] p-8 bg-primary-100 md:w-1/2 md:block hidden">
        <div className="text-3xl font-bold text-start text-primary-500 mb-3">
          Website Tani Wujudkan Pertanian Lebih Maju
        </div>
        <div className="text-sm font-normal text-start text-primary-500 mb-9">
          Dapatkan bantuan tanaman dan dukungan pertanian dengan satu klik.
          Akses pengajuan, pantau status, dan raih kemudahan dalam bertani.
        </div>
        <div className="w-[500px] h-[558px] mx-auto">
          <Image
            src="assets/images/IlustrationLogin.svg"
            alt="Login Image"
            layout="responsive"
            width={500}
            height={558}
          />
        </div>
      </div>
    </div>
  );
}
