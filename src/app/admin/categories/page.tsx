"use client";

import { useState, useEffect } from "react";
import slugify from "slugify";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  FolderOpen,
  AlertCircle,
  Check,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  _count?: { products: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    slug: "",
    description: "",
    order: 0,
  });

  const [addForm, setAddForm] = useState({
    name: "",
    slug: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      order: category.order,
    });
    setShowAddForm(false);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", slug: "", description: "", order: 0 });
  };

  const handleEditSave = async (id: string) => {
    if (!editForm.name) {
      setError("Category name is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updated = await res.json();
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
        );
        cancelEdit();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update category");
      }
    } catch {
      setError("Failed to update category");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name) {
      setError("Category name is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const slug = addForm.slug || slugify(addForm.name, { lower: true, strict: true });
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, slug }),
      });

      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
        setAddForm({ name: "", slug: "", description: "", order: 0 });
        setShowAddForm(false);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create category");
      }
    } catch {
      setError("Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? All products in this category will also be deleted.`))
      return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete category");
      }
    } catch {
      setError("Failed to delete category");
    } finally {
      setDeleting(null);
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">{categories.length} categories total</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            cancelEdit();
            setError("");
          }}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {showAddForm ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Category
            </>
          )}
        </button>
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

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">New Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={addForm.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setAddForm((prev) => ({
                    ...prev,
                    name,
                    slug: slugify(name, { lower: true, strict: true }),
                  }));
                }}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={addForm.slug}
                onChange={(e) =>
                  setAddForm((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-gray-50"
                placeholder="auto-generated"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={addForm.description}
              onChange={(e) =>
                setAddForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm resize-y"
              placeholder="Optional description"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              type="number"
              value={addForm.order}
              onChange={(e) =>
                setAddForm((prev) => ({
                  ...prev,
                  order: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add Category
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">No categories yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 mt-4 text-sm text-amber-600 hover:text-amber-700"
            >
              <Plus className="w-4 h-4" />
              Add your first category
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div key={category.id} className="px-6 py-4">
                {editingId === category.id ? (
                  /* Inline Edit Form */
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setEditForm((prev) => ({
                            ...prev,
                            name,
                            slug: slugify(name, { lower: true, strict: true }),
                          }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editForm.slug}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, slug: e.target.value }))
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Slug"
                      />
                      <input
                        type="number"
                        value={editForm.order}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            order: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Order"
                      />
                    </div>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Description"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditSave(category.id)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Row */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <FolderOpen className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {category.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          /{category.slug}
                          {category._count && (
                            <span className="ml-2 text-gray-400">
                              {category._count.products} product
                              {category._count.products !== 1 ? "s" : ""}
                            </span>
                          )}
                        </p>
                        {category.description && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                      <span className="text-xs text-gray-400 mr-2">
                        Order: {category.order}
                      </span>
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        disabled={deleting === category.id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === category.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
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
