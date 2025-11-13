import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { generateImage, refineImage } from './services/geminiService';
import type { Style, AspectRatio } from './types';

const App: React.FC = () => {
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


  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); // Clear previous generation to show loader

    if (uploadedImage) {
      if (!editPrompt.trim()) {
        setError('Please describe the edits you want to make to the uploaded image.');
        setIsLoading(false);
        return;
      }
      try {
        const dataUrl = await refineImage(uploadedImage, editPrompt);
        setGeneratedImage(dataUrl);
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'Failed to edit image. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!prompt.trim()) {
        setError('Please describe the image you want to generate.');
        setIsLoading(false);
        return;
      }
      setFollowUpPrompt('');

      try {
        const dataUrl = await generateImage(prompt, { style, aspectRatio, negativePrompt, autoEnhance });
        setGeneratedImage(dataUrl);
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'Failed to generate image. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  }, [prompt, style, aspectRatio, negativePrompt, autoEnhance, uploadedImage, editPrompt]);

  const handleRefine = useCallback(async () => {
    if (!followUpPrompt.trim() || !generatedImage) {
      setError('Please describe the edits you want to make.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const dataUrl = await refineImage(generatedImage, followUpPrompt);
      setGeneratedImage(dataUrl);
      setFollowUpPrompt(''); // Clear input after successful refinement
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Failed to refine image. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [followUpPrompt, generatedImage]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setGeneratedImage(null); // Clear generated image to show the new upload
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setEditPrompt('');
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto p-4 md:p-8 gap-8">
        <Controls
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
          generatedImage={generatedImage}
          followUpPrompt={followUpPrompt}
          setFollowUpPrompt={setFollowUpPrompt}
          handleRefine={handleRefine}
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
