import { trpc } from "@/providers/trpc";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  Target,
  Eye,
  Shield,
  Zap,
  Users,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";

const values = [
  {
    icon: <Shield size={24} />,
    title: "السرية",
    desc: "نحافظ على سرية كاملة لبياناتك ومعلوماتك. ثقتك هي رأس مالنا.",
  },
  {
    icon: <Award size={24} />,
    title: "الجودة",
    desc: "نلتزم بأعلى معايير الجودة في كل عمل نقوم به. التميز هو هدفنا.",
  },
  {
    icon: <Zap size={24} />,
    title: "السرعة",
    desc: "نحترم وقتك ونلتزم بالمواعيد المحددة دون تأخير.",
  },
  {
    icon: <Heart size={24} />,
    title: "الشغف",
    desc: "نحب ما نعمله ونضع كل طاقتنا في مساعدتك على النجاح.",
  },
  {
    icon: <Users size={24} />,
    title: "الفريق",
    desc: "فريق متخصص من الخبراء في مختلف المجالات الأكاديمية والتقنية.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "التطوير",
    desc: "نستمر في التعلم والتطوير لنقدم لك أفضل الحلول المبتكرة.",
  },
];

export default function About() {
  const statsQuery = trpc.stats.get.useQuery();
  const stats = statsQuery.data || {
    totalRequests: 0,
    totalProjects: 3,
    satisfactionRate: 98,
  };

  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Hero */}
      <section className="relative py-16 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            من نحن
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            أكاديميكس <span className="text-gradient">سوليوشن</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            منصة رائدة في تقديم الحلول الأكاديمية والتقنية للطلاب الجامعيين في
            السعودية ودول الخليج العربي. نؤمن بأن كل طالب يستحق الدعم لتحقيق
            أحلامه.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-6">
              <Target size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#E6F7FF] mb-4">
              مهمتنا
            </h2>
            <p className="text-sm text-[#8CA0B3] leading-relaxed">
              تمكين الطلاب الجامعيين من تحقيق التميز الأكاديمي من خلال تقديم حلول
              مبتكرة وموثوقة. نسعى لأن نكون الشريك المفضل لكل طالب يسعى للنجاح
              والتفوق في مسيرته الدراسية.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#2E5BFF]/10 border border-[#2E5BFF]/20 flex items-center justify-center text-[#2E5BFF] mb-6">
              <Eye size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#E6F7FF] mb-4">
              رؤيتنا
            </h2>
            <p className="text-sm text-[#8CA0B3] leading-relaxed">
              أن نصبح المنصة الأكثر موثوقية وابتكاراً في تقديم الخدمات الأكاديمية
              والتقنية في العالم العربي. نطمح لبناء مجتمع من الطلاج الناجحين
              الذين يثقون بنا كشريك في رحلتهم التعليمية.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">
                {stats.totalRequests}+
              </div>
              <div className="text-xs text-[#8CA0B3]">طلب خدمة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">
                {stats.totalProjects}+
              </div>
              <div className="text-xs text-[#8CA0B3]">مشروع منجز</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">
                {stats.satisfactionRate}%
              </div>
              <div className="text-xs text-[#8CA0B3]">نسبة الرضا</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">
                24/7
              </div>
              <div className="text-xs text-[#8CA0B3]">دعم مستمر</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            قيمنا
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E6F7FF] mt-3">
            المبادئ التي <span className="text-gradient">نؤمن بها</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="glass-card p-6 group hover:border-[#00F0FF]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] mb-4 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-[#E6F7FF] mb-2">
                {v.title}
              </h3>
              <p className="text-xs text-[#8CA0B3] leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#E6F7FF] mb-4">
            انضم إلى رحلة النجاح
          </h2>
          <p className="text-sm text-[#8CA0B3] mb-6">
            نحن هنا لمساعدتك في كل خطوة. ابدأ اليوم واستثمر في مستقبلك.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/967730087023"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
