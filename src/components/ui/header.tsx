import { FC, PropsWithChildren } from "react";

export const Header: FC<PropsWithChildren> = ({ children }) => (
  <header className="bg-white-200 top-0  h-14 shadow-sm flex w-full items-center relative ">
    <section className="mx-auto max-w-[1160px] w-full">
      <main className="flex items-center justify-between relative z-50">
        {children}
      </main>
    </section>
  </header>
);
