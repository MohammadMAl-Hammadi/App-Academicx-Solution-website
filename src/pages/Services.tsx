import { useState } from "react";
import ServiceModal, { services } from "@/components/ServiceModal";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  BookOpen,
  FileText,
  Monitor,
  Palette,
  Server,
  GraduationCap,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function ServiceIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const props = { size, className: "text-[#00F0FF]" };
  switch (icon) {
    case "book":
      return <BookOpen {...props} />;
    case "graduation":
      return <GraduationCap {...props} />;
    case "monitor":
      return <Monitor {...props} />;
    case "file":
      return <FileText {...props} />;
    case "palette":
      return <Palette {...props} />;
    case "server":
      return <Server {...props} />;
    default:
      return <BookOpen {...props} />;
  }
}

const serviceDetails: Record<string, { features: string[]; image: string }> = {
  homework: {
    features: [
      "حل واجبات في جميع التخصصات",
      "شرح مفصل للحلول",
      "التزام تام بالمواعيد",
      "مراجعة مجانية",
    ],
    image: "/images/hero-academic.jpg",
  },
  exam: {
    features: [
      "تحضير شامل للامتحانات",
      "مساعدة أونلاين في الوقت الفعلي",
      "مراجعات واختبارات تجريبية",
      "سرية تامة",
    ],
    image: "/images/hero-engineering.jpg",
  },
  project: {
    features: [
      "تطوير بأحدث التقنيات",
      "كود نظيف وموثق",
      "دعم فني مستمر",
      "تسليم شامل مع شرح",
    ],
    image: "/images/hero-dev.jpg",
  },
  research: {
    features: [
      "مراجعات أكاديمية موثقة",
      "صياغة علمية دقيقة",
      "تنسيق APA / MLA / Harvard",
      "فحص انتحال مجاني",
    ],
    image: "/images/portfolio-3.jpg",
  },
  design: {
    features: [
      "تصاميم احترافية فريدة",
      "تعديلات غير محدودة",
      "ملفات المصدر مجاناً",
      "تسليم بجميع الصيغ",
    ],
    image: "/images/hero-design.jpg",
  },
  website: {
    features: [
      "تصميم ريسبونسيف متكامل",
      "تحسين محركات البحث",
      "أداء سريع وآمن",
      "دعم وصيانة لمدة سنة",
    ],
    image: "/images/portfolio-2.jpg",
  },
  hosting: {
    features: [
      "سيرفرات سريعة وآمنة",
      "نسخ احتياطي يومي",
      "دعم فني 24/7",
      "شهادة SSL مجانية",
    ],
    image: "/images/portfolio-1.jpg",
  },
};

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const openService = (serviceId: string) => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Header */}
      <section className="relative py-16 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            خدماتنا المتميزة
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            حلول <span className="text-gradient">شاملة ومتكاملة</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            نقدم مجموعة واسعة من الخدمات الأكاديمية والتقنية المصممة خصيصاً
            لمساعدتك في تحقيق أهدافك. كل خدمة تُنفذ باحترافية وسرية تامة.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const detail = serviceDetails[service.id];
            return (
              <div
                key={service.id}
                className="glass-card group overflow-hidden hover:border-[#00F0FF]/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={detail?.image || "/images/hero-dev.jpg"}
                    alt={service.nameAr}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/50 to-transparent" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center backdrop-blur-sm">
                    <ServiceIcon icon={service.icon} size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#E6F7FF] mb-2">
                    {service.nameAr}
                  </h3>
                  <p className="text-xs text-[#8CA0B3] mb-4 leading-relaxed">
                    {service.descriptionAr}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {detail?.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-[#8CA0B3]/80"
                      >
                        <CheckCircle2
                          size={12}
                          className="text-[#00F0FF] shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openService(service.id)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    اطلب الخدمة
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
              لماذا نحن
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E6F7FF] mt-3">
              ما يميز <span className="text-gradient">أكاديميكس سوليوشن</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles size={24} />,
                title: "جودة عالية",
                desc: "نلتزم بأعلى معايير الجودة في كل عمل نقوم به",
              },
              {
                icon: <CheckCircle2 size={24} />,
                title: "سرية تامة",
                desc: "خصوصيتك هي أولويتنا. معلوماتك آمنة 100%",
              },
              {
                icon: <Monitor size={24} />,
                title: "فريق متخصص",
                desc: "خبراء في مختلف المجالات الأكاديمية والتقنية",
              },
              {
                icon: <Server size={24} />,
                title: "دعم 24/7",
                desc: "متاحون على مدار الساعة للإجابة على استفساراتك",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:bg-[#00F0FF]/10 group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#E6F7FF] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8CA0B3] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        serviceId={selectedService}
      />
      <WhatsAppCTA />
    </div>
  );
}
