import React, { useRef, useCallback } from 'react';
import type { Product } from '../types';
import { Loader } from './Loader';
import { DownloadIcon } from './icons';

interface PreviewProps {
  product: Product | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  showPhonePlaceholder: boolean;
}

export const Preview: React.FC<PreviewProps> = ({ product, generatedImage, isLoading, error, showPhonePlaceholder }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    if (!previewRef.current) return;

    const svgNode = previewRef.current.querySelector('svg');
    if (!svgNode) return;

    const svgString = new XMLSerializer().serializeToString(svgNode);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Use a higher resolution for better quality download
      const scale = 3;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      
      const link = document.createElement('a');
      link.download = `${product?.name.toLowerCase().replace(/\s+/g, '-')}-design.png` || 'design.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.onerror = (e) => {
        console.error("Failed to load SVG image for download", e);
        URL.revokeObjectURL(url);
    }
    img.src = url;
  }, [product]);

  const renderContent = () => {
    if (isLoading) return <Loader />;

    if (error) return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
        <p className="text-red-400 text-center p-4">{error}</p>
      </div>
    );
    
    if (!product) return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center leading-tight">
                <span className="text-gray-700">What do you want to </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">create</span>
                <span className="text-gray-700"> today?</span>
            </h2>
        </div>
    );

    const Mockup = product.mockup;

    return (
      <>
        {generatedImage && !showPhonePlaceholder && product.id !== 'tshirt' && product.id !== 'bag' ? (
             <Mockup imageHref={generatedImage} className="w-full h-full object-contain drop-shadow-lg" />
        ) : (
            <>
              <div className="absolute" style={product.designStyle}>
                {generatedImage && (
                    <img 
                        src={generatedImage} 
                        alt="Generated Design" 
                        className="w-full h-full object-contain"
                    />
                )}
              </div>
              <Mockup className="w-full h-full object-contain drop-shadow-lg" />
            </>
        )}
       
        {showPhonePlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <p className="text-gray-600 font-semibold">Please select a brand and model.</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col items-center justify-center">
      <div ref={previewRef} className="relative w-full max-w-2xl aspect-square bg-white border border-gray-200 shadow-inner rounded-lg flex items-center justify-center p-4 overflow-hidden">
        {renderContent()}
      </div>
       {generatedImage && !isLoading && !showPhonePlaceholder && product && (
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