import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Loading from "./Loading";
import { User } from "../services/models/User";

const navigation = [
  { name: "Blog", href: "/" },
  { name: "Drafts", href: "/drafts" },
  { name: "Create post", href: "/create" },
  { name: "Sign up", href: "/signup" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  user: User;
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter();

  function isActive(pathname) {
    return router.pathname === pathname || router.pathname === "/" + pathname;
  }

  if (!props.user) {
    return <Loading />;
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        className={classNames(
                          isActive(item.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                      >
                        <Link
                          href={item.href}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={props.user.image}
                          alt=""
                        />
                      </Menu.Button>
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            <div
                              className={classNames(
                                isActive(item.href) ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-gray-700"
                              )}
                            >
                              <Link href={item.href}>{item.name}</Link>
                            </div>
                          </Menu.Item>
                        ))}
                        <Menu.Item key={"logout"}>
                          <div
                            className={
                              "block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-gray-700 cursor-pointer"
                            }
                            onClick={() => signOut()}
                          >
                            Sign out
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className={classNames(
                    isActive(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  <Disclosure.Button
                    as={Link}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={props.user.image}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {props.user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {props.user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <div
                    key={item.name}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Disclosure.Button
                      as={Link}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </div>
                ))}
                <div
                  key={"logout"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Disclosure.Button onClick={() => signOut()}>
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
