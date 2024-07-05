import Link from "next/link";
import Logo from "../fragments/logo";
import Social from "../fragments/social";

const Footer = () => {
  return (
    <section className="container-base xl:px-28 mt-24 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-200">
      <div className="lg:flex justify-between items-start">
        <div className="py-4">
          <Logo />
          <p className="mt-3">Keep Up And Learning.</p>
          <div className="mt-2 flex">
            <Social
              url="https://www.instagram.com/purwokerto.dev"
              type="instagram"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">Halaman</h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/members">Members</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center p-4 text-sm">
        &copy; Purwokerto Dev 2024, All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
