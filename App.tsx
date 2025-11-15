import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { generateImage, refineImage } from './services/geminiService';
import { updateCredits, recordImageGeneration } from './services/userService';
import type { User } from './services/userService';
import type { Style, AspectRatio } from './types';

interface AppProps {
  user: User;
  onLogout: () => void;
  onCreditsUpdate: (user: User) => void;
}

const App: React.FC<AppProps> = ({ user, onLogout, onCreditsUpdate }) => {
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

  const handleAddCredits = async () => {
    setError(null);
    try {
      const updatedUser = await updateCredits(user.email, user.credits + 10);
      onCreditsUpdate(updatedUser);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Failed to add credits.');
    }
  };

  const handleGenerate = useCallback(async () => {
    if (user.credits <= 0) {
      setError('You have run out of credits. Please add more to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); // Clear previous generation to show loader

    const performGeneration = async (genFunc: () => Promise<string>) => {
      try {
        const dataUrl = await genFunc();
        setGeneratedImage(dataUrl);
        // Record generation (deducts credit, increments count)
        const updatedUser = await recordImageGeneration(user.email, user.credits);
        onCreditsUpdate(updatedUser);
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (uploadedImage) {
      if (!editPrompt.trim()) {
        setError('Please describe the edits you want to make to the uploaded image.');
        setIsLoading(false);
        return;
      }
      await performGeneration(() => refineImage(uploadedImage, editPrompt, { style, aspectRatio, negativePrompt }));
    } else {
      if (!prompt.trim()) {
        setError('Please describe the image you want to generate.');
        setIsLoading(false);
        return;
      }
      setFollowUpPrompt('');
      await performGeneration(() => generateImage(prompt, { style, aspectRatio, negativePrompt, autoEnhance }));
    }
  }, [prompt, style, aspectRatio, negativePrompt, autoEnhance, uploadedImage, editPrompt, user, onCreditsUpdate]);

  const handleRefine = useCallback(async () => {
    if (user.credits <= 0) {
      setError('You have run out of credits. Please add more to continue.');
      return;
    }
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
      // Record generation (deducts credit, increments count)
      const updatedUser = await recordImageGeneration(user.email, user.credits);
      onCreditsUpdate(updatedUser);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Failed to refine image. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [followUpPrompt, generatedImage, user, onCreditsUpdate]);

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
      <Header credits={user.credits} onLogout={onLogout} />
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
          credits={user.credits}
          handleAddCredits={handleAddCredits}
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
