import React from 'react';

const PhotoUpload = ({ onChange, previews = [], onRemove, filenames = [] }) => (
  <div>
    <label 
      className="block font-medium mb-2 text-gray-700" 
      htmlFor="photos"
    >
      Upload Photos
    </label>
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors bg-gray-50">
      <input
        type="file"
        id="photos"
        name="photos"
        multiple
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />
      <label htmlFor="photos" className="cursor-pointer">
        <div className="text-gray-600">
          <svg 
            className="mx-auto h-12 w-12 mb-4 text-primary" 
            stroke="currentColor" 
            fill="none" 
            viewBox="0 0 48 48"
          >
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm">
            Drag and drop photos here, or click to select
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Maximum 5 photos, each up to 5MB
          </p>
        </div>
      </label>
    </div>
    {previews.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 justify-center">
        {previews.map((url, idx) => (
          <div key={idx} className="relative group flex flex-col items-center">
            <img
              src={url}
              alt={`Preview ${idx + 1}`}
              className="w-28 h-28 object-cover rounded-xl border-2 border-gray-200 transition-transform duration-200 group-hover:scale-105"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute top-1 right-1 rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity z-10 bg-red-500 text-white hover:bg-red-600"
                title="Remove image"
              >
                &times;
              </button>
            )}
            <span className="mt-2 text-xs truncate max-w-[7rem] text-center text-gray-600">
              {filenames[idx] || `Image ${idx + 1}`}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PhotoUpload; 