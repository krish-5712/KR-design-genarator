import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { generateImage } from './services/geminiService';
import type { ProductType, Product, PhoneBrandId, PhoneModelId } from './types';
import { PRODUCTS, PHONE_DATA } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic lion wearing a crown, detailed vector art');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('tshirt');
  const [selectedBrand, setSelectedBrand] = useState<PhoneBrandId | null>(null);
  const [selectedModel, setSelectedModel] = useState<PhoneModelId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleProductChange = (product: ProductType) => {
    setSelectedProduct(product);
    setSelectedBrand(null);
    setSelectedModel(null);
    setGeneratedImage(null);
  };
  
  const handleBrandChange = (brand: PhoneBrandId) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a design description.');
      return;
    }
    if (selectedProduct === 'phone' && !selectedModel) {
      setError('Please select a phone brand and model.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateImage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (e) {
      console.error(e);
      setError('Failed to generate design. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedProduct, selectedModel]);

  const currentProduct: Product = useMemo(() => {
    if (selectedProduct === 'phone' && selectedBrand && selectedModel) {
      return PHONE_DATA[selectedBrand]?.models[selectedModel] || PRODUCTS.phone;
    }
    return PRODUCTS[selectedProduct];
  }, [selectedProduct, selectedBrand, selectedModel]);

  const isPhoneAndModelNotSelected = selectedProduct === 'phone' && !selectedModel;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto p-4 md:p-8 gap-8">
        <Controls
          prompt={prompt}
          setPrompt={setPrompt}
          selectedProduct={selectedProduct}
          setSelectedProduct={handleProductChange}
          selectedBrand={selectedBrand}
          setSelectedBrand={handleBrandChange}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
        />
        <Preview
          product={currentProduct}
          generatedImage={generatedImage}
          isLoading={isLoading}
          error={error}
          showPhonePlaceholder={isPhoneAndModelNotSelected}
        />
      </main>
    </div>
  );
};

export default App;