import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SustainabilityAnalysis from './SustainabilityAnalysis';

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getScoreDescription = (score) => {
  if (score >= 80) return 'Excellent - Highly sustainable choice';
  if (score >= 50) return 'Good - Moderately sustainable';
  return 'Needs improvement - Consider alternatives';
};

const ImpactIndicator = ({ value, label }) => {
  const getColor = (value) => {
    if (value === 'Very High' || value === 'Very Low' || value.includes('90')) return 'bg-green-500';
    if (value === 'High' || value === 'Low' || value.includes('80')) return 'bg-green-400';
    if (value === 'Medium' || value.includes('50')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${getColor(value)}`}></div>
      <span className="text-sm text-gray-600">{label}: {value}</span>
    </div>
  );
};

const FeaturedProducts = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showImpact, setShowImpact] = useState({});

  const toggleProductComparison = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 2) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleImpact = (productId) => {
    setShowImpact(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* How Green Score Works Section */}
        <div className="mb-16 bg-green-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How Green Score Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Materials & Production</h4>
              <p className="text-gray-600">Evaluates the environmental impact of materials used and production processes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Packaging & Shipping</h4>
              <p className="text-gray-600">Assesses the sustainability of packaging materials and shipping methods.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">End of Life</h4>
              <p className="text-gray-600">Considers how the product can be recycled, reused, or disposed of responsibly.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Top Sustainable Products
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover products with high Green Scores and make eco-friendly choices
          </p>
          
          {/* Green Score Legend */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">High (80-100)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Average (50-79)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Low (0-49)</span>
            </div>
          </div>
        </div>

        {/* Product Comparison Section */}
        {selectedProducts.length > 0 && (
          <div className="mt-8 bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedProducts.map(productId => {
                const product = products.find(p => p.id === productId);
                return (
                  <div key={productId} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold">{product.name}</h4>
                    <div className="mt-2">
                      <div className={`inline-block ${getScoreColor(product.greenScore)} text-white px-3 py-1 rounded-full text-sm`}>
                        Green Score: {product.greenScore}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{getScoreDescription(product.greenScore)}</p>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium">Sustainability Features:</h5>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {product.sustainability.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative w-full h-80 bg-white group-hover:opacity-75">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className={`absolute top-4 right-4 ${getScoreColor(product.greenScore)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    Green Score: {product.greenScore}
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-gray-500">${product.price}</p>
                </Link>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.sustainability.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {product.sustainability.length > 2 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{product.sustainability.length - 2} more
                    </span>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleImpact(product.id)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {showImpact[product.id] ? 'Hide Impact' : 'Show Impact'}
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>

                {showImpact[product.id] && (
                  <div className="mt-4 space-y-2 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Quick Impact Overview</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Carbon Reduction:</span>
                        <span className="text-sm font-medium">{product.impact.carbonReduction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Water Usage:</span>
                        <span className="text-sm font-medium">{product.impact.waterUsage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Waste Reduction:</span>
                        <span className="text-sm font-medium">{product.impact.wasteReduction}</span>
                      </div>
                    </div>
                  </div>
                )}

                <SustainabilityAnalysis product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts; 