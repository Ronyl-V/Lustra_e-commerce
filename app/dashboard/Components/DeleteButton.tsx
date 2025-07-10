// components/DeleteButton.tsx
'use client';

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ productId }: { productId: number }) {
  const handleDelete = async () => {
    const confirmed = confirm("Confirmer la suppression ?");
    if (!confirmed) return;

   const res = await fetch(`/api/deletedashproduct/${productId}`, {
  method: "DELETE",
   });


    if (res.ok) {
      window.location.reload();
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
