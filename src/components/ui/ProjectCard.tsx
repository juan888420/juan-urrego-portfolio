import Image from "next/image";
import { ArrowUpRight, GithubLogo, Lock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  image?: string;         // screenshot under /public; placeholder when missing
  liveUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;    // private repo: no GitHub link, shows a badge instead
  accent: string;         // RGB triplet for accent stripe
}

// Portrait card: image top / content bottom.
// Hover: image zooms, border + shadow deepen (no scale on card itself).
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{ ["--accent" as string]: project.accent }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d10] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--accent)/0.28)] hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.55)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#0a0a0c] sm:h-48">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Captura de pantalla de ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: "rgb(var(--accent) / 0.05)",
              backgroundImage:
                "radial-gradient(rgb(var(--accent) / 0.35) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgb(var(--accent)/0.3)] bg-[#0d0d10]/80 text-[rgb(var(--accent))] backdrop-blur-sm">
              <ShieldCheck weight="duotone" className="h-7 w-7" />
            </div>
          </div>
        )}
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/30 to-transparent" />
        {/* Accent stripe bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, rgb(var(--accent)/0.7), transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight text-[#f4f4f5]">
            {project.title}
          </h3>
          <p
            className="mt-0.5 min-h-[36px] text-[12px] font-medium leading-relaxed"
            style={{ color: `rgb(var(--accent))` }}
          >
            {project.tagline}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#9a9aa3]">
            {project.description}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="whitespace-nowrap rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wide text-[#8a8a93] transition-colors duration-200 hover:border-[rgb(var(--accent)/0.4)] hover:bg-[rgb(var(--accent)/0.08)] hover:text-[rgb(var(--accent))]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div className="h-px bg-white/[0.06]" />

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent))] outline-none transition-colors duration-200 hover:bg-[rgb(var(--accent)/0.18)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.6)]"
              >
                Ver proyecto
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.1] px-4 py-2 text-[13px] font-medium text-[#a1a1aa] outline-none transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5] focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <GithubLogo weight="fill" className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {project.isPrivate && (
              <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.08] px-4 py-2 text-[13px] font-medium text-[#71717a]">
                <Lock weight="fill" className="h-3.5 w-3.5" />
                Repositorio privado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
