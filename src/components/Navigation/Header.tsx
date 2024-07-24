import { NavLink, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SunIcon, MoonIcon} from "@heroicons/react/24/solid";
import { toggleTheme } from "../../features/themeSlice";
import UserProfileDropdown from "../UserProfileDropdown";
import { RootState } from "../../store/store";

const Header = () => {
  const { currentUser } = useSelector((state:RootState) => state.user);
  const { theme } = useSelector((state:RootState) => state.theme)
  const dispatch = useDispatch()
 
  return (

    <nav
      tabIndex={-1}
      className=" bg-white sticky top-0  font-pop z-40 w-full backdrop-blur flex flex-row justify-between   items-center border-b  border-slate-300  py-2 dark:border-slate-900/10 dark:bg-darkL lg:px-16 px-5">
      
        <NavLink to="/">
          <div className="logo  transition hover:scale-[1.1]  ease-in-out duration-300  bg-gradient-to-r from-blue-500 to-primary px-2">
            <h3 className="text-white text-lg">PostHive</h3>
          </div>
        </NavLink>

        <ul className="flex items-center  text-white lg:text-lg  ">
          <li>
            <button
              onClick={()=>dispatch(toggleTheme())}
              type="button"
              className="text-primary  hover:bg-gray-100 dark:hover:bg-dark/60  rounded-lg text-sm p-2.5 inline-flex items-center justify-center"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </li>
          <li className="mx-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-primary " : "text-[#393E46] dark:text-[#EEEEEE]"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mx-3">
            <NavLink
              to="/blogs"
            
              className={({ isActive }) =>
                isActive ? "text-primary " : "text-[#393E46] dark:text-[#EEEEEE]"
              }
            >
              Blogs
            </NavLink>
          </li>
        
        
          {!currentUser && (
            <li className="mx-3">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-[#393E46] dark:text-[#EEEEEE]"
                }
              >
                Login
              </NavLink>
            </li>
          )}

          {currentUser && (
            <>
              <li className="mx-3 lg:block hidden">
                <NavLink
                  to="/add-post"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary"
                      : "text-[#393E46] dark:text-[#EEEEEE]"
                  }
                >
                  New Blog
                </NavLink>
              </li>
              <li>
                <UserProfileDropdown/>
              </li>
            </>
          )}
          
          
        </ul>
    </nav>


 
  );
};

export default Header;
