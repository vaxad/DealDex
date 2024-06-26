"use client";
import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../../components/ui/menubar";
import { ModeToggle } from "../../components/ui/theme-toggle";
import SideNavToggle from "./SideNavToggle";
import Link from "next/link";
import store from "../../lib/zustand";
import { useState } from "react";

export default function Navbar({ children }) {
  const [active, setActive] = useState(false);
  const hamburgeractive = () => {
    setActive(!active);
  };
  const { auth } = store();
  return (
    <>
      <div className="sticky flex top-0 h-[10vh] z-30 border-b flex-row w-full px-4 py-4 gap-8 items-center justify-between dark:bg-transparent bg-slate-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  ">
        <Link
          href="/"
          className=" flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <span className="ml-3 text-base font-bold">DEALDEX</span>
        </Link>
        <Menubar className="max-sm:hidden">
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/">Home</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/map">Nearby</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/virtual-try-on">Try on</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/search">Compare</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className=" flex flex-row gap-4 justify-center items-center">
          {/* <ModeToggle /> */}
          <div className="hidden max-sm:block" onClick={hamburgeractive}>
            <img src="/hamburger.png" alt="" />
          </div>
          {active && (
            <div className="absolute mt-60 bg-black flex-col z-50 h-fit w-fit">
              <Menubar className="flex-col h-fit w-fit px-4 py-2">
                <MenubarMenu>
                  <MenubarTrigger className="py-1">
                    <Link href="/">Home</Link>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="py-1">
                    {" "}
                    <Link href="/map">Nearby</Link>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="py-1">
                    {" "}
                    <Link href="/virtual-try-on">Try on</Link>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="py-1">
                    {" "}
                    <Link href="/search">Compare</Link>
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            </div>
          )}
          {!auth ? (
            <Menubar>
              <MenubarMenu>
                <Link
                  className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent "
                  href={"/auth"}
                >
                  <img src="/pin.svg" alt="" className="mr-3 opacity-80" />
                  Pins
                </Link>
              </MenubarMenu>
            </Menubar>
          ) : (
            <SideNavToggle />
          )}
        </div>
      </div>

      <div className="h-[0vh]"></div>
      <div className=" flex flex-row w-full flex-nowrap overflow-x-clip">
        {children}
        {/* <SideNav/> */}
      </div>
    </>
  );
}
