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
  credits: number;
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
  credits,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedStyleLabel = STYLE_OPTIONS.find(o => o.value === style)?.label;
  const selectedAspectRatioLabel = ASPECT_RATIO_OPTIONS.find(o => o.value === aspectRatio)?.label;

  const hasNoCredits = credits <= 0;
  const isGenerateDisabled = isLoading || hasNoCredits || (!uploadedImage && !prompt.trim()) || (!!uploadedImage && !editPrompt.trim());
  const isRefineDisabled = isLoading || hasNoCredits || !followUpPrompt.trim();
  
  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageUpload(event.target.files[0]);
    }
  };
  
  const GenerateButton = () => (
    <div>
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
            {uploadedImage ? 'Apply Edits' : 'Generate Image'} (1 Credit)
          </>
        )}
      </button>
      {hasNoCredits && !isLoading && <p className="text-center text-xs text-red-500 mt-2">You have no credits left.</p>}
    </div>
  );

  const RefineButton = () => (
     <div>
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
            Refine Image (1 Credit)
            </>
        )}
      </button>
      {hasNoCredits && !isLoading && <p className="text-center text-xs text-red-500 mt-2">You have no credits left.</p>}
    </div>
  );

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-6 self-start">
      {generatedImage ? (
        // Follow-up Mode (after any image has been generated)
        <>
            {uploadedImage && (
              <div className="pb-6 border-b border-gray-200 space-y-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Initial Edit</h2>
                  <p className="text-sm text-gray-500">This was your original request.</p>
                </div>
                <img src={uploadedImage} alt="Uploaded original" className="rounded-md object-cover w-full h-auto max-h-40" />
                <textarea
                  value={editPrompt}
                  className="w-full h-24 p-3 bg-gray-100 rounded-lg border border-gray-300 resize-none text-gray-500 cursor-default"
                  aria-label="Original image edit description"
                  disabled
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Advanced Options Used:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                          <span className="font-medium">Style:</span>
                          <span>{selectedStyleLabel}</span>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                          <span className="font-medium">Aspect Ratio:</span>
                          <span>{selectedAspectRatioLabel}</span>
                      </div>
                      {negativePrompt.trim() && (
                          <div className="bg-gray-50 p-2 rounded-md">
                              <p className="font-medium mb-1">Negative Prompt:</p>
                              <p className="text-xs break-words bg-gray-100 p-1.5 rounded">{negativePrompt}</p>
                          </div>
                      )}
                  </div>
                </div>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {uploadedImage ? 'Want any further changes?' : 'Want to change something?'}
              </h2>
              <p className="text-sm text-gray-600 mb-4">Describe the edits you want to make to the new image.</p>
              <textarea
                value={followUpPrompt}
                onChange={(e) => setFollowUpPrompt(e.target.value)}
                placeholder="e.g., Change the crown to a party hat"
                className="w-full h-24 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                aria-label="Image refinement description"
                disabled={isLoading}
              />
            </div>
            <RefineButton />
        </>
      ) : (
        // Initial Mode (before first generation/edit)
        <>
          {uploadedImage ? (
             <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">Editing Uploaded Image</h2>
                <button 
                  onClick={handleClearImage} 
                  className="text-gray-400 hover:text-gray-600 transition-colors" 
                  aria-label="Clear uploaded image">
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Describe the changes you want to apply.</p>
              
              <img src={uploadedImage} alt="Uploaded preview" className="rounded-md object-cover w-full h-auto max-h-40" />
              
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g., Make the sky purple, add a dragon"
                className="w-full h-24 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
                aria-label="Image edit description"
                disabled={isLoading}
              />
            </div>
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
            </>
          )}

          <div className="space-y-4">
            {!uploadedImage && (
              <ToggleSwitch 
                label="Auto-enhance prompt" 
                enabled={autoEnhance} 
                onChange={setAutoEnhance} 
                disabled={isLoading}
              />
            )}
            
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