import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      dir="rtl"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center justify-center mb-6">
          <AlertCircle size={36} className="text-[#00F0FF]" />
        </div>
        <h1 className="text-6xl font-bold text-[#E6F7FF] mb-4">404</h1>
        <p className="text-sm text-[#8CA0B3] mb-8">
          الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
        >
          <Home size={16} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
