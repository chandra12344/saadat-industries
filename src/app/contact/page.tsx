"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Loader2,
  CheckCircle,
} from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (productParam) {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry about ${productParam}`,
        message: `I am interested in ${productParam}. Please share details including pricing, specifications, and availability.`,
      }));
    }
  }, [productParam]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setSubmitted(true);
      toast.success("Inquiry sent successfully! We will get back to you soon.");
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-secondary-800">
          Inquiry Sent Successfully!
        </h3>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          Thank you for reaching out. Our team will review your inquiry and get
          back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              company: "",
              subject: "",
              message: "",
            });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm"
    >
      <h2 className="text-xl font-bold text-secondary-800">Send us a Message</h2>
      <p className="mt-1 text-sm text-gray-500">
        Fill in the form below and we will get back to you shortly.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary-700 mb-1.5"
            >
              Full Name <span className="text-primary-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary-700 mb-1.5"
            >
              Email Address <span className="text-primary-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-secondary-700 mb-1.5"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-secondary-700 mb-1.5"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Subject <span className="text-primary-600">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
          >
            <option value="">Select a subject</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Price Quote">Price Quote</option>
            <option value="Bulk Order">Bulk Order</option>
            <option value="Custom Requirement">Custom Requirement</option>
            <option value="Technical Support">Technical Support</option>
            <option value="General Inquiry">General Inquiry</option>
            {productParam && (
              <option value={`Inquiry about ${productParam}`}>
                Inquiry about {productParam}
              </option>
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Message <span className="text-primary-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your requirements, quantities, or any specific questions..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Get in touch with us for product inquiries, quotes, or any
              questions about our conveyor system components.
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact info card */}
              <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-secondary-800">
                  Contact Information
                </h3>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href="tel:+918850243463"
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                        <Phone className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-800">
                          Phone
                        </p>
                        <p className="text-sm text-gray-500">88502 43463</p>
                        <p className="text-sm text-gray-500">86938 33530</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:saadatindustries007@gmail.com"
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                        <Mail className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-800">
                          Email
                        </p>
                        <p className="text-sm text-gray-500">
                          saadatindustries007@gmail.com
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <MapPin className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-800">
                          Address
                        </p>
                        <p className="text-sm text-gray-500">
                          Village Dongi, Po. Pargoan Tal,
                          <br />
                          Panvel, Dist. Raigod,
                          <br />
                          Maharashtra - 410 206
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <Clock className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-800">
                          Working Hours
                        </p>
                        <p className="text-sm text-gray-500">
                          Monday - Saturday
                          <br />
                          9:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <FileText className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-800">
                          GST Number
                        </p>
                        <p className="text-sm text-gray-500">
                          27ASQPM4073K1Z6
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden">
                <div className="aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="mx-auto h-10 w-10 text-gray-300" />
                    <p className="mt-2 text-sm font-medium text-gray-400">
                      Panvel, Maharashtra
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Village Dongi, Po. Pargoan Tal
                    </p>
                    <a
                      href="https://maps.google.com/?q=Panvel+Maharashtra+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
