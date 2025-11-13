import React from 'react';
import type { ProductType } from '../types';
import { PRODUCTS } from '../constants';
import { GenerateIcon } from './icons';

interface ControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedProduct: ProductType;
  setSelectedProduct: (product: ProductType) => void;
  handleGenerate: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  selectedProduct,
  setSelectedProduct,
  handleGenerate,
  isLoading,
}) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-6 self-start">
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">1. Choose Product</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
          className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
          aria-label="Select a product"
        >
          {(Object.keys(PRODUCTS) as ProductType[]).map((key) => {
            const product = PRODUCTS[key];
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">2. Describe Your Design</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cute cat astronaut floating in space"
          className="w-full h-32 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
          aria-label="Design description"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 transition-all duration-200 ease-in-out disabled:bg-red-400 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <GenerateIcon className="h-5 w-5 mr-2 transform group-hover:rotate-12 transition-transform"/>
            Generate Design
          </>
        )}
      </button>
    </div>
  );
};