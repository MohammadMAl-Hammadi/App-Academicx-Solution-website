import { useState } from "react";
import { trpc } from "@/providers/trpc";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Instagram,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const socialLinks = [
  {
    icon: <Instagram size={20} />,
    label: "انستغرام",
    handle: "academix__solution",
    href: "https://instagram.com/academix__solution",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 2L2.5 10.3c-.7.3-.7 1.1 0 1.4l4.4 1.5 1.6 5.2c.2.5.8.7 1.2.4l2.3-1.8 4.5 3.3c.5.4 1.2.1 1.3-.5L22.5 3c.1-.6-.5-1.1-1-.9l-19.5 8.2"/></svg>
    ),
    label: "تيليجرام",
    handle: "AcademicxSolution",
    href: "https://t.me/AcademicxSolution",
  },
  {
    icon: <MessageCircle size={20} />,
    label: "واتساب",
    handle: "+967 730 087 023",
    href: "https://wa.me/967730087023",
  },
  {
    icon: <Mail size={20} />,
    label: "البريد",
    handle: "academicx.solution@gmail.com",
    href: "mailto:academicx.solution@gmail.com",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const createMessage = trpc.contact.create.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "الاسم مطلوب";
    if (!email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "بريد إلكتروني غير صالح";
    if (!subject.trim()) newErrors.subject = "الموضوع مطلوب";
    if (!message.trim()) newErrors.message = "الرسالة مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createMessage.mutate({ name, email, subject, message });
  };

  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Header */}
      <section className="relative py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            تواصل معنا
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            نحن هنا <span className="text-gradient">لمساعدتك</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            فريقنا جاهز للإجابة على جميع استفساراتك. تواصل معنا عبر أي من
            القنوات التالية.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-lg font-bold text-[#E6F7FF] mb-6">
                أرسل رسالتك
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2
                    size={48}
                    className="text-[#00F0FF] mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-[#E6F7FF] mb-2">
                    تم الإرسال بنجاح!
                  </h3>
                  <p className="text-sm text-[#8CA0B3]">
                    سنرد عليك في أقرب وقت ممكن.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#8CA0B3] mb-1">
                        الاسم *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors((p) => ({ ...p, name: "" }));
                        }}
                        className={`w-full px-3 py-2.5 bg-[#1B2838]/60 border rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all ${
                          errors.name
                            ? "border-red-500/50"
                            : "border-white/10"
                        }`}
                        placeholder="اسمك الكامل"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-400 mt-1">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#8CA0B3] mb-1">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email)
                            setErrors((p) => ({ ...p, email: "" }));
                        }}
                        className={`w-full px-3 py-2.5 bg-[#1B2838]/60 border rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all ${
                          errors.email
                            ? "border-red-500/50"
                            : "border-white/10"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 mt-1">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#8CA0B3] mb-1">
                      الموضوع *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject)
                          setErrors((p) => ({ ...p, subject: "" }));
                      }}
                      className={`w-full px-3 py-2.5 bg-[#1B2838]/60 border rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all ${
                        errors.subject
                          ? "border-red-500/50"
                          : "border-white/10"
                      }`}
                      placeholder="موضوع الرسالة"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-400 mt-1">
                        {errors.subject}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-[#8CA0B3] mb-1">
                      الرسالة *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message)
                          setErrors((p) => ({ ...p, message: "" }));
                      }}
                      rows={5}
                      className={`w-full px-3 py-2.5 bg-[#1B2838]/60 border rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all resize-none ${
                        errors.message
                          ? "border-red-500/50"
                          : "border-white/10"
                      }`}
                      placeholder="اكتب رسالتك هنا..."
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-400 mt-1">
                        {errors.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={createMessage.isPending}
                    className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {createMessage.isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
                تواصل عبر
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#E6F7FF]">
                        {link.label}
                      </div>
                      <div className="text-[11px] text-[#8CA0B3]">
                        {link.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
                معلومات التواصل
              </h3>
              <div className="space-y-3 text-sm text-[#8CA0B3]">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#00F0FF] shrink-0" />
                  <span>academicx.solution@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#00F0FF] shrink-0" />
                  <span dir="ltr">+967 730 087 023</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#00F0FF] shrink-0" />
                  <span>السعودية ودول الخليج العربي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppCTA />
    </div>
  );
}
