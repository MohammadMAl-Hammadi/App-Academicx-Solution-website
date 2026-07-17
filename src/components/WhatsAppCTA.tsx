import { MessageCircle } from "lucide-react";

interface WhatsAppCTAProps {
  message?: string;
  className?: string;
}

export default function WhatsAppCTA({
  message = "مرحباً، أود الاستفسار عن خدماتكم",
  className = "",
}: WhatsAppCTAProps) {
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/967730087023?text=${encodedMessage}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-110 transition-all duration-300 group ${className}`}
    >
      <MessageCircle
        size={24}
        className="text-[#060A12] group-hover:animate-pulse"
      />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#0B1120] border border-white/10 rounded-lg text-xs text-[#E6F7FF] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        تواصل عبر واتساب
      </span>
    </a>
  );
}
