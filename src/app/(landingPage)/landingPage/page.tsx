/**
 * LandingPage component renders the main landing page with various sections and navigation.
 *
 * @returns {JSX.Element} The rendered landing page component.
 */
"use client";

import IconArrowRight from "@/assets/IconArrowRight";
import IconCalendar from "@/assets/IconCalendar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * NavigationLink component renders a navigation link that smoothly scrolls to the target section.
 *
 * @param {Object} props - The component props.
 * @param {string} props.href - The target section ID to scroll to.
 * @param {React.ReactNode} props.children - The content to be displayed inside the link.
 * @returns {JSX.Element} The rendered navigation link component.
 */
function NavigationLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  /**
   * handleClick is a function that handles the click event on the navigation link.
   * It prevents the default behavior and scrolls to the target section smoothly.
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - The click event object.
   * @returns {void}
   * @example
   * handleClick(event);
   * @function
   * @name handleClick
   * @type {Function}
   * @returns {void}
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - The click event object.
   * @description
   * The function uses the `preventDefault` method to prevent the default behavior of the event.
   * It then finds the target section by the provided `href` and scrolls to it smoothly.
   * The scroll behavior is set to "smooth" for a better user experience.
   * The function does not return any value.
   **/
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    document
      .getElementById(href.substring(1))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <li>
      <a
        href={href}
        className="text-primary-default font-medium"
        onClick={handleClick}
      >
        {children}
      </a>
    </li>
  );
}

/**
 * LandingPage component renders the main landing page with various sections and navigation.
 * @component
 * @returns {JSX.Element} The rendered landing page component.
 */
export default function LandingPage() {
  const router = useRouter();
  return (
    <div>
      <header className="py-4 px-4 bg-primary-100 text-white">
        <div className="flex justify-between items-center mx-4">
          <img src="assets/images/LogoPali.svg" alt="" className="w-auto" />
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <NavigationLink href="#beranda">Berandas</NavigationLink>
                <NavigationLink href="#peta">Peta Distribusi</NavigationLink>
                <NavigationLink href="#statistika">Statistika</NavigationLink>
                <NavigationLink href="#pengumuman">Pengumuman</NavigationLink>
                <NavigationLink href="#informasi">Informasi</NavigationLink>
              </ul>
            </nav>
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
              className="bg-primary-default text-white rounded-full px-5 hidden md:block"
            >
              Login
            </Button>
            <button className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="">
        <section id="beranda" className="my-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-20">
            <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 animate__animated animate__fadeInLeft">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-primary-default leading-relaxed text-center md:text-left">
                  DARI PETANI UNTUK PETANI, DEMI MASA DEPAN PERTANIAN YANG LEBIH
                  MAJU DAN <br /> BERKELANJUTAN
                </h1>
                <p className="mt-4 text-center md:text-left">
                  Aplikasi pertanian yang dirancang untuk membantu petani
                  berkembang dengan menyediakan informasi akurat, teknologi
                  terkini, serta dukungan penuh dalam mengelola lahan,
                  meningkatkan produktivitas, dan menghadapi tantangan pertanian
                  modern.
                </p>
              </div>
            </div>
            <img
              src="assets/images/IlustrationLanding.svg"
              alt=""
              className="w-full md:w-[500px] mt-4 md:mt-0 animate__animated animate__fadeIn"
            />
          </div>
        </section>
        <section id="peta" className="my-8 py-4 bg-neutral-300 px-4">
          <h2 className="text-2xl font-bold text-primary-default text-center">
            Peta Distribusi Poktan
          </h2>
          <div className="flex justify-center">
            <img
              src="assets/images/PetaDistribusiPoktan.svg"
              alt=""
              className="md:w-[500px] animate__animated animate__fadeIn"
            />
          </div>
        </section>
        <section id="statistika" className="my-8 px-4 py-4">
          <h2 className="text-2xl font-bold text-primary-default">
            Statistika
          </h2>
          <p className="mt-4">Statistika</p>
        </section>
        <section id="pengumuman" className="my-8 px-4 py-4">
          <h2 className="text-2xl font-bold text-primary-default text-start">
            Pengumuman
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p className="col-span-1 md:col-span-2">
              Temukan berbagai berita terbaru seputar dunia pertanian, mulai
              dari teknologi modern, kebijakan pemerintah, hingga tips dan
              inovasi untuk meningkatkan hasil panen. Tetap terupdate dengan
              informasi pertanian terkini!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md">
                <img
                  src="assets/images/DefaultAnnouncement.svg"
                  alt={`Pengumuman ${i}`}
                  className="w-full h-32 object-cover rounded-t-lg min-h-52"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <IconCalendar />
                    <span className="text-primary-default text-sm">
                      20 Januari 2025
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-default mt-4">
                    Petani di Wilayah Talang Ubi Rayakan Panen Padi Melimpah di
                    musim ini
                  </h3>
                  <Button className="bg-primary-default text-white rounded-full mt-4 w-full">
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="informasi" className="px-4 py-4 bg-primary-100">
          <h2 className="text-2xl font-bold text-primary-default">
            Langkah - Langkah Petani Membuat Pengajuan Bantuan{" "}
          </h2>
          <p className="mt-4">
            Ikuti proses pengajuan bantuan pupuk/tanaman dengan mudah dan
            transparan. Mulai dari pengajuan oleh petani hingga distribusi oleh
            distributor, setiap langkah dirancang untuk memastikan bantuan tepat
            sasaran dan efisien.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 justify-items-center py-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-4 relative"
              >
                <img
                  src="assets/images/langkahDefault.svg"
                  alt=""
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32"
                />
                {i < 4 && (
                  <div className="flex items-center gap-2 absolute right-[-30px] transform -translate-y-1/2">
                    <IconArrowRight />
                  </div>
                )}
                <div className="font-medium text-center md:text-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-5 p-4">
        <div className="flex items-center gap-5">
          <img src="assets/images/LogoPali.svg" alt="" className="w-auto" />
          Website pertanian adalah website yang membantu petani berkembang
          dengan informasi akurat, teknologi terkini, dan dukungan penuh untuk
          meningkatkan produktivitas.
        </div>
        <div className="border-t-2 border-black mt-4 pt-4">
          <div className="text-center text-sm text-neutral-900">
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="text-primary-default font-medium">Beranda</div>
              <div className="text-primary-default font-medium">
                Peta Distribusi
              </div>
              <div className="text-primary-default font-medium">Statistika</div>
              <div className="text-primary-default font-medium">Pengumuman</div>
              <div className="text-primary-default font-medium">Informasi</div>
            </div>
            Copyright &copy; PERTANIAN 2025
          </div>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-primary-default text-white p-3 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
}
