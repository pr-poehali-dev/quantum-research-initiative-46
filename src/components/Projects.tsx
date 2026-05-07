import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUpRight } from "lucide-react"
import Icon from "@/components/ui/icon"

const projects = [
  {
    id: 1,
    title: "Автосалон GATE",
    category: "Автосалон",
    location: "Москва, ресепшн и торговое оборудование",
    year: "2025",
    images: [
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/bucket/0dca56c9-bb78-4d5c-b101-dfdadbdebf50.png",
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/bucket/e6262aa9-421d-42a7-bce8-7533b4a7eec6.jpg",
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/bucket/c2e22964-8afd-4435-8d6d-1ca737a021e5.jpg",
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/bucket/13009a38-52fb-4164-87e5-a2f65cdae4e3.jpg",
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/bucket/f8a3fce4-f47a-4bcf-813b-2583d8c73244.jpg",
    ],
  },
  {
    id: 2,
    title: "Ресторан «Brasserie Nord»",
    category: "Ресторан",
    location: "Москва, 120 посадочных мест",
    year: "2024",
    images: [
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/files/e6833f15-35d0-4ac0-8228-726661a52928.jpg",
    ],
  },
  {
    id: 3,
    title: "Отель «The White»",
    category: "Бутик-отель",
    location: "Санкт-Петербург, 45 номеров",
    year: "2024",
    images: [
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/files/a61a6fd8-b10d-47c6-b5b0-7eb09b7a1f7c.jpg",
    ],
  },
  {
    id: 4,
    title: "Бар «Oak & Rye»",
    category: "Бар / Лаунж",
    location: "Москва, концептуальный бар",
    year: "2023",
    images: [
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/files/5cc21788-fe66-4bca-bcf6-6917271477de.jpg",
    ],
  },
  {
    id: 5,
    title: "Офис «Meridian Group»",
    category: "Корпоративный объект",
    location: "Москва, 500 м² переговорные и лобби",
    year: "2023",
    images: [
      "https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/files/f8b4d3c0-4929-40b1-912d-8259e431f79e.jpg",
    ],
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null

  const closeGallery = useCallback(() => {
    setActiveProjectId(null)
    setActiveImageIndex(0)
  }, [])

  const showPrev = useCallback(() => {
    if (!activeProject) return
    setActiveImageIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length)
  }, [activeProject])

  const showNext = useCallback(() => {
    if (!activeProject) return
    setActiveImageIndex((i) => (i + 1) % activeProject.images.length)
  }, [activeProject])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!activeProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery()
      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "ArrowRight") showNext()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [activeProject, closeGallery, showPrev, showNext])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши изделия</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все работы
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setActiveProjectId(project.id)
                setActiveImageIndex(0)
              }}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden mb-6 bg-secondary">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-auto object-contain transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-[1.02]" : "scale-100"
                  }`}
                />
                {project.images.length > 1 && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                    <Icon name="Images" size={14} />
                    {project.images.length}
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={closeGallery}
        >
          <div className="flex items-center justify-between px-6 md:px-12 py-5 text-white">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-1">{activeProject.category}</p>
              <h3 className="text-lg md:text-xl font-medium">{activeProject.title}</h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeGallery()
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Закрыть"
            >
              <Icon name="X" size={22} />
            </button>
          </div>

          <div
            className="flex-1 relative flex items-center justify-center px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeProject.images[activeImageIndex]}
              alt={`${activeProject.title} — фото ${activeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {activeProject.images.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Следующее фото"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}
          </div>

          {activeProject.images.length > 1 && (
            <div
              className="px-6 md:px-12 py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 mb-3 text-white/70 text-sm">
                {activeImageIndex + 1} / {activeProject.images.length}
              </div>
              <div className="flex gap-2 md:gap-3 overflow-x-auto justify-start md:justify-center pb-2">
                {activeProject.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative shrink-0 w-20 h-16 md:w-24 md:h-20 overflow-hidden rounded-md transition-all ${
                      i === activeImageIndex
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt={`Миниатюра ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}