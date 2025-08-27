'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface InteractiveImageViewerProps {
  images: {
    url: string;
    title: string;
    description: string;
    category: 'utopian' | 'dystopian';
  }[];
  onImageAnalysis?: (imageId: string, analysis: string) => void;
  showAnalysisTools?: boolean;
}

export function InteractiveImageViewer({ 
  images, 
  onImageAnalysis, 
  showAnalysisTools = true 
}: InteractiveImageViewerProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [annotations, setAnnotations] = useState<Record<string, string>>({});

  const utopianImages = images.filter(img => img.category === 'utopian');
  const dystopianImages = images.filter(img => img.category === 'dystopian');

  const handleImageClick = (index: number) => {
    setSelectedImage(selectedImage === index ? null : index);
    setZoom(1);
  };

  const handleAnnotation = (imageIndex: number, annotation: string) => {
    setAnnotations(prev => ({
      ...prev,
      [imageIndex]: annotation
    }));
    if (onImageAnalysis) {
      onImageAnalysis(imageIndex.toString(), annotation);
    }
  };

  const renderImageGrid = (imageList: typeof images, title: string, colorClass: string) => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${colorClass}`}>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
          title.includes('Utopian') ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <span className={`font-bold ${
            title.includes('Utopian') ? 'text-green-600' : 'text-red-600'
          }`}>
            {title.charAt(0)}
          </span>
        </span>
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {imageList.map((image, index) => {
          const globalIndex = title.includes('Utopian') ? index : utopianImages.length + index;
          return (
            <div key={index} className="relative group">
              <div 
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handleImageClick(globalIndex)}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${
                  image.category === 'utopian' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <span className={`text-white font-medium text-sm px-2 py-1 rounded ${
                    image.category === 'utopian' ? 'bg-green-600/80' : 'bg-red-600/80'
                  }`}>
                    {image.title}
                  </span>
                </div>
                {selectedImage === globalIndex && (
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-lg"></div>
                )}
              </div>
              
              {showAnalysisTools && (
                <div className="mt-2">
                  <textarea
                    value={annotations[globalIndex] || ''}
                    onChange={(e) => handleAnnotation(globalIndex, e.target.value)}
                    className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="What do you notice about this image?"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      {/* Image Grids */}
      <div className="space-y-8">
        {renderImageGrid(utopianImages, 'Utopian Futures', 'text-green-800')}
        {renderImageGrid(dystopianImages, 'Dystopian Futures', 'text-red-800')}
      </div>

      {/* Enlarged Image View */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img 
              src={images[selectedImage]?.url} 
              alt={images[selectedImage]?.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{ transform: `scale(${zoom})` }}
            />
            
            {/* Image Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.25))}
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.min(3, prev + 0.25))}
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h4 className="font-semibold mb-1">{images[selectedImage]?.title}</h4>
              <p className="text-sm opacity-90">{images[selectedImage]?.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Summary */}
      {showAnalysisTools && Object.keys(annotations).length > 0 && (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="text-lg font-semibold text-indigo-800 mb-3">Your Analysis Summary</h4>
          <div className="space-y-2">
            {Object.entries(annotations).map(([imageIndex, annotation]) => (
              <div key={imageIndex} className="p-3 bg-white rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-indigo-700">
                    Image {parseInt(imageIndex) + 1}:
                  </span>
                  <span className="text-xs text-indigo-600">
                    {images[parseInt(imageIndex)]?.title}
                  </span>
                </div>
                <p className="text-sm text-indigo-700">{annotation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}