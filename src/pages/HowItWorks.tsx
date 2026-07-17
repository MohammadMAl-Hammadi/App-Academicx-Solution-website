import { Link } from "react-router";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  MousePointerClick,
  FileText,
  MessageCircle,
  CreditCard,
  Send,
  Download,
  Headphones,
  Shield,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <MousePointerClick size={32} />,
    title: "اختر الخدمة",
    desc: "تصفح مجموعتنا الواسعة من الخدمات واختر ما يناسب احتياجك. يمكنك الاطلاع على تفاصيل كل خدمة ومميزاتها.",
    tips: ["خدماتنا تشمل جميع التخصصات الجامعية", "يمكنك طلب أكثر من خدمة في نفس الوقت"],
  },
  {
    step: "02",
    icon: <FileText size={32} />,
    title: "املأ النموذج",
    desc: "املأ النموذج الديناميكي بتفاصيل طلبك. يتكيف النموذج تلقائياً حسب نوع الخدمة المختارة.",
    tips: ["أذكر كل المتطلبات بدقة", "أرفق الملفات إن وجدت"],
  },
  {
    step: "03",
    icon: <MessageCircle size={32} />,
    title: "تواصل عبر واتساب",
    desc: "بعد إرسال النموذج، ستتم إعادة توجيهك مباشرة لواتساب مع رسالة جاهزة تحتوي على تفاصيل طلبك.",
    tips: ["رد سريع في دقائق", "مناقشة التفاصيل مباشرة"],
  },
  {
    step: "04",
    icon: <CreditCard size={32} />,
    title: "تأكيد الطلب",
    desc: "سنرسل لك عرض سعر مفصل يتناسب مع متطلباتك. بعد التأكيد، نبدأ العمل فوراً.",
    tips: ["أسعار تنافسية وشفافة", "دفع آمن ومرن"],
  },
  {
    step: "05",
    icon: <Sparkles size={32} />,
    title: "تنفيذ العمل",
    desc: "فريقنا المتخصص يبدأ العميل مباشرة مع تحديثات دورية على تقدم العمل. يمكنك متابعة طلبك في أي وقت.",
    tips: ["جودة عالية مضمونة", "تحديثات مستمرة"],
  },
  {
    step: "06",
    icon: <Download size={32} />,
    title: "استلم النتيجة",
    desc: "استلم عملك في الوقت المحدد بجودة عالية. نقدم مراجعة مجانية إذا لزم الأمر.",
    tips: ["تسليم قبل الموعد", "مراجعة مجانية خلال 7 أيام"],
  },
];

const guarantees = [
  {
    icon: <Shield size={24} />,
    title: "سرية تامة",
    desc: "نضمن حماية كاملة لبياناتك وهويتك",
  },
  {
    icon: <Clock size={24} />,
    title: "التزام بالمواعيد",
    desc: "نلتزم بتواريخ التسليم المتفق عليها",
  },
  {
    icon: <Headphones size={24} />,
    title: "دعم مستمر",
    desc: "متاحون على مدار الساعة للإجابة على استفساراتك",
  },
];

export default function HowItWorks() {
  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Header */}
      <section className="relative py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            كيفية الطلب
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            رحلتك نحو النجاح في{" "}
            <span className="text-gradient">6 خطوات</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            عملية سهلة وواضحة من اختيار الخدمة إلى استلام النتيجة. نرافقك في
            كل خطوة.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="space-y-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#2E5BFF]/20 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-3">
                  {s.icon}
                </div>
                <span className="text-2xl font-bold text-[#00F0FF]/30">
                  {s.step}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#E6F7FF] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#8CA0B3] leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tips.map((tip, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-[#00F0FF]/5 text-[#00F0FF] border border-[#00F0FF]/10"
                    >
                      <CheckCircle2 size={10} />
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E6F7FF]">
            ضماناتنا <span className="text-gradient">لك</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {guarantees.map((g, idx) => (
            <div key={idx} className="glass-card p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-4">
                {g.icon}
              </div>
              <h3 className="text-base font-bold text-[#E6F7FF] mb-2">
                {g.title}
              </h3>
              <p className="text-xs text-[#8CA0B3] leading-relaxed">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-[#E6F7FF] mb-4">
          جاهز للبدء؟
        </h2>
        <p className="text-sm text-[#8CA0B3] mb-6">
          ابدأ رحلتك نحو التميز الأكاديمي اليوم.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/services"
            className="shimmer-btn px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
          >
            تصفح الخدمات
          </Link>
          <a
            href="https://wa.me/967730087023"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-[#E6F7FF] border border-white/10 hover:border-[#00F0FF]/30 transition-all"
          >
            <Send size={14} />
            تواصل مباشرة
          </a>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
