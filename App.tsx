
import React, { useState, useCallback } from 'react';
import { StylePreset, AspectRatio } from './types';
import { STYLE_PRESETS, ASPECT_RATIOS } from './constants';
import { generateImageComposition } from './services/geminiService';
import GalaxyBackground from './components/GalaxyBackground';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';

type ImageData = { data: string; mimeType: string };

const App: React.FC = () => {
    const [modelImage, setModelImage] = useState<ImageData | null>(null);
    const [productImage, setProductImage] = useState<ImageData | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [activePreset, setActivePreset] = useState<StylePreset>(StylePreset.PROFESSIONAL);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!modelImage || !productImage) {
            setError('Please upload both a model and a product image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const presetPrompt = STYLE_PRESETS.find(p => p.id === activePreset)?.prompt || '';
            const aspectPrompt = ASPECT_RATIOS.find(a => a.id === aspectRatio)?.prompt || '';
            const fullPrompt = `${prompt}. Style the final image as a ${presetPrompt}. The final composition should be framed for ${aspectPrompt}.`;

            const result = await generateImageComposition(modelImage, productImage, fullPrompt);
            setGeneratedImage(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [modelImage, productImage, prompt, activePreset, aspectRatio]);
    
    const NeonCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
        <div className={`bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-900/50 ${className}`}>
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <GalaxyBackground />
            {isLoading && <Loader />}
            <div className="relative z-10 flex flex-col items-center min-h-screen">
                <Header />
                <main className="w-full max-w-7xl mx-auto p-4 md:p-8 flex-grow">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Control Panel */}
                        <div className="flex flex-col gap-6">
                            <NeonCard>
                                <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300 border-b-2 border-cyan-500/30 pb-2">1. Upload Images</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ImageUploader title="Model Photo" onImageSelect={setModelImage} showStockModels />
                                    <ImageUploader title="Product Photo" onImageSelect={setProductImage} />
                                </div>
                            </NeonCard>

                            <NeonCard>
                                 <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300 border-b-2 border-cyan-500/30 pb-2">2. Add Instructions</h2>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., 'Model holding the bottle in her right hand, smiling at the camera'"
                                    className="w-full h-24 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] placeholder-gray-500"
                                />
                            </NeonCard>

                            <NeonCard>
                                <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300 border-b-2 border-cyan-500/30 pb-2">3. Select Style</h2>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-300">Style Presets</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {STYLE_PRESETS.map(preset => (
                                                <button key={preset.id} onClick={() => setActivePreset(preset.id)} className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${activePreset === preset.id ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/50' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                                    {preset.id}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-300">Image Size</h4>
                                        <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-none">
                                            {ASPECT_RATIOS.map(ratio => <option key={ratio.id} value={ratio.id}>{ratio.id}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </NeonCard>
                            
                             <button onClick={handleGenerate} disabled={isLoading || !modelImage || !productImage} className="w-full py-4 text-xl font-bold rounded-lg transition-all duration-300 ease-in-out bg-cyan-500 text-black shadow-lg shadow-cyan-500/40 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/60 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100">
                                {isLoading ? 'Generating...' : '✨ Generate Photoshoot'}
                            </button>
                        </div>
                        
                        {/* Output Section */}
                        <div className="flex flex-col">
                            <NeonCard className="flex-grow flex flex-col items-center justify-center min-h-[40rem] lg:min-h-full">
                                <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300 border-b-2 border-cyan-500/30 pb-2">4. AI Generated Result</h2>
                                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                                {generatedImage ? (
                                    <div className="w-full flex flex-col items-center gap-4">
                                        <div className="grid grid-cols-2 gap-4 w-full">
                                            <div>
                                                <h4 className="text-center font-semibold mb-2">Original Product</h4>
                                                <img src={productImage?.data} alt="Original Product" className="w-full rounded-lg object-contain aspect-square bg-gray-800" />
                                            </div>
                                            <div>
                                                <h4 className="text-center font-semibold mb-2">AI Result</h4>
                                                <img src={generatedImage} alt="Generated Photoshoot" className="w-full rounded-lg object-contain aspect-square bg-gray-800" />
                                            </div>
                                        </div>
                                        <a href={generatedImage} download="ai-studio-photoshoot.png" className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded-lg shadow-lg shadow-green-500/40 hover:bg-green-400 transition-all">
                                            Download Image
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <p>Your generated image will appear here.</p>
                                    </div>
                                )}
                            </NeonCard>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
