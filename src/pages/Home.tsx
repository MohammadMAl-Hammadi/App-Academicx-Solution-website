import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import ServiceModal, { services } from "@/components/ServiceModal";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Monitor,
  Palette,
  Server,
  GraduationCap,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronLeft,
  Star,
} from "lucide-react";

// Animated counter hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return { count, ref };
}

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

const testimonials = [
  {
    name: "أحمد العلي",
    role: "طلب جامعي",
    avatar: "/images/avatar-1.jpg",
    text: "خدمة ممتازة وسريعة! أنقذوني في امتحان البرمجة وحصلت على A+. فريق محترف ومتعاون جداً.",
    rating: 5,
  },
  {
    name: "سارة القحطاني",
    role: "طالبة ماجستير",
    avatar: "/images/avatar-2.jpg",
    text: "أفضل منصة للدعم الأكاديمي. ساعدوني في إعداد بحث الماجستير باحترافية عالية وسرية تامة.",
    rating: 5,
  },
  {
    name: "فهد السبيعي",
    role: "طالب هندسة",
    avatar: "/images/avatar-3.jpg",
    text: "تعاملت معهم أكثر من مرة في مشاريع البرمجة والتصميم. دائماً يلتزمون بالمواعيد والجودة عالية.",
    rating: 5,
  },
];

const workflowSteps = [
  {
    icon: <BookOpen size={28} />,
    title: "اختر الخدمة",
    desc: "اختر من مجموعة واسعة من الخدمات الأكاديمية والتقنية",
  },
  {
    icon: <FileText size={28} />,
    title: "املأ النموذج",
    desc: "قدم تفاصيل مشروعك أو واجبك عبر النموذج الذكي",
  },
  {
    icon: <Zap size={28} />,
    title: "نبدأ العمل",
    desc: "فريقنا يبدأ العمل فوراً مع تحديثات مستمرة",
  },
  {
    icon: <Sparkles size={28} />,
    title: "استلم النتيجة",
    desc: "احصل على عملك بجودة عالية وفي الوقت المحدد",
  },
];

export default function Home() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();
  const statsQuery = trpc.stats.get.useQuery();

  const stats = statsQuery.data || {
    totalRequests: 0,
    totalProjects: 3,
    satisfactionRate: 98,
    totalVisitors: 0,
  };

  const { count: reqCount, ref: reqRef } = useCounter(stats.totalRequests);
  const { count: projCount, ref: projRef } = useCounter(stats.totalProjects);
  const { count: satCount, ref: satRef } = useCounter(stats.satisfactionRate);
  const { count: visitCount, ref: visitRef } = useCounter(stats.totalVisitors);

  const openService = (serviceId: string) => {
    setSelectedService(serviceId);
    setServiceModalOpen(true);
  };

  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060A12] via-[#0B1120] to-[#060A12]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00F0FF08_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#2E5BFF10_0%,_transparent_50%)]" />
        </div>

        {/* Animated particles via CSS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#00F0FF]"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/5 border border-[#00F0FF]/20 mb-8">
            <Sparkles size={14} className="text-[#00F0FF]" />
            <span className="text-xs text-[#00F0FF] font-medium">
              منصة الدعم الأكاديمي الأولى في الخليج
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#E6F7FF] leading-tight mb-6">
            حل واجباتك ومشاريعك
            <br />
            <span className="text-gradient">باحترافية وبدون قلق!</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8CA0B3] max-w-2xl mx-auto mb-10 leading-relaxed">
            نقدم حلولاً أكاديمية وبرمجية وتصميمية متكاملة للطلاب الجامعيين في
            السعودية ودول الخليج. فريق متخصص، جودة عالية، وسرية تامة.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => openService("homework")}
              className="shimmer-btn px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
            >
              ابدأ مشروعك الآن
            </button>
            <Link
              to="/services"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-[#E6F7FF] border border-white/10 hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 transition-all"
            >
              استكشف خدماتنا
              <ArrowLeft size={16} />
            </Link>
          </div>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16">
            {[
              { src: "/images/hero-dev.jpg", label: "تطوير" },
              { src: "/images/hero-academic.jpg", label: "أكاديمي" },
              { src: "/images/hero-design.jpg", label: "تصميم" },
              { src: "/images/hero-engineering.jpg", label: "هندسة" },
            ].map((img) => (
              <div
                key={img.label}
                className="group relative aspect-video rounded-xl overflow-hidden border border-white/5"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A12]/80 to-transparent" />
                <span className="absolute bottom-2 right-3 text-xs text-[#E6F7FF] font-medium">
                  {img.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8CA0B3]">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-[#00F0FF]" />
              <span>سرية تامة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#00F0FF]" />
              <span>تسليم سريع</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-[#00F0FF]" />
              <span>جودة عالية</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#00F0FF]" />
              <span>دعم 24/7</span>
            </div>
          </div>
        </div>

        {/* CSS for floating animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
        `}</style>
      </section>

      {/* Services Matrix */}
      <section className="relative py-24 bg-[#060A12]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00F0FF04_0%,_transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
              خدماتنا المتخصصة
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E6F7FF] mt-3">
              كل ما تحتاجه في <span className="text-gradient">مكان واحد</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => openService(service.id)}
                className="group glass-card-hover p-6 text-right cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ServiceIcon icon={service.icon} size={22} />
                </div>
                <h3 className="text-base font-bold text-[#E6F7FF] mb-2">
                  {service.nameAr}
                </h3>
                <p className="text-xs text-[#8CA0B3] leading-relaxed">
                  {service.descriptionAr}
                </p>
                <div className="flex items-center gap-1 mt-4 text-xs text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>اطلب الآن</span>
                  <ChevronLeft size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-[#0B1120] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div ref={reqRef} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {reqCount}+
              </div>
              <div className="text-xs text-[#8CA0B3]">طلب خدمة</div>
            </div>
            <div ref={projRef} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {projCount}+
              </div>
              <div className="text-xs text-[#8CA0B3]">مشروع منجز</div>
            </div>
            <div ref={satRef} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {satCount}%
              </div>
              <div className="text-xs text-[#8CA0B3]">نسبة الرضا</div>
            </div>
            <div ref={visitRef} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {visitCount}+
              </div>
              <div className="text-xs text-[#8CA0B3]">زائر</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="relative py-24 bg-[#060A12]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2E5BFF06_0%,_transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
              كيف نعمل
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E6F7FF] mt-3">
              عملية سهلة في <span className="text-gradient">4 خطوات</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="relative text-center group">
                {/* Connector line */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-gradient-to-l from-[#00F0FF]/20 to-transparent" />
                )}
                <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:bg-[#00F0FF]/10 group-hover:scale-110 transition-all">
                  {step.icon}
                </div>
                <div className="text-xs text-[#00F0FF] font-medium mb-2">
                  الخطوة {idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#E6F7FF] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8CA0B3] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 bg-[#0B1120] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
              آراء عملائنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E6F7FF] mt-3">
              ماذا يقول عنا <span className="text-gradient">عملاؤنا</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card p-6 text-right">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-[#00F0FF] fill-[#00F0FF]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#E6F7FF]/80 leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#00F0FF]/20"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#E6F7FF]">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#8CA0B3]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 via-[#2E5BFF]/10 to-[#00F0FF]/10" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E6F7FF] mb-4">
            جاهز لتحقيق التميز الأكاديمي؟
          </h2>
          <p className="text-sm text-[#8CA0B3] mb-8">
            انضم إلى آلاف الطلاب الذين يثقون بنا. ابدأ رحلتك نحو النجاح اليوم.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openService("homework")}
              className="shimmer-btn px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
            >
              اطلب خدمتك الآن
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-sm font-medium text-[#E6F7FF] border border-white/10 hover:border-[#00F0FF]/30 transition-all"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        open={serviceModalOpen}
        onOpenChange={setServiceModalOpen}
        serviceId={selectedService}
      />

      <WhatsAppCTA />
    </div>
  );
}
