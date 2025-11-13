import React, { useRef, useCallback } from 'react';
import type { Product } from '../types';
import { Loader } from './Loader';
import { DownloadIcon } from './icons';

interface PreviewProps {
  product: Product;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

export const Preview: React.FC<PreviewProps> = ({ product, generatedImage, isLoading, error }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const Mockup = product.mockup;

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mockupImage = new Image();
    // Convert SVG component to data URL
    const svgString = new XMLSerializer().serializeToString(document.querySelector('#mockup-svg')!);
    const svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    mockupImage.src = URL.createObjectURL(svgBlob);

    const designImage = new Image();
    designImage.crossOrigin = "anonymous";
    designImage.src = generatedImage;

    mockupImage.onload = () => {
      designImage.onload = () => {
        canvas.width = mockupImage.width;
        canvas.height = mockupImage.height;

        // Draw mockup
        ctx.drawImage(mockupImage, 0, 0);

        // Calculate design position and size
        const containerWidth = mockupImage.width;
        const containerHeight = mockupImage.height;
        
        const designWidth = containerWidth * (parseFloat(product.designStyle.width as string) / 100);
        const designHeight = containerHeight * (parseFloat(product.designStyle.height as string) / 100);
        
        let designTop = containerHeight * (parseFloat(product.designStyle.top as string) / 100);
        let designLeft = containerWidth * (parseFloat(product.designStyle.left as string) / 100);

        if (product.designStyle.transform?.includes('translateX(-50%)')) {
            designLeft = (containerWidth / 2) - (designWidth / 2);
        }
        if (product.designStyle.transform?.includes('translate(-50%, -50%)')) {
            designLeft = (containerWidth / 2) - (designWidth / 2);
            designTop = (containerHeight / 2) - (designHeight / 2);
        }

        ctx.drawImage(designImage, designLeft, designTop, designWidth, designHeight);

        // Trigger download
        const link = document.createElement('a');
        link.download = `${product.name.toLowerCase().replace(' ', '-')}-design.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        URL.revokeObjectURL(mockupImage.src);
      };
    };
  }, [generatedImage, product]);

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col items-center justify-center">
      <div ref={previewRef} className="relative w-full max-w-2xl aspect-square bg-white border border-gray-200 shadow-inner rounded-lg flex items-center justify-center p-4">
        <Mockup id="mockup-svg" className="w-full h-full object-contain" />

        {isLoading && <Loader />}
        
        {!isLoading && error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <p className="text-red-400 text-center p-4">{error}</p>
          </div>
        )}

        {!isLoading && generatedImage && (
          <div className="absolute" style={product.designStyle}>
            <img 
                src={generatedImage} 
                alt="Generated Design" 
                className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
       {generatedImage && !isLoading && (
        <button
          onClick={handleDownload}
          className="mt-6 flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500 transition-all duration-200 ease-in-out"
        >
          <DownloadIcon className="h-5 w-5 mr-2"/>
          Download Design
        </button>
      )}
    </div>
  );
};