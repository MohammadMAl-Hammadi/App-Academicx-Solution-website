import { useState } from "react";
import { trpc } from "@/providers/trpc";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import {
  ExternalLink,
  ChevronLeft,
  X,
  Code2,
  Palette,
  GraduationCap,
  Globe,
  Layers,
} from "lucide-react";

const categories = [
  { id: "all", labelAr: "الكل", icon: <Layers size={14} /> },
  { id: "programming", labelAr: "برمجة", icon: <Code2 size={14} /> },
  { id: "design", labelAr: "تصميم", icon: <Palette size={14} /> },
  { id: "academic", labelAr: "أكاديمي", icon: <GraduationCap size={14} /> },
  { id: "website", labelAr: "مواقع", icon: <Globe size={14} /> },
];

const defaultProjects = [
  {
    id: 1,
    title: "University Management Dashboard",
    titleAr: "لوحة إدارة الجامعة",
    description: "Analytics dashboard for university administrators",
    descriptionAr: "لوحة تحليلات لمسؤولي الجامعة",
    category: "programming",
    imageUrl: "/images/portfolio-1.jpg",
    tags: "React,TypeScript,Node.js",
  },
  {
    id: 2,
    title: "E-Commerce Mobile App",
    titleAr: "تطبيق التجارة الإلكترونية",
    description: "Sleek mobile shopping experience",
    descriptionAr: "تجربة تسوق جوال أنيقة",
    category: "website",
    imageUrl: "/images/portfolio-2.jpg",
    tags: "React Native,Mobile,UI/UX",
  },
  {
    id: 3,
    title: "AI Research Platform",
    titleAr: "منصة البحث الذكي",
    description: "ML powered research assistant",
    descriptionAr: "مساعد بحث يعمل بالتعلم الآلي",
    category: "programming",
    imageUrl: "/images/portfolio-3.jpg",
    tags: "Python,AI,ML,NLP",
  },
  {
    id: 4,
    title: "Academic Writing Service",
    titleAr: "خدمة الكتابة الأكاديمية",
    description: "Professional academic content writing",
    descriptionAr: "كتابة محتوى أكاديمي احترافي",
    category: "academic",
    imageUrl: "/images/hero-academic.jpg",
    tags: "Research,Writing,APA",
  },
  {
    id: 5,
    title: "Brand Identity Design",
    titleAr: "تصميم هوية بصرية",
    description: "Complete branding package for startups",
    descriptionAr: "باقة هوية متكاملة للشركات الناشئة",
    category: "design",
    imageUrl: "/images/hero-design.jpg",
    tags: "Branding,Logo,Identity",
  },
  {
    id: 6,
    title: "Engineering Workspace",
    titleAr: "مساحة عمل هندسية",
    description: "Digital engineering and CAD solutions",
    descriptionAr: "حلول هندسية رقمية وCAD",
    category: "programming",
    imageUrl: "/images/hero-engineering.jpg",
    tags: "CAD,Engineering,3D",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<(typeof defaultProjects)[0] | null>(null);

  const projectsQuery = trpc.project.list.useQuery();
  const dbProjects = projectsQuery.data || [];

  const allProjects = [...defaultProjects, ...(dbProjects as any[])];

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div dir="rtl" className="pt-28 pb-16">
      {/* Header */}
      <section className="relative py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs text-[#00F0FF] font-medium tracking-wider uppercase">
            معرض أعمالنا
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6F7FF] mt-3 mb-4">
            نماذج من <span className="text-gradient">أعمالنا</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8CA0B3] max-w-2xl mx-auto leading-relaxed">
            استعرض مجموعة من المشاريع التي أنجزناها لعملائنا. كل مشروع يعكس
            التزامنا بالجودة والإبداع.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-5xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12]"
                  : "text-[#8CA0B3] bg-white/5 border border-white/10 hover:border-[#00F0FF]/30"
              }`}
            >
              {cat.icon}
              {cat.labelAr}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group glass-card overflow-hidden text-right cursor-pointer hover:border-[#00F0FF]/30 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl || "/images/hero-dev.jpg"}
                  alt={project.titleAr}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <ExternalLink size={14} className="text-[#00F0FF]" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[#E6F7FF] mb-1">
                  {project.titleAr}
                </h3>
                <p className="text-xs text-[#8CA0B3] mb-3">
                  {project.descriptionAr}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.split(",").map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-[#00F0FF]/5 text-[#00F0FF] border border-[#00F0FF]/10"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-[#060A12]/90 backdrop-blur-sm" />
          <div
            className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8CA0B3] hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all z-10"
            >
              <X size={16} />
            </button>
            <div className="h-56 overflow-hidden">
              <img
                src={selectedProject.imageUrl || "/images/hero-dev.jpg"}
                alt={selectedProject.titleAr}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#E6F7FF] mb-2">
                {selectedProject.titleAr}
              </h2>
              <p className="text-sm text-[#8CA0B3] mb-4">
                {selectedProject.descriptionAr}
              </p>
              {selectedProject.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.split(",").map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-[#00F0FF]/5 text-[#00F0FF] border border-[#00F0FF]/20"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <a
                href="https://wa.me/967730087023"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
              >
                اطلب مشروع مشابه
                <ChevronLeft size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      <WhatsAppCTA />
    </div>
  );
}
