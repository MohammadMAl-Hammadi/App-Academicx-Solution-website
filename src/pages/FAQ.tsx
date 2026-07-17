import { useState } from "react";
import { trpc } from "@/providers/trpc";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

const defaultFaqs = [
  {
    id: 1,
    questionAr: "ما هي الخدمات التي يقدمها أكاديميكس سوليوشن؟",
    answerAr:
      "نقدم خدمات شاملة تشمل: حل الواجبات الجامعية، المساعدة في الامتحانات، تطوير المشاريع البرمجية، إعداد التقارير البحثية، التصميم الجرافيكي، تصميم وتطوير المواقع الإلكترونية، وخدمات الاستضافة.",
  },
  {
    id: 2,
    questionAr: "كيف أطلب خدمة؟",
    answerAr:
      "ما عليك سوى الانتقال إلى صفحة الخدمات وتحديد الخدمة التي تحتاجها وتعبئة النموذج الديناميكي بمتطلباتك. ستتم إعادة توجيهك تلقائياً لواتساب لإتمام الطلب.",
  },
  {
    id: 3,
    questionAr: "ما هي هيكلية الأسعار؟",
    answerAr:
      "تختلف الأسعار بناءً على تعقيد الخدمة والاستعجال والمستوى الأكاديمي. تواصل معنا عبر الواتساب للحصول على عرض سعر مخصص يناسب احتياجاتك.",
  },
  {
    id: 4,
    questionAr: "ما مدى سرعة إنجاز واجبي؟",
    answerAr:
      "نحن نتعامل مع الطلبات العاجلة مع أوقات تسليم تصل إلى 3 ساعات للواجبات القياسية. قد تتطلب المشاريع المعقدة وأوراق البحث من 24 إلى 72 ساعة حسب النطاق.",
  },
  {
    id: 5,
    questionAr: "هل يتم الحفاظ على سرية معلوماتي؟",
    answerAr:
      "بالتأكيد. نحن نعطي الأولوية لخصوصية العملاء ونحافظ على السرية التامة لجميع التفاعلات والتسليمات والمعلومات الشخصية. بياناتك لا تشارك أبدًا مع أطراف ثالثة.",
  },
  {
    id: 6,
    questionAr: "هل تقدمون تعديلات؟",
    answerAr:
      "نعم، نقدم تعديلات مجانية غير محدودة خلال 7 أيام من التسليم لضمان الرضا التام عن النتيجة النهائية.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const faqQuery = trpc.faq.list.useQuery();

  const dbFaqs = faqQuery.data || [];
  const allFaqs = dbFaqs.length > 0
    ? dbFaqs.map((f: any) => ({ id: f.id, questionAr: f.questionAr, answerAr: f.answerAr }))
    : defaultFaqs;

  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Header */}
      <section className="relative py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            الأسئلة الشائعة
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            إجابات على <span className="text-gradient">استفساراتك</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            إليك الإجابات على الأسئلة الأكثر شيوعاً. إذا لم تجد إجابتك، تواصل
            معنا مباشرة.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <div className="space-y-3">
          {allFaqs.map((faq: any) => (
            <div
              key={faq.id}
              className={`glass-card overflow-hidden transition-all ${
                openId === faq.id ? "border-[#00F0FF]/30" : ""
              }`}
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle
                    size={18}
                    className={`shrink-0 transition-colors ${
                      openId === faq.id
                        ? "text-[#00F0FF]"
                        : "text-[#8CA0B3]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      openId === faq.id
                        ? "text-[#00F0FF]"
                        : "text-[#E6F7FF]"
                    }`}
                  >
                    {faq.questionAr}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#8CA0B3] transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-5 pr-12">
                  <p className="text-sm text-[#8CA0B3] leading-relaxed">
                    {faq.answerAr}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="max-w-xl mx-auto px-4 text-center">
        <div className="glass-card p-8">
          <MessageCircle
            size={40}
            className="text-[#00F0FF] mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-[#E6F7FF] mb-2">
            لم تجد إجابتك؟
          </h2>
          <p className="text-sm text-[#8CA0B3] mb-6">
            فريقنا جاهز للإجابة على جميع استفساراتك. تواصل معنا مباشرة.
          </p>
          <a
            href="https://wa.me/967730087023"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
          >
            <MessageCircle size={16} />
            تواصل عبر واتساب
          </a>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
