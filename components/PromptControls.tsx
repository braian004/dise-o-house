import React, { useState } from 'react';
import { Wand2, Sofa, Home, Warehouse, Trees } from 'lucide-react';
import { DesignPreset } from '../types';

interface PromptControlsProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PRESETS: DesignPreset[] = [
  { id: 'modern', name: 'Modern', prompt: 'Redesign this interior in a sleek, modern minimalist style with neutral colors and warm lighting.', icon: 'Sofa' },
  { id: 'industrial', name: 'Industrial', prompt: 'Apply an industrial chic style with exposed brick, metal accents, and open spaces.', icon: 'Warehouse' },
  { id: 'scandi', name: 'Scandinavian', prompt: 'Transform this into a bright Scandinavian design with light wood, white walls, and cozy textiles.', icon: 'Home' },
  { id: 'landscape', name: 'Landscape', prompt: 'Redesign the exterior landscape with modern gardening, a paved pathway, and ambient outdoor lighting.', icon: 'Trees' },
];

const PromptControls: React.FC<PromptControlsProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Design Vision
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset.prompt)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-xs font-medium text-slate-600"
              disabled={isLoading}
            >
              <span className="mb-1">
                 {preset.id === 'modern' && <Sofa className="w-5 h-5" />}
                 {preset.id === 'industrial' && <Warehouse className="w-5 h-5" />}
                 {preset.id === 'scandi' && <Home className="w-5 h-5" />}
                 {preset.id === 'landscape' && <Trees className="w-5 h-5" />}
              </span>
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your vision (e.g., 'Add a kitchen island', 'Make it Art Deco')..."
          className="w-full p-4 pr-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none text-slate-800 placeholder-slate-400 bg-slate-50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptControls;