import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { generateImage, refineImage } from './services/geminiService';
import type { Style, AspectRatio, User } from './types';

interface AppProps {
  user: User;
  credits: number;
  onGenerationComplete: () => void;
}

const App: React.FC<AppProps> = ({ user, credits, onGenerationComplete }) => {
  const [prompt, setPrompt] = useState<string>('A majestic lion fighting a wolf in a snowy forest');
  const [followUpPrompt, setFollowUpPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Advanced options state
  const [style, setStyle] = useState<Style>('photorealistic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [autoEnhance, setAutoEnhance] = useState<boolean>(true);

  // New state for image upload and editing
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');

  const handleGeneration = useCallback(async (isRefinement: boolean) => {
    setIsLoading(true);
    setError(null);
    if (!isRefinement) {
      setGeneratedImage(null); // Clear previous generation for a new one
    }

    try {
      let dataUrl: string;
      if (isRefinement) {
         if (!followUpPrompt.trim() || !generatedImage) {
            throw new Error('Please describe the edits you want to make.');
         }
         dataUrl = await refineImage(generatedImage, followUpPrompt);
         setFollowUpPrompt(''); // Clear input after successful refinement
      } else {
        if (uploadedImage) {
          if (!editPrompt.trim()) {
            throw new Error('Please describe the edits you want to make to the uploaded image.');
          }
          dataUrl = await refineImage(uploadedImage, editPrompt, { style, aspectRatio, negativePrompt });
        } else {
          if (!prompt.trim()) {
            throw new Error('Please describe the image you want to generate.');
          }
          setFollowUpPrompt('');
          dataUrl = await generateImage(prompt, { style, aspectRatio, negativePrompt, autoEnhance });
        }
      }
      setGeneratedImage(dataUrl);
      onGenerationComplete();
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    prompt, style, aspectRatio, negativePrompt, autoEnhance, uploadedImage, editPrompt,
    followUpPrompt, generatedImage, onGenerationComplete
  ]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setGeneratedImage(null); // Clear generated image to show the new upload
      setError(null);
      setAutoEnhance(false); // Turn off auto-enhance when uploading an image
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setEditPrompt('');
    setAutoEnhance(true); // Re-enable auto-enhance when image is cleared
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header user={user} credits={credits} />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto p-4 md:p-8 gap-8">
        <Controls
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerate={() => handleGeneration(false)}
          isLoading={isLoading}
          generatedImage={generatedImage}
          followUpPrompt={followUpPrompt}
          setFollowUpPrompt={setFollowUpPrompt}
          handleRefine={() => handleGeneration(true)}
          style={style}
          setStyle={setStyle}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          autoEnhance={autoEnhance}
          setAutoEnhance={setAutoEnhance}
          uploadedImage={uploadedImage}
          handleImageUpload={handleImageUpload}
          handleClearImage={handleClearImage}
          editPrompt={editPrompt}
          setEditPrompt={setEditPrompt}
          credits={credits}
        />
        <Preview
          generatedImage={generatedImage}
          uploadedImage={uploadedImage}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
