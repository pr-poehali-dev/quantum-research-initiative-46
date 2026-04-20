import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Работаете ли вы с сетевыми проектами?",
    answer:
      "Да, это одно из наших ключевых направлений. Мы производим мебель тиражами для сетей ресторанов, кафе и отелей, обеспечивая единый стандарт качества и внешнего вида на всех объектах.",
  },
  {
    question: "Какие сроки изготовления для коммерческих объектов?",
    answer:
      "Сроки зависят от объёма. Меблировка одного ресторана на 80–120 мест — в среднем 6–8 недель. Для срочных открытий возможно ускоренное производство. Сроки всегда фиксируются в договоре.",
  },
  {
    question: "Помогаете ли вы с разработкой дизайна?",
    answer:
      "Да. Мы работаем как с готовыми проектами дизайнеров, так и разрабатываем концепцию мебели самостоятельно под ваш бренд и формат заведения. Предоставляем 3D-визуализацию до начала производства.",
  },
  {
    question: "Какие материалы используете для HoReCa?",
    answer:
      "Для коммерческих объектов применяем массив дуба и ясеня, износостойкий HPL-пластик, металл с порошковым покрытием. Обивка — ткани и кожзам с классом истираемости от 100 000 циклов (Martindale).",
  },
  {
    question: "Берёте ли вы ответственность за монтаж?",
    answer:
      "Да, мы организуем доставку и монтаж силами собственной бригады. Работаем в ночное время и в выходные, чтобы не мешать работе заведения. После монтажа проводим приёмку и устраняем замечания.",
  },
  {
    question: "Как запустить проект?",
    answer:
      "Напишите или позвоните — согласуем встречу или выезд на объект. Изучим ваш концепт, снимем замеры, подготовим КП с визуализацией. Договор, предоплата 30% — и запускаем производство.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}