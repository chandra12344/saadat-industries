"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import slugify from "slugify";
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    features: "",
    price: "",
    categoryId: "",
    featured: false,
    active: true,
    image: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch(`/api/products/${id}`).then((res) => res.json()),
    ])
      .then(([cats, product]) => {
        setCategories(cats);
        if (product && !product.error) {
          setForm({
            name: product.name || "",
            slug: product.slug || "",
            description: product.description || "",
            features: product.features || "",
            price: product.price || "",
            categoryId: product.categoryId || "",
            featured: product.featured || false,
            active: product.active !== undefined ? product.active : true,
            image: product.image || "",
          });
        }
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugify(name, { lower: true, strict: true }),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.path }));
      } else {
        const data = await res.json();
        setError(data.error || "Failed to upload image");
      }
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.categoryId) {
      setError("Name and category are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          features: form.features || null,
          price: form.price || null,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update product");
      }
    } catch {
      setError("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500 mt-1">Update product details</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              placeholder="e.g. Heavy Duty Conveyor Roller"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-gray-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm resize-y"
              placeholder="Product description..."
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <textarea
              value={form.features}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, features: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm resize-y"
              placeholder="Separate features with | (pipe). e.g. High durability | Rust resistant | Easy installation"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate each feature with a pipe character (|)
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              placeholder="e.g. Contact for pricing"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, categoryId: e.target.value }))
              }
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured & Active */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Featured product
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, active: e.target.checked }))
                }
                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="active" className="text-sm text-gray-700">
                Active (visible on site)
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Product Image</h2>

          {form.image ? (
            <div className="relative inline-block">
              <img
                src={form.image}
                alt="Product"
                className="w-40 h-40 rounded-lg object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors">
              {uploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">
                    JPEG, PNG, WebP, SVG (max 5MB)
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
