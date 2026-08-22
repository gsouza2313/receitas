"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_IDS = ["inicio", "receitas"]; // ajuste conforme os IDs das seções na sua página

export default function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const linkClasses = (path: string) => {
    const isActive =
      pathname === path ||
      hash === path ||
      (activeSection !== "" && path === `/#${activeSection}`);

    return isActive
      ? "text-md lg:text-lg font-bold text-vermelho border-b-2 border-vermelho"
      : "text-md lg:text-lg text-primaria hover:text-secundaria transition-colors";
  };

  return (
    <header className="w-full bg-white text-black py-4 border-b border-slate-200 drop-shadow-lg">
      <div className="flex justify-between container mx-auto">
        <Link
          className="text-xl font-bold hover:scale-105 transition-all"
          href="/"
        >
          Receitas Refinadas
        </Link>
        <nav className="flex gap-6">
          <Link className={linkClasses("/")} href="/">
            Início
          </Link>
          <Link className={linkClasses("/receitas")} href="/receitas">
            Receitas
          </Link>
        </nav>
      </div>
    </header>
  );
}
