"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Container from "@/components/layout/Container";


const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <Container>
      <nav className="
          flex items-center
          px-6 py-2
          min-h-[72px]
          rounded-full
          border border-white/15
          bg-[#07080a]/35
          backdrop-blur-3xl
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >

        {/* Izquierda */}
        <div className="flex-1">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/5"
          >
            JP
          </Link>
        </div>

        {/* Centro */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-full px-2 md:px-4 py-2 text-xs md:text-sm text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Derecha */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-1">
          <div className="mr-2 h-5 w-px bg-white/10" />

          <a
            href="https://github.com/juan888420"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-2 md:px-4 py-2 text-xs md:text-sm text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/juanpurr"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-2 md:px-4 py-2 text-xs md:text-sm text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
          >
            <FaLinkedin size={18} />
          </a>
        </div>


        {/* Mobile */}
        <div className="flex md:hidden justify-end w-full">

            <Sheet>
              <SheetTrigger className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-100 transition">
                <Menu size={20} />
              </SheetTrigger>

              <SheetContent
                side="top"
                className="mt-16 
                  mx-auto w-[90%] 
                  max-w-sm rounded-2xl 
                  border border-white/10
                  bg-zinc-900/60
                  backdrop-blur-2xl
                  shadow-xl
                  text-zinc-100"
              >
                  <div className="flex flex-col gap-4 py-6">

                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-center text-zinc-400 hover:text-zinc-100 transition"
                    >
                      {link.name}
                    </a>
                  ))}

                  <div className="my-2 h-px bg-white/10" />

                  <div className="flex justify-center gap-6 text-zinc-400">
                    <a
                      href="https://github.com/juan888420"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:text-zinc-100"
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>

                    <a
                      href="https://www.linkedin.com/in/juanpurr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:text-zinc-100"
                    >
                      <FaLinkedin size={16} />
                      LinkedIn
                    </a>
                  </div>

                  </div>
              </SheetContent>
            </Sheet>
          </div>

      </nav>
      </Container>
    </header>

  );
}