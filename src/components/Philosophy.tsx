import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Коммерческая прочность",
    description:
      "Мебель для HoReCa работает в условиях высокой нагрузки. Мы используем усиленные конструкции и износостойкие покрытия, которые выдерживают годы интенсивной эксплуатации.",
  },
  {
    title: "Эстетика бренда",
    description:
      "Каждый проект создаётся под концепцию заведения. Мебель становится частью фирменного стиля — от ресторана высокой кухни до сети отелей.",
  },
  {
    title: "Под планировку зала",
    description:
      "Изготавливаем мебель под конкретные размеры и планировку пространства. Нестандартные формы, радиусы, встроенные элементы — всё возможно.",
  },
  {
    title: "Поставки под ключ",
    description: "Берём на себя полный цикл: проект, производство, доставку и монтаж. Работаем с сетями и открытием новых объектов в сжатые сроки.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
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
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наша философия</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Мебель для
              <br />
              <HighlightedText>бизнеса</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/faae0d53-f144-42c6-9f08-78d5980629ff/files/bd7a09a9-c969-4beb-bb31-8362df882f5e.jpg"
                alt="Эскиз ресторанной мебели"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Мебель для HoReCa — это инвестиция в атмосферу и репутацию заведения. Мы создаём изделия, которые работают на ваш бизнес каждый день.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}