import Link from "next/link";
import Logo from "../fragments/logo";
import Social from "../fragments/social";
import { menus } from "@/data/menus";

const Footer = () => {
  return (
    <section className="xl:px-28 mt-24 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-200 relative border-t dark:border-gray-500">
      <div className="container-base pt-4">
        <div className="py-5">
          <Logo />
        </div>
        <div className="lg:flex justify-between items-start">
          <div className="pb-4">
            <p className="mt-3">Keep Up And Learning.</p>
            <div className="mt-2 flex">
              <Social
                url="https://www.instagram.com/purwokerto.dev"
                type="instagram"
              />
            </div>
          </div>
          <div>
            <h4 className="text-xl uppercase font-bold">Halaman</h4>
            <ul className="flex flex-col gap-2 mt-2">
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link href={menu.path}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center p-4 text-sm">
          &copy; Purwokerto Dev 2024, All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
