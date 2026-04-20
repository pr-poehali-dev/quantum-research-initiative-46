import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Из каких материалов вы делаете мебель?",
    answer:
      "Мы работаем преимущественно с массивом дуба, ясеня и ореха. По запросу используем берёзовую фанеру высшего сорта и МДФ с шпоном. Вся фурнитура — от проверенных европейских производителей: Blum, Hettich, GTV.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный срок изготовления — от 4 до 8 недель в зависимости от сложности заказа. Кухонный гарнитур в среднем занимает 5–6 недель. Мы всегда согласовываем точные сроки перед подписанием договора и соблюдаем их.",
  },
  {
    question: "Делаете ли вы замеры и доставку?",
    answer:
      "Да, в стоимость проекта включены бесплатный замер и выезд нашего специалиста. Мы также организуем доставку и сборку мебели. Работаем по Москве, Подмосковью и другим регионам по договорённости.",
  },
  {
    question: "Можно ли заказать мебель нестандартных размеров?",
    answer:
      "Это наша специализация. Вся мебель изготавливается под конкретные размеры вашего помещения. Мы снимаем замеры и учитываем все особенности пространства: ниши, скосы, трубы и коммуникации.",
  },
  {
    question: "Какая гарантия на мебель?",
    answer:
      "Мы даём 2 года гарантии на все изделия. Гарантия распространяется на конструктивные элементы, покрытие и фурнитуру. На практике наша мебель служит десятилетиями — мы в этом уверены.",
  },
  {
    question: "Как начать заказ?",
    answer:
      "Напишите или позвоните нам — мы назначим бесплатную консультацию и замер. После этого подготовим 3D-визуализацию и смету. Работу начинаем после подписания договора и внесения предоплаты 30%.",
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