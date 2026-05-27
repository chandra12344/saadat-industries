"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Building2,
  Clock,
  CheckCheck,
  X,
  AlertCircle,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch {
      setError("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = async (inquiry: Inquiry) => {
    if (expandedId === inquiry.id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(inquiry.id);

    // Mark as read when expanding
    if (!inquiry.read) {
      try {
        const res = await fetch(`/api/inquiries/${inquiry.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        });
        if (res.ok) {
          setInquiries((prev) =>
            prev.map((i) => (i.id === inquiry.id ? { ...i, read: true } : i))
          );
        }
      } catch {
        // Silently fail
      }
    }
  };

  const toggleRead = async (inquiry: Inquiry, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !inquiry.read }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) =>
            i.id === inquiry.id ? { ...i, read: !i.read } : i
          )
        );
      }
    } catch {
      setError("Failed to update inquiry");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } catch {
      setError("Failed to delete inquiry");
    } finally {
      setDeleting(null);
    }
  };

  const unreadCount = inquiries.filter((i) => !i.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 mt-1">
          {inquiries.length} total
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
          <button onClick={() => setError("")} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">No inquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id}>
                {/* Inquiry Row */}
                <div
                  onClick={() => toggleExpand(inquiry)}
                  className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !inquiry.read ? "bg-amber-50/50" : ""
                  }`}
                >
                  {/* Read status indicator */}
                  <div className="shrink-0">
                    {inquiry.read ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-amber-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm truncate ${
                          !inquiry.read
                            ? "font-semibold text-gray-900"
                            : "font-medium text-gray-700"
                        }`}
                      >
                        {inquiry.name}
                      </p>
                      {!inquiry.read && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                          NEW
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm truncate ${
                        !inquiry.read ? "text-gray-800" : "text-gray-600"
                      }`}
                    >
                      {inquiry.subject}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{inquiry.email}</p>
                  </div>

                  {/* Date and Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <button
                      onClick={(e) => toggleRead(inquiry, e)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={inquiry.read ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleDelete(inquiry.id, e)}
                      disabled={deleting === inquiry.id}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting === inquiry.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>

                    {expandedId === inquiry.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === inquiry.id && (
                  <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-gray-400" />
                          {inquiry.name}
                        </div>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                          <Mail className="w-4 h-4" />
                          {inquiry.email}
                        </a>
                        {inquiry.phone && (
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                          >
                            <Phone className="w-4 h-4 text-gray-400" />
                            {inquiry.phone}
                          </a>
                        )}
                        {inquiry.company && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            {inquiry.company}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {new Date(inquiry.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Subject
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {inquiry.subject}
                        </p>
                      </div>

                      {/* Message */}
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Message
                        </p>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {inquiry.message}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        <a
                          href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Reply via Email
                        </a>
                        <button
                          onClick={(e) => toggleRead(inquiry, e)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <CheckCheck className="w-4 h-4" />
                          {inquiry.read ? "Mark as Unread" : "Mark as Read"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
