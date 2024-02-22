import React from "react";
import { SearchHeader } from "../SearchHeader";
import { DemoHeader } from "../DemoHeader";

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
  return (
    <div className="h-full">
      <DemoHeader />
      <section className="grid grid-cols-[1fr] grid-rows-[1fr] h-full">
        <nav className="w-[12.8125rem] flex flex-col bg-black row-[span 2] col-[-3] overflow-y-auto">
          <header className="py-12 px-6">
            <a href="https://app.gumroad.com/" aria-label="Dashboard">
              <span className="logo-full !w-full text-white leading-[1.2] font-[2.5rem]">
                &nbsp;
              </span>
            </a>
          </header>
          {pages.map((s, i) => (
            <section
              key={i}
              className="flex flex-col mb-12 border-b border-white/50"
            >
              {s.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white py-4 px-6 border-t border-white/50 flex items-center gap-4 hover:text-pink"
                >
                  <div className={`icon icon-${icon} mb-0.5`}></div>
                  {label}
                </a>
              ))}
            </section>
          ))}
        </nav>
        <main className="col-[1] row-[1] bg-canvas">{children}</main>
      </section>
    </div>
  );
}
