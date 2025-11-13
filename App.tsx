import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { generateImage } from './services/geminiService';
import type { ProductType } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic lion wearing a crown, detailed vector art');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('tshirt');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a design description.');
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
  }, [prompt]);

  const currentProduct = PRODUCTS[selectedProduct];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto p-4 md:p-8 gap-8">
        <Controls
          prompt={prompt}
          setPrompt={setPrompt}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
        />
        <Preview
          product={currentProduct}
          generatedImage={generatedImage}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;