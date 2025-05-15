import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { analyzeImage } from '@/lib/openai';
import LocalizedText from './LocalizedText';

export default function AICropAdvisory() {
  const { translate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{result: string, confidence: number} | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis(null); // Reset previous analysis
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(selectedImage);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-green-50">
        <h3 className="text-lg font-bold text-primary flex items-center">
          <span className="material-icons mr-2">agriculture</span>
          <LocalizedText>{translate('aiCropAdvisory')}</LocalizedText>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          <LocalizedText>{translate('uploadImage')} {translate('analysisResult')}</LocalizedText>
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="Crop preview" 
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <button 
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewUrl(null);
                  setAnalysis(null);
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <span className="material-icons text-gray-700">close</span>
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-40 flex flex-col items-center justify-center p-4 mb-3">
              <span className="material-icons text-gray-400 text-4xl mb-2">image</span>
              <p className="text-gray-500 text-center text-sm">
                <LocalizedText>{translate('uploadImage')}</LocalizedText>
              </p>
              <label className="mt-3 cursor-pointer">
                <span className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark">
                  <LocalizedText>{translate('takePhoto')}</LocalizedText>
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          )}

          {previewUrl && !analysis && (
            <button 
              onClick={processImage} 
              disabled={isAnalyzing}
              className={`w-full mt-3 py-2 rounded-md ${isAnalyzing ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'} text-white flex items-center justify-center`}
            >
              {isAnalyzing ? (
                <>
                  <span className="material-icons animate-spin mr-2">autorenew</span>
                  <LocalizedText>{translate('analysisResult')}...</LocalizedText>
                </>
              ) : (
                <>
                  <span className="material-icons mr-2">search</span>
                  <LocalizedText>{translate('analysisResult')}</LocalizedText>
                </>
              )}
            </button>
          )}

          {analysis && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg w-full">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-primary"><LocalizedText>{translate('analysisResult')}</LocalizedText></h4>
                <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {Math.round(analysis.confidence * 100)}% <LocalizedText>{translate('confidence')}</LocalizedText>
                </div>
              </div>
              <p className="text-gray-700"><LocalizedText>{analysis.result}</LocalizedText></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}