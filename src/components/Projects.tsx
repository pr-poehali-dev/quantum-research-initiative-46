import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

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
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

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
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
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
    </section>
  )
}