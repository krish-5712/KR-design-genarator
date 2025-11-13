import React, { useState, useRef } from 'react';
import { GenerateIcon, SparklesIcon, ChevronDownIcon, UploadIcon, XCircleIcon } from './icons';
import { CustomSelect } from './CustomSelect';
import { ToggleSwitch } from './ToggleSwitch';
import { STYLE_OPTIONS, ASPECT_RATIO_OPTIONS } from '../constants';
import type { Style, AspectRatio } from '../types';

interface ControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
  generatedImage: string | null;
  followUpPrompt: string;
  setFollowUpPrompt: (prompt: string) => void;
  handleRefine: () => void;
  style: Style;
  setStyle: (style: Style) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  negativePrompt: string;
  setNegativePrompt: (prompt: string) => void;
  autoEnhance: boolean;
  setAutoEnhance: (value: boolean) => void;
  uploadedImage: string | null;
  handleImageUpload: (file: File) => void;
  handleClearImage: () => void;
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  handleGenerate,
  isLoading,
  generatedImage,
  followUpPrompt,
  setFollowUpPrompt,
  handleRefine,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  negativePrompt,
  setNegativePrompt,
  autoEnhance,
  setAutoEnhance,
  uploadedImage,
  handleImageUpload,
  handleClearImage,
  editPrompt,
  setEditPrompt,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isGenerateDisabled = isLoading || (!uploadedImage && !prompt.trim()) || (!!uploadedImage && !editPrompt.trim());
  const isRefineDisabled = isLoading || !followUpPrompt.trim();
  
  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageUpload(event.target.files[0]);
    }
  };
  
  const GenerateButton = () => (
    <button
      onClick={handleGenerate}
      disabled={isGenerateDisabled}
      className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 transition-all duration-200 ease-in-out disabled:bg-red-400 disabled:cursor-not-allowed group"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {uploadedImage ? 'Applying Edits...' : 'Generating...'}
        </>
      ) : (
        <>
          <GenerateIcon className="h-5 w-5 mr-2 transform group-hover:rotate-12 transition-transform"/>
          {uploadedImage ? 'Apply Edits' : 'Generate Image'}
        </>
      )}
    </button>
  );


  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-6 self-start">
      {generatedImage && !uploadedImage ? (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Want to change something?</h2>
            <p className="text-sm text-gray-600 mb-4">Describe the edits you want to make to the image.</p>
            <textarea
              value={followUpPrompt}
              onChange={(e) => setFollowUpPrompt(e.target.value)}
              placeholder="e.g., Change the crown to a party hat"
              className="w-full h-24 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
              aria-label="Image refinement description"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleRefine}
            disabled={isRefineDisabled}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 transition-all duration-200 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
               <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refining...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform"/>
                Refine Image
              </>
            )}
          </button>
        </>
      ) : uploadedImage ? (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Describe the changes you want in the given image</h2>
            <div className="relative mb-3 group">
              <img src={uploadedImage} alt="Uploaded preview" className="rounded-md object-cover w-full h-32" />
              <button 
                onClick={handleClearImage} 
                className="absolute top-1 right-1 text-white bg-black/50 rounded-full p-1 hover:bg-black/75 transition-opacity opacity-0 group-hover:opacity-100" 
                aria-label="Clear uploaded image">
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            <textarea
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="e.g., Make the sky purple, add a dragon"
              className="w-full h-24 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
              aria-label="Image edit description"
              disabled={isLoading}
            />
          </div>
          <GenerateButton />
        </>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Describe your image</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A cute cat astronaut floating in space"
              className="w-full h-32 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
              aria-label="Image description"
              disabled={isLoading}
            />
          </div>
          
          <div className="border-t border-b border-gray-200 py-4">
            <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" aria-hidden="true" />
            <button
                onClick={onUploadClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed group"
            >
                <UploadIcon className="h-5 w-5 mr-2"/>
                Upload Image
            </button>
          </div>
          
          <div className="space-y-4">
            <ToggleSwitch label="Auto-enhance prompt" enabled={autoEnhance} onChange={setAutoEnhance} disabled={isLoading} />
            
            <div>
                 <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex justify-between items-center text-left text-gray-600 font-medium py-2">
                    <span>Advanced Options</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
                </button>
                 {showAdvanced && (
                     <div className="mt-4 space-y-4 border-t pt-4">
                        <CustomSelect
                            ariaLabel="Select art style"
                            options={STYLE_OPTIONS}
                            value={style}
                            onChange={(v) => setStyle(v as Style)}
                            placeholder="Select a style"
                            disabled={isLoading}
                        />
                        <CustomSelect
                            ariaLabel="Select aspect ratio"
                            options={ASPECT_RATIO_OPTIONS}
                            value={aspectRatio}
                            onChange={(v) => setAspectRatio(v as AspectRatio)}
                            placeholder="Select aspect ratio"
                            disabled={isLoading}
                        />
                        <div>
                             <label htmlFor="negative-prompt" className="block text-sm font-medium mb-1 text-gray-700">Negative Prompt</label>
                             <textarea
                                id="negative-prompt"
                                value={negativePrompt}
                                onChange={(e) => setNegativePrompt(e.target.value)}
                                placeholder="e.g., extra limbs, blurry, text"
                                className="w-full h-20 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
                                aria-label="Negative prompt"
                                disabled={isLoading}
                            />
                        </div>
                     </div>
                 )}
            </div>
          </div>


          <GenerateButton />
        </>
      )}
    </div>
  );
};