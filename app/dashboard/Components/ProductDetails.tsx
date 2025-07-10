
import React from 'react';

interface ProductDetailsProps {
  name: string;
  description: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  description,
  onNameChange,
  onDescriptionChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Product Details</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter product name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            id="productDescription"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe your product in detail..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
