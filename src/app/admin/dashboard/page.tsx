import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Package,
  FolderOpen,
  MessageSquare,
  AlertCircle,
  Plus,
  ArrowRight,
  Mail,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [totalProducts, totalCategories, totalInquiries, unreadInquiries, recentInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { read: false } }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500",
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "bg-emerald-500",
      href: "/admin/categories",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries,
      icon: MessageSquare,
      color: "bg-purple-500",
      href: "/admin/inquiries",
    },
    {
      label: "Unread Inquiries",
      value: unreadInquiries,
      icon: AlertCircle,
      color: "bg-red-500",
      href: "/admin/inquiries",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your Saadat Industries admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentInquiries.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <Mail className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {inquiry.name}
                        </p>
                        {!inquiry.read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{inquiry.subject}</p>
                      <p className="text-xs text-gray-400 mt-1">{inquiry.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 ml-4 shrink-0">
                      <Clock className="w-3 h-3" />
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Add New Product</p>
                <p className="text-xs text-gray-500">Create a new product listing</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Manage Categories</p>
                <p className="text-xs text-gray-500">Add or edit product categories</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">View Inquiries</p>
                <p className="text-xs text-gray-500">
                  {unreadInquiries > 0
                    ? `${unreadInquiries} unread message${unreadInquiries > 1 ? "s" : ""}`
                    : "All caught up!"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
