import React from 'react';
import { Loader } from './Loader';
import { DownloadIcon } from './icons';

interface PreviewProps {
  generatedImage: string | null;
  uploadedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

export const Preview: React.FC<PreviewProps> = ({ generatedImage, uploadedImage, isLoading, error }) => {
  const imageToDisplay = generatedImage || uploadedImage;

  const getFileExtension = (dataUrl: string | null): string => {
    if (!dataUrl) return 'png';
    const mimeType = dataUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1];
    if (!mimeType) return 'png';
    return mimeType.split('/')[1]?.split('+')[0] || 'png';
  }

  const handleDownload = () => {
    if (!imageToDisplay) return;

    const link = document.createElement('a');
    link.href = imageToDisplay;
    link.download = `kr-image-generator-image.${getFileExtension(imageToDisplay)}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;

    if (error) return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
        <p className="text-red-400 text-center p-4">{error}</p>
      </div>
    );
    
    if (!imageToDisplay) return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center leading-tight bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Describe your image and<br/>Get your image ready for download.
            </h2>
        </div>
    );

    return (
      <img 
          src={imageToDisplay} 
          alt={generatedImage ? "AI Generated" : "Uploaded Image"}
          className="w-full h-full object-contain"
      />
    );
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl aspect-square bg-white border border-gray-200 shadow-inner rounded-lg flex items-center justify-center p-4 overflow-hidden">
        {renderContent()}
      </div>
       {imageToDisplay && !isLoading && (
          <button
            onClick={handleDownload}
            className="mt-6 flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500 transition-all duration-200 ease-in-out"
          >
            <DownloadIcon className="h-5 w-5 mr-2"/>
            Download {getFileExtension(imageToDisplay).toUpperCase()}
          </button>
      )}
    </div>
  );
};
