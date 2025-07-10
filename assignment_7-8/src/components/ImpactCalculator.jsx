import React, { useState, useEffect } from 'react';

const ImpactCalculator = ({ product }) => {
  const [usage, setUsage] = useState({
    quantity: 1,
    duration: 1, // in months
    frequency: 'daily', // daily, weekly, monthly
    disposalMethod: 'recycling' // recycling, landfill, composting
  });

  const [impact, setImpact] = useState({
    totalCarbonSaved: 0,
    totalWaterSaved: 0,
    totalWasteReduced: 0,
    totalEnergySaved: 0,
    environmentalScore: 0
  });

  // Convert string values to numbers for calculations
  const parseValue = (value) => {
    if (typeof value === 'string') {
      // Handle percentage values
      if (value.includes('%')) {
        return parseFloat(value.replace('%', '')) / 100;
      }
      // Handle other string values
      return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    }
    return value || 0;
  };

  // Calculate frequency multiplier
  const getFrequencyMultiplier = (frequency) => {
    switch (frequency) {
      case 'daily': return 30; // monthly
      case 'weekly': return 4; // monthly
      case 'monthly': return 1;
      default: return 1;
    }
  };

  // Calculate disposal impact
  const getDisposalImpact = (method) => {
    switch (method) {
      case 'recycling': return 0.8; // 80% positive impact
      case 'composting': return 0.9; // 90% positive impact
      case 'landfill': return 0.3; // 30% positive impact
      default: return 0.5;
    }
  };

  // Calculate base score from product's green score
  const calculateBaseScore = () => {
    return product.greenScore || 0;
  };

  useEffect(() => {
    if (product) {
      const frequencyMultiplier = getFrequencyMultiplier(usage.frequency);
      const disposalMultiplier = getDisposalImpact(usage.disposalMethod);
      const months = usage.duration;

      // Calculate total impact
      const totalCarbonSaved = parseValue(product.impact.carbonReduction) * usage.quantity * frequencyMultiplier * months * disposalMultiplier;
      const totalWaterSaved = parseValue(product.impact.waterSaved) * usage.quantity * frequencyMultiplier * months;
      const totalWasteReduced = parseValue(product.impact.wasteReduction) * usage.quantity * frequencyMultiplier * months * disposalMultiplier;
      const totalEnergySaved = parseValue(product.impact.energyEfficiency) * usage.quantity * frequencyMultiplier * months;

      // Calculate environmental score (0-100)
      const baseScore = calculateBaseScore();
      const usageScore = Math.min(100, Math.round(
        (totalCarbonSaved * 0.3) + // 30% weight
        (totalWaterSaved * 0.2) + // 20% weight
        (totalWasteReduced * 0.3) + // 30% weight
        (totalEnergySaved * 0.2) // 20% weight
      ));

      // Combine base score and usage score
      const environmentalScore = Math.round((baseScore * 0.4) + (usageScore * 0.6));

      setImpact({
        totalCarbonSaved,
        totalWaterSaved,
        totalWasteReduced,
        totalEnergySaved,
        environmentalScore: Math.min(100, environmentalScore)
      });
    }
  }, [usage, product]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent environmental impact!';
    if (score >= 50) return 'Good environmental impact';
    return 'Consider more sustainable alternatives';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sustainability Impact Calculator</h2>
      
      {/* Usage Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={usage.quantity}
            onChange={(e) => setUsage({ ...usage, quantity: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Duration (months)
          </label>
          <input
            type="number"
            min="1"
            value={usage.duration}
            onChange={(e) => setUsage({ ...usage, duration: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Frequency
          </label>
          <select
            value={usage.frequency}
            onChange={(e) => setUsage({ ...usage, frequency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disposal Method
          </label>
          <select
            value={usage.disposalMethod}
            onChange={(e) => setUsage({ ...usage, disposalMethod: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="recycling">Recycling</option>
            <option value="composting">Composting</option>
            <option value="landfill">Landfill</option>
          </select>
        </div>
      </div>

      {/* Impact Results */}
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Carbon Saved</p>
            <p className="text-2xl font-bold text-green-600">{impact.totalCarbonSaved.toFixed(1)} kg CO2e</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Water Saved</p>
            <p className="text-2xl font-bold text-blue-600">{impact.totalWaterSaved.toFixed(0)} liters</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Waste Reduced</p>
            <p className="text-2xl font-bold text-purple-600">{impact.totalWasteReduced.toFixed(1)} kg</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Energy Saved</p>
            <p className="text-2xl font-bold text-yellow-600">{impact.totalEnergySaved.toFixed(1)} kWh</p>
          </div>
        </div>
      </div>

      {/* Environmental Score */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Environmental Impact Score</h3>
        <div className={`text-4xl font-bold ${getScoreColor(impact.environmentalScore)}`}>
          {impact.environmentalScore}/100
        </div>
        <p className="text-gray-600 mt-2">
          {getScoreMessage(impact.environmentalScore)}
        </p>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Tips to Improve Impact</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Increase usage duration for better long-term impact</li>
          <li>• Choose recycling or composting for disposal</li>
          <li>• Consider bulk purchases to reduce packaging waste</li>
          <li>• Share with others to maximize environmental benefits</li>
        </ul>
      </div>
    </div>
  );
};

export default ImpactCalculator; 