import { FC, PropsWithChildren } from "react";

export const Header: FC<PropsWithChildren> = ({ children }) => (
  <header className="bg-white-200 top-0 h-14 shadow-sm flex w-full items-center relative z-40">
    <section className="mx-auto max-w-[1160px] w-full px-4">
      <main className="flex items-center justify-between relative">
        {children}
      </main>
    </section>
  </header>
);
