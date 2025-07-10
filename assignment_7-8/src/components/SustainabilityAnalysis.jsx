import React, { useState } from 'react';

const SustainabilityAnalysis = ({ product }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateAnalysis = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with your actual GenAI API call
      const prompt = `Analyze the sustainability impact of this product:
        Name: ${product.name}
        Green Score: ${product.greenScore}
        Carbon Reduction: ${product.impact.carbonReduction}
        Water Usage: ${product.impact.waterUsage}
        Waste Reduction: ${product.impact.wasteReduction}
        Energy Efficiency: ${product.impact.energyEfficiency}
        Social Impact: ${product.impact.socialImpact}
        
        Provide a concise, informative analysis of the environmental and social impact. Include:
        1. Overall sustainability rating
        2. Key environmental benefits
        3. Areas for improvement
        4. Comparison to industry standards`;

      // Simulated API response - replace with actual GenAI API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          text: `This ${product.name} demonstrates ${product.greenScore >= 80 ? 'excellent' : product.greenScore >= 50 ? 'good' : 'basic'} sustainability practices.
          
          Key Benefits:
          • ${product.impact.carbonReduction} carbon reduction
          • ${product.impact.waterUsage} water efficiency
          • ${product.impact.wasteReduction} waste reduction
          
          Areas for Improvement:
          • ${product.impact.energyEfficiency === 'High' ? 'Consider renewable energy sources' : 'Increase energy efficiency'}
          • ${product.impact.socialImpact === 'High' ? 'Maintain strong social impact' : 'Enhance social responsibility'}
          
          Industry Comparison:
          ${product.greenScore >= 80 ? 'Above industry average' : product.greenScore >= 50 ? 'Meets industry standards' : 'Below industry average'}`
        }), 1000)
      );

      setAnalysis(response.text);
    } catch (error) {
      console.error('Error generating analysis:', error);
      setAnalysis('Unable to generate analysis at this time.');
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={generateAnalysis}
        disabled={isLoading}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Get Product Analysis'
        )}
      </button>
      
      {analysis && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
          <div className="prose prose-sm">
            {analysis.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SustainabilityAnalysis; 