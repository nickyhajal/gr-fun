import React, { useState } from "react";
import { SearchHeader } from "../SearchHeader";
import { DemoHeader } from "../DemoHeader";
import { Toaster } from "react-hot-toast";

const pages = [
  [
    {
      href: "/dashboard",
      label: "Home",
      icon: "shop-window-fill",
    },
    {
      href: "/products",
      label: "Products",
      icon: "archive-fill",
    },
    {
      href: "/collaborators",
      label: "Collaborators",
      icon: "deal-fill",
    },
    {
      href: "/checkout/discounts",
      label: "Checkout",
      icon: "cart3-fill",
    },
    {
      href: "/posts",
      label: "Emails",
      icon: "envelope-fill",
    },
    {
      href: "/workflows",
      label: "Workflows",
      icon: "diagram-2-fill",
    },
    {
      href: "/customers",
      label: "Sales",
      icon: "solid-currency-dollar",
    },
    {
      href: "/dashboard/sales",
      label: "Analytics",
      icon: "bar-chart-fill",
    },
  ],
  [
    {
      href: "/balance",
      label: "Payouts",
      icon: "solid-currency-dollar",
    },
    {
      href: "https://discover.gumroad.com",
      label: "Discover",
      icon: "solid-search",
    },
    {
      href: "/library",
      label: "Library",
      icon: "bookmark-heart-fill",
    },
  ],
  [
    {
      href: "https://help.gumroad.com",
      label: "Help",
      icon: "book-half",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: "gear-fill",
    },
  ],
];
export function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="h-full">
        <DemoHeader context="admin" />
        <section className="grid grid-cols-[1fr] grid-rows-[1fr] h-screen lg:pt-16">
          <nav
            className={`w-full lg:w-[12.8125rem] flex flex-col bg-black lg:row-[span_2] lg:col-[-3] row-[-4] overflow-y-auto ${
              menuOpen ? "open fixed w-full h-full z-30" : ""
            }`}
          >
            <div className="navbar w-full lg:hidden bg-black p-4 text-white grid items-center gap-3 h-[3.875rem] grid-cols-[auto_1fr_auto]">
              <a href="https://app.gumroad.com/">
                <span className="logo-g">&nbsp;</span>
              </a>
              <h1 className="text-center text-nowrap w-full">
                Customer Success
              </h1>
              <span
                onClick={() => setMenuOpen((curr) => !curr)}
                className="icon toggle text-white"
                role="button"
              ></span>
            </div>
            <header className="py-12 px-6 hidden lg:block">
              <a href="https://app.gumroad.com/" aria-label="Dashboard">
                <span className="logo-full !w-full text-white leading-[1.2] font-[2.5rem]">
                  &nbsp;
                </span>
              </a>
            </header>
            {pages.map((s, i) => (
              <section
                key={i}
                className={`flex flex-col mb-12 border-b border-white/50 lg:flex
              ${menuOpen ? "flex" : "hidden"}
              `}
              >
                {s.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    className="text-white py-4 px-6 border-t border-white/50 flex items-center gap-4 hover:text-pink"
                  >
                    <div className={`icon icon-${icon} mb-0.5`}></div>
                    {label}
                  </a>
                ))}
              </section>
            ))}
          </nav>
          <main className="col-[1] row-[1] bg-canvas pb-20 lg:pb-0 overflow-y-auto">
            {children}
          </main>
        </section>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#edffff",
              border: "1px solid rgba(35, 160, 148,1)",
              fontSize: "0.87rem",
              fontWeight: "500",
              alignItems: "center",
            },
            iconTheme: {
              primary: "#20a094",
              secondary: "white",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </>
  );
}
