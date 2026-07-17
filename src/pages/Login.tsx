import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, GraduationCap } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#060A12]"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060A12] via-[#0B1120] to-[#060A12]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00F0FF06_0%,_transparent_70%)]" />
      </div>

      <Card className="relative w-full max-w-sm bg-[#0B1120] border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center mb-4">
            <GraduationCap size={28} className="text-[#00F0FF]" />
          </div>
          <CardTitle className="text-xl font-bold text-[#E6F7FF]">
            تسجيل الدخول
          </CardTitle>
          <p className="text-xs text-[#8CA0B3] mt-2">
            سجل دخولك للوصول إلى لوحة التحكم
          </p>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full py-3 h-auto rounded-xl text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            <LogIn size={16} className="ml-2" />
            تسجيل الدخول
          </Button>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-[#8CA0B3] hover:text-[#00F0FF] transition-colors"
            >
              العودة للرئيسية
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
