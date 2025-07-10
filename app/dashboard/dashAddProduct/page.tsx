"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";

const AddProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    barcode: "",
    quantity: "",
    category: "",
    tags: "",
    weight: "",
    dimensions: "",
    status: true,
    trackQuantity: true,
    allowBackorder: false,
    requiresShipping: true,
    taxable: true,
  });

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return setIsLoading(false);
      const res = await fetch(`/api/modifydashproduct/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          ...formData,
          ...data,
          price: data.price?.toString() || "",
          comparePrice: data.comparePrice?.toString() || "",
          quantity: data.quantity?.toString() || "",
          weight: data.weight?.toString() || "",
        });
        setImages(data.image ? [data.image] : []);
      } else {
        alert("Erreur de chargement du produit.");
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          alert("Erreur lors de l'upload de l'image");
          continue;
        }

        const data = await res.json();
        uploadedUrls.push(data.url);
      } catch (error) {
        alert("Erreur réseau lors de l'upload");
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Veuillez remplir le nom et le prix du produit.");
      return;
    }

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
      quantity: formData.quantity ? parseInt(formData.quantity, 10) : 0,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      image: images[0] || null,
    };

    const res = await fetch(
      productId ? `/api/modifydashproduct/${productId}` : "/api/dashproducts",
      {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      }
    );

    if (res.ok) {
      router.push("/dashboard/dashproducts");
    } else {
      alert("Erreur lors de la sauvegarde du produit.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/dashproducts")}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
              <p className="text-gray-600">Create a new product for your store</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => router.push("/dashboard/dashproducts")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Save Product
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-4">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="mb-4">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Drop images here or click to upload</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trackQuantity">Track quantity</Label>
                  <Switch
                    id="trackQuantity"
                    checked={formData.trackQuantity}
                    onCheckedChange={(checked) => handleInputChange("trackQuantity", checked)}
                  />
                </div>
                {formData.trackQuantity && (
                  <div>
                    <Label htmlFor="quantity" className="mb-4">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowBackorder">Allow customers to purchase when out of stock</Label>
                  <Switch
                    id="allowBackorder"
                    checked={formData.allowBackorder}
                    onCheckedChange={(checked) => handleInputChange("allowBackorder", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Settings */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Active</Label>
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => handleInputChange("status", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2">
                <div>
                  <Label htmlFor="price" className="mb-4">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Product Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category" className="mb-4">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="Enter category"
                  />
                </div>
              </CardContent>
            </Card>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

