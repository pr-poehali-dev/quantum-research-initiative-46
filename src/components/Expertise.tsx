import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "./ui/icon"

const expertiseAreas = [
  {
    title: "Рестораны и кафе",
    description: "Столы, стулья, барные стойки и диванные зоны. Создаём атмосферу, которая возвращает гостей снова и снова.",
    icon: "UtensilsCrossed",
  },
  {
    title: "Отели и апартаменты",
    description:
      "Мебель для номеров, лобби, ресепшн и переговорных. Единый стиль, износостойкость и соответствие классу объекта.",
    icon: "BedDouble",
  },
  {
    title: "Бары и лаунж",
    description:
      "Барные стойки, высокие столики, мягкие зоны. Проектируем пространства, где гости задерживаются дольше.",
    icon: "Wine",
  },
  {
    title: "Корпоративные объекты",
    description:
      "Офисы, переговорные, коворкинги и reception-зоны. Мебель, которая отражает статус компании и удобна в работе.",
    icon: "Briefcase",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Решения</HighlightedText> для каждого
            <br />
            формата HoReCa
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Производим мебель для ресторанов, отелей, баров и корпоративных пространств. Работаем с открытиями, ребрендингами и сетевыми проектами.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} size={40} className="mb-4 text-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}