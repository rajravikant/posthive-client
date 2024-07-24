import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white  dark:bg-darkL border-t border-zinc-200 dark:border-zinc-600">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="logo block text-white  transition hover:scale-[1.1]  ease-in-out duration-300  bg-gradient-to-r from-blue-500 to-primary px-2 w-fit">

                PostHive
            
            </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to={'/'}  className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to={'/'}  className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 PostHive🔥 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
