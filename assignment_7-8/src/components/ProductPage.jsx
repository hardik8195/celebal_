import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import ImpactCalculator from './ImpactCalculator';

const certifications = {
  'Fair Trade': {
    description: 'Ensures fair wages and safe working conditions',
    icon: '🌍',
    color: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  'USDA Organic': {
    description: 'Certified organic by the United States Department of Agriculture',
    icon: '🌱',
    color: 'bg-green-100',
    textColor: 'text-green-800'
  },
  'Energy Star': {
    description: 'Meets strict energy efficiency guidelines',
    icon: '⚡',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  'FSC Certified': {
    description: 'Forest Stewardship Council certified sustainable forestry',
    icon: '🌲',
    color: 'bg-emerald-100',
    textColor: 'text-emerald-800'
  },
  'Recycled Content': {
    description: 'Contains recycled materials',
    icon: '♻️',
    color: 'bg-purple-100',
    textColor: 'text-purple-800'
  },
  'Carbon Neutral': {
    description: 'Carbon emissions are offset through verified projects',
    icon: '🌎',
    color: 'bg-gray-100',
    textColor: 'text-gray-800'
  }
};

const ImpactSection = ({ title, impacts, className = "" }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(impacts).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          <span className="font-semibold text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProductPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <Link to="/" className="mt-4 inline-block text-green-600 hover:text-green-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Group impact parameters into categories
  const environmentalImpact = {
    carbonFootprint: product.impact.carbonFootprint,
    waterSaved: product.impact.waterSaved,
    landfillWaste: product.impact.landfillWaste,
    renewableEnergy: product.impact.renewableEnergy,
    biodiversityImpact: product.impact.biodiversityImpact,
    chemicalUsage: product.impact.chemicalUsage
  };

  const sustainabilityMetrics = {
    carbonReduction: product.impact.carbonReduction,
    waterUsage: product.impact.waterUsage,
    wasteReduction: product.impact.wasteReduction,
    energyEfficiency: product.impact.energyEfficiency,
    recyclability: product.impact.recyclability,
    packagingScore: product.impact.packagingScore
  };

  const socialAndSupplyChain = {
    transportationImpact: product.impact.transportationImpact,
    socialImpact: product.impact.socialImpact,
    lifecycleAssessment: product.impact.lifecycleAssessment,
    circularEconomy: product.impact.circularEconomy,
    supplyChainTransparency: product.impact.supplyChainTransparency
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="text-green-600 hover:text-green-700">
            ← Back to Products
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className={`absolute top-4 right-4 ${getScoreColor(product.greenScore)} text-white px-4 py-2 rounded-full text-lg font-semibold`}>
                Green Score: {product.greenScore}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-2 text-2xl text-gray-900">${product.price}</p>
              </div>

              {/* Quick Impact Overview */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Impact Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Carbon Reduction</p>
                    <p className="text-lg font-semibold">{product.impact.carbonReduction}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Water Usage</p>
                    <p className="text-lg font-semibold">{product.impact.waterUsage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Waste Reduction</p>
                    <p className="text-lg font-semibold">{product.impact.wasteReduction}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Energy Efficiency</p>
                    <p className="text-lg font-semibold">{product.impact.energyEfficiency}</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Detailed Impact Sections */}
          <div className="border-t border-gray-200 p-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Sustainability Impact</h2>
            
            <ImpactSection 
              title="Environmental Impact" 
              impacts={environmentalImpact}
              className="mb-8"
            />
            
            <ImpactSection 
              title="Sustainability Metrics" 
              impacts={sustainabilityMetrics}
              className="mb-8"
            />
            
            <ImpactSection 
              title="Social & Supply Chain Impact" 
              impacts={socialAndSupplyChain}
            />
          </div>

          {/* Sustainability Certifications */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sustainability Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.sustainability.map((cert, index) => {
                const certInfo = certifications[cert] || {
                  description: 'Sustainable practice verified',
                  icon: '✅',
                  color: 'bg-gray-100',
                  textColor: 'text-gray-800'
                };

                return (
                  <div key={index} className={`${certInfo.color} rounded-lg p-6`}>
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{certInfo.icon}</span>
                      <div>
                        <h3 className={`text-lg font-semibold ${certInfo.textColor}`}>{cert}</h3>
                        <p className="text-gray-600 mt-1">{certInfo.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Sustainability Report */}
          <div className="border-t border-gray-200 p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Sustainability Report</h2>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="mt-4">
                  <QRCodeSVG
                    value={`https://walmart.com/sustainability-report/${product.id}`}
                    size={128}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Scan for detailed sustainability report
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-4">
                  Scan this QR code to access the complete sustainability report for this product, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Comprehensive environmental impact assessment</li>
                  <li>Supply chain transparency and verification</li>
                  <li>Detailed certification information</li>
                  <li>Social responsibility initiatives</li>
                  <li>Manufacturing process details</li>
                  <li>End-of-life disposal guidelines</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Calculator */}
          <div className="mb-8">
            <ImpactCalculator product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 