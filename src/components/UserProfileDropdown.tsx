import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../features/userSlice";
import axios from "axios";
import { RootState } from "../store/store";

const UserProfileDropdown = ()=> {
  const { currentUser } = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/users/logout`,{},{withCredentials:true})
      if (response.status === 200) {
        dispatch(logoutAction());
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center rounded-full  px-2 py-2 gap-1  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <img
            className="h-8 w-8 rounded-full transition ease-in-out hover:scale-125 duration-200 object-cover"
            src={currentUser?.avatar}
            alt="ico"
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-300/20 rounded-md bg-white dark:bg-dark  shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <MenuItem>
              {({ focus }) => (
                <Link
                  to={`/author/${currentUser?.username}/profile`}
                  className={`${
                    focus
                      ? "bg-primary text-white"
                      : "text-gray-900 dark:text-[#EEEEEE]"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <UserCircleIcon className="mr-2 w-5 h-5" />
                  My Profile
                </Link>
              )}
            </MenuItem>
          </div>

          <div className="px-1 py-1">
            <MenuItem>
            {({ focus }) => (
                <Link
                  to={`/add-post`}
                  className={`${
                    focus
                      ? "bg-primary text-white"
                      : "text-gray-900 dark:text-[#EEEEEE]"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <UserCircleIcon className="mr-2 w-5 h-5" />
                  Write a Blog
                </Link>
              )}
               
            </MenuItem>
          </div>
          <div className="px-1 py-1">
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={onLogout}
                  className={`${
                    focus
                      ? "bg-primary text-white"
                      : "text-gray-900 dark:text-[#EEEEEE]"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <PowerIcon className="mr-2 w-5 h-5" />
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default UserProfileDropdown