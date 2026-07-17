import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart3,
  Users,
  MessageSquare,
  FolderKanban,
  Download,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  BarChart,
} from "lucide-react";

function ExportButton({ data, filename, label }: { data: any[]; filename: string; label: string }) {
  const handleExport = () => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] bg-white/5 border border-white/10 text-[#8CA0B3] hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all"
    >
      <Download size={12} />
      {label}
    </button>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const [activeTab, setActiveTab] = useState<"requests" | "messages" | "analytics">("requests");
  const [reqPage, setReqPage] = useState(1);
  const [msgPage, setMsgPage] = useState(1);
  const [reqFilter, setReqFilter] = useState<Record<string, string>>({});
  const [msgFilter, setMsgFilter] = useState<Record<string, string>>({});

  const statsQuery = trpc.stats.get.useQuery();
  const dashboardQuery = trpc.stats.getDashboard.useQuery();
  const requestsQuery = trpc.serviceRequest.list.useQuery(
    { page: reqPage, limit: 10, ...reqFilter },
    { enabled: activeTab === "requests" }
  );
  const messagesQuery = trpc.contact.list.useQuery(
    { page: msgPage, limit: 10, ...msgFilter },
    { enabled: activeTab === "messages" }
  );

  const updateReqStatus = trpc.serviceRequest.updateStatus.useMutation({
    onSuccess: () => requestsQuery.refetch(),
  });
  const deleteReq = trpc.serviceRequest.delete.useMutation({
    onSuccess: () => requestsQuery.refetch(),
  });
  const updateMsgStatus = trpc.contact.updateStatus.useMutation({
    onSuccess: () => messagesQuery.refetch(),
  });
  const deleteMsg = trpc.contact.delete.useMutation({
    onSuccess: () => messagesQuery.refetch(),
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060A12]">
        <Loader2 size={32} className="text-[#00F0FF] animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  const stats = statsQuery.data || { totalRequests: 0, totalMessages: 0, totalProjects: 0, totalVisitors: 0, satisfactionRate: 98 };
  const dashboard = dashboardQuery.data;
  const requests = requestsQuery.data || { items: [], total: 0 };
  const messages = messagesQuery.data || { items: [], total: 0 };

  const statCards = [
    { label: "إجمالي الطلبات", value: stats.totalRequests, icon: <FolderKanban size={20} />, color: "#00F0FF" },
    { label: "رسائل التواصل", value: stats.totalMessages, icon: <MessageSquare size={20} />, color: "#2E5BFF" },
    { label: "المشاريع", value: stats.totalProjects, icon: <BarChart3 size={20} />, color: "#00F0FF" },
    { label: "الزوار", value: stats.totalVisitors, icon: <Users size={20} />, color: "#2E5BFF" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    read: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    replied: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const statusLabels: Record<string, string> = {
    new: "جديد",
    in_progress: "قيد التنفيذ",
    completed: "مكتمل",
    cancelled: "ملغي",
    read: "مقروء",
    replied: "تم الرد",
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#060A12] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#E6F7FF]">
            لوحة التحكم
          </h1>
          <p className="text-sm text-[#8CA0B3] mt-1">
            نظرة شاملة على أداء المنصة والطلبات
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${card.color}15`, border: `1px solid ${card.color}25`, color: card.color }}
                >
                  {card.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-[#E6F7FF] mb-1">
                {card.value}
              </div>
              <div className="text-xs text-[#8CA0B3]">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Analytics Summary */}
        {dashboard && (
          <div className="glass-card p-5 mb-8">
            <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
              نظرة تحليلية سريعة
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-[#8CA0B3] mb-2">الطلبات حسب الخدمة</div>
                <div className="space-y-1.5">
                  {dashboard.requestsByService.map((item: any) => (
                    <div key={item.service} className="flex items-center justify-between text-xs">
                      <span className="text-[#E6F7FF]">{item.service}</span>
                      <span className="text-[#00F0FF]">{item.count}</span>
                    </div>
                  ))}
                  {dashboard.requestsByService.length === 0 && (
                    <span className="text-xs text-[#8CA0B3]/50">لا توجد بيانات</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8CA0B3] mb-2">الطلبات حسب الحالة</div>
                <div className="space-y-1.5">
                  {dashboard.requestsByStatus.map((item: any) => (
                    <div key={item.status} className="flex items-center justify-between text-xs">
                      <span className="text-[#E6F7FF]">{statusLabels[item.status] || item.status}</span>
                      <span className="text-[#00F0FF]">{item.count}</span>
                    </div>
                  ))}
                  {dashboard.requestsByStatus.length === 0 && (
                    <span className="text-xs text-[#8CA0B3]/50">لا توجد بيانات</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8CA0B3] mb-2">أفضل الجامعات</div>
                <div className="space-y-1.5">
                  {dashboard.topUniversities.slice(0, 5).map((item: any) => (
                    <div key={item.university} className="flex items-center justify-between text-xs">
                      <span className="text-[#E6F7FF] truncate max-w-[120px]">{item.university}</span>
                      <span className="text-[#00F0FF]">{item.count}</span>
                    </div>
                  ))}
                  {dashboard.topUniversities.length === 0 && (
                    <span className="text-xs text-[#8CA0B3]/50">لا توجد بيانات</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "requests"
                ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20"
                : "text-[#8CA0B3] hover:text-[#E6F7FF]"
            }`}
          >
            <FolderKanban size={14} />
            طلبات الخدمات
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "messages"
                ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20"
                : "text-[#8CA0B3] hover:text-[#E6F7FF]"
            }`}
          >
            <MessageSquare size={14} />
            رسائل التواصل
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20"
                : "text-[#8CA0B3] hover:text-[#E6F7FF]"
            }`}
          >
            <BarChart size={14} />
            التحليلات
          </button>
        </div>

        {/* Requests Table */}
        {activeTab === "requests" && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-[#8CA0B3]">
                <Filter size={12} />
                <span>تصفية:</span>
              </div>
              <select
                value={reqFilter.status || ""}
                onChange={(e) => {
                  setReqPage(1);
                  setReqFilter((p) => ({
                    ...p,
                    status: e.target.value,
                  }));
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-[#1B2838]/60 border border-white/10 text-[#E6F7FF] focus:outline-none focus:border-[#00F0FF]/30"
              >
                <option value="">جميع الحالات</option>
                <option value="new">جديد</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
              <input
                type="text"
                placeholder="الجامعة..."
                value={reqFilter.university || ""}
                onChange={(e) => {
                  setReqPage(1);
                  setReqFilter((p) => ({ ...p, university: e.target.value }));
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-[#1B2838]/60 border border-white/10 text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:outline-none focus:border-[#00F0FF]/30 w-32"
              />
              <div className="mr-auto">
                <ExportButton
                  data={requests.items}
                  filename="service-requests.csv"
                  label="تصدير CSV"
                />
              </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الخدمة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">المادة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الجامعة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الحالة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">التاريخ</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.items.map((req: any) => (
                    <tr key={req.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-xs text-[#E6F7FF]">{req.serviceType}</td>
                      <td className="px-4 py-3 text-xs text-[#E6F7FF]">{req.subject}</td>
                      <td className="px-4 py-3 text-xs text-[#8CA0B3]">{req.university}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] border ${statusColors[req.status] || ""}`}>
                          {statusLabels[req.status] || req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-[#8CA0B3]">
                        {new Date(req.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <select
                            value={req.status}
                            onChange={(e) =>
                              updateReqStatus.mutate({
                                id: req.id,
                                status: e.target.value as any,
                              })
                            }
                            className="text-[10px] bg-[#1B2838]/60 border border-white/10 rounded px-1 py-0.5 text-[#E6F7FF] focus:outline-none"
                          >
                            <option value="new">جديد</option>
                            <option value="in_progress">قيد التنفيذ</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                          <button
                            onClick={() => {
                              if (confirm("هل أنت متأكد من الحذف؟"))
                                deleteReq.mutate({ id: req.id });
                            }}
                            className="p-1 rounded text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {requests.items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-xs text-[#8CA0B3]/50">
                        لا توجد طلبات
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {requests.total > 0 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] text-[#8CA0B3]">
                  إجمالي: {requests.total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReqPage((p) => Math.max(1, p - 1))}
                    disabled={reqPage === 1}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#8CA0B3] hover:text-[#00F0FF] disabled:opacity-30 transition-all"
                  >
                    <ChevronRight size={14} />
                  </button>
                  <span className="text-[11px] text-[#8CA0B3]">
                    صفحة {reqPage}
                  </span>
                  <button
                    onClick={() => setReqPage((p) => p + 1)}
                    disabled={requests.items.length < 10}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#8CA0B3] hover:text-[#00F0FF] disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Messages Table */}
        {activeTab === "messages" && (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-[#8CA0B3]">
                <Filter size={12} />
                <span>تصفية:</span>
              </div>
              <select
                value={msgFilter.status || ""}
                onChange={(e) => {
                  setMsgPage(1);
                  setMsgFilter((p) => ({
                    ...p,
                    status: e.target.value,
                  }));
                }}
                className="px-2 py-1 rounded-md text-[11px] bg-[#1B2838]/60 border border-white/10 text-[#E6F7FF] focus:outline-none focus:border-[#00F0FF]/30"
              >
                <option value="">جميع الحالات</option>
                <option value="new">جديد</option>
                <option value="read">مقروء</option>
                <option value="replied">تم الرد</option>
              </select>
              <div className="mr-auto">
                <ExportButton
                  data={messages.items}
                  filename="contact-messages.csv"
                  label="تصدير CSV"
                />
              </div>
            </div>

            <div className="glass-card overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الاسم</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">البريد</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الموضوع</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الرسالة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">الحالة</th>
                    <th className="px-4 py-3 text-[11px] text-[#8CA0B3] font-medium">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.items.map((msg: any) => (
                    <tr key={msg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-xs text-[#E6F7FF]">{msg.name}</td>
                      <td className="px-4 py-3 text-[11px] text-[#8CA0B3]">{msg.email}</td>
                      <td className="px-4 py-3 text-xs text-[#E6F7FF]">{msg.subject}</td>
                      <td className="px-4 py-3 text-[11px] text-[#8CA0B3] max-w-[200px] truncate">
                        {msg.message}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] border ${statusColors[msg.status] || ""}`}>
                          {statusLabels[msg.status] || msg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <select
                            value={msg.status}
                            onChange={(e) =>
                              updateMsgStatus.mutate({
                                id: msg.id,
                                status: e.target.value as any,
                              })
                            }
                            className="text-[10px] bg-[#1B2838]/60 border border-white/10 rounded px-1 py-0.5 text-[#E6F7FF] focus:outline-none"
                          >
                            <option value="new">جديد</option>
                            <option value="read">مقروء</option>
                            <option value="replied">تم الرد</option>
                          </select>
                          <button
                            onClick={() => {
                              if (confirm("هل أنت متأكد من الحذف؟"))
                                deleteMsg.mutate({ id: msg.id });
                            }}
                            className="p-1 rounded text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {messages.items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-xs text-[#8CA0B3]/50">
                        لا توجد رسائل
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {messages.total > 0 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] text-[#8CA0B3]">
                  إجمالي: {messages.total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMsgPage((p) => Math.max(1, p - 1))}
                    disabled={msgPage === 1}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#8CA0B3] hover:text-[#00F0FF] disabled:opacity-30 transition-all"
                  >
                    <ChevronRight size={14} />
                  </button>
                  <span className="text-[11px] text-[#8CA0B3]">
                    صفحة {msgPage}
                  </span>
                  <button
                    onClick={() => setMsgPage((p) => p + 1)}
                    disabled={messages.items.length < 10}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#8CA0B3] hover:text-[#00F0FF] disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && dashboard && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
                الزيارات اليومية (آخر 30 يوم)
              </h3>
              <div className="h-48 flex items-end gap-1">
                {dashboard.visitsByDay.map((day: any, i: number) => {
                  const maxCount = Math.max(
                    ...dashboard.visitsByDay.map((d: any) => d.count),
                    1
                  );
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                      title={`${day.date}: ${day.count} زيارة`}
                    >
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-[#00F0FF]/40 to-[#2E5BFF]/20 min-h-[2px]"
                        style={{
                          height: `${(day.count / maxCount) * 100}%`,
                        }}
                      />
                      <span className="text-[8px] text-[#8CA0B3] rotate-0">
                        {new Date(day.date).getDate()}
                      </span>
                    </div>
                  );
                })}
                {dashboard.visitsByDay.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#8CA0B3]/50">
                    لا توجد بيانات زيارات
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
                  رسائل التواصل حسب الحالة
                </h3>
                <div className="space-y-2">
                  {dashboard.messagesByStatus.map((item: any) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <span className="text-xs text-[#8CA0B3]">{statusLabels[item.status] || item.status}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] rounded-full"
                            style={{
                              width: `${Math.min(100, (item.count / Math.max(...dashboard.messagesByStatus.map((m: any) => m.count), 1)) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-[#00F0FF] w-6 text-left">{item.count}</span>
                      </div>
                    </div>
                  ))}
                  {dashboard.messagesByStatus.length === 0 && (
                    <span className="text-xs text-[#8CA0B3]/50">لا توجد بيانات</span>
                  )}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-[#E6F7FF] mb-4">
                  الجامعات الأكثر طلباً
                </h3>
                <div className="space-y-2">
                  {dashboard.topUniversities.slice(0, 8).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs text-[#8CA0B3] truncate max-w-[150px]">{item.university}</span>
                      <span className="text-xs text-[#00F0FF]">{item.count}</span>
                    </div>
                  ))}
                  {dashboard.topUniversities.length === 0 && (
                    <span className="text-xs text-[#8CA0B3]/50">لا توجد بيانات</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
