import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';

// Move products array to App component
const products = [
  {
    id: 1,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    greenScore: 85,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Organic Materials', 'Fair Trade', 'Biodegradable'],
    quickImpact: {
      carbonSaved: '75% less CO2',
      waterSaved: '2,500L saved',
      wasteReduced: '90% less waste',
      energyEfficiency: '85% renewable',
      socialImpact: 'Fair Trade Certified'
    },
    impact: {
      carbonReduction: '75%',
      waterUsage: 'Low',
      wasteReduction: '90%',
      energyEfficiency: 'High',
      recyclability: 'Fully Recyclable',
      carbonFootprint: '2.5 kg CO2e',
      waterSaved: '2,500 liters',
      landfillWaste: '0.1 kg',
      renewableEnergy: '85%',
      packagingScore: '92%',
      transportationImpact: 'Low',
      socialImpact: 'High',
      biodiversityImpact: 'Positive',
      chemicalUsage: 'Minimal',
      lifecycleAssessment: 'A+',
      circularEconomy: 'High',
      supplyChainTransparency: 'Full'
    }
  },
  {
    id: 2,
    name: 'Bamboo Cutlery Set',
    price: 19.99,
    greenScore: 92,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Reusable', 'Biodegradable', 'Sustainable Materials'],
    quickImpact: {
      carbonSaved: '85% less CO2',
      waterSaved: '3,000L saved',
      wasteReduced: '95% less waste',
      energyEfficiency: '90% renewable',
      socialImpact: 'Supports Local Artisans'
    },
    impact: {
      carbonReduction: '85%',
      waterUsage: 'Very Low',
      wasteReduction: '95%',
      energyEfficiency: 'Very High',
      recyclability: 'Biodegradable',
      carbonFootprint: '1.2 kg CO2e',
      waterSaved: '3,000 liters',
      landfillWaste: '0 kg',
      renewableEnergy: '90%',
      packagingScore: '95%',
      transportationImpact: 'Very Low',
      socialImpact: 'Very High',
      biodiversityImpact: 'Very Positive',
      chemicalUsage: 'None',
      lifecycleAssessment: 'A+',
      circularEconomy: 'Very High',
      supplyChainTransparency: 'Full'
    }
  },
  {
    id: 3,
    name: 'Recycled Glass Water Bottle',
    price: 15.99,
    greenScore: 88,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Recycled Materials', 'Reusable', 'Zero Waste'],
    quickImpact: {
      carbonSaved: '80% less CO2',
      waterSaved: '2,800L saved',
      wasteReduced: '85% less waste',
      energyEfficiency: '88% renewable',
      socialImpact: 'Supports Recycling Programs'
    },
    impact: {
      carbonReduction: '80%',
      waterUsage: 'Low',
      wasteReduction: '85%',
      energyEfficiency: 'High',
      recyclability: 'Fully Recyclable',
      carbonFootprint: '1.8 kg CO2e',
      waterSaved: '2,800 liters',
      landfillWaste: '0.05 kg',
      renewableEnergy: '88%',
      packagingScore: '90%',
      transportationImpact: 'Low',
      socialImpact: 'High',
      biodiversityImpact: 'Positive',
      chemicalUsage: 'Minimal',
      lifecycleAssessment: 'A',
      circularEconomy: 'High',
      supplyChainTransparency: 'Full'
    }
  },
  {
    id: 4,
    name: 'Solar-Powered Charger',
    price: 49.99,
    greenScore: 90,
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Renewable Energy', 'Energy Efficient', 'Long Lasting'],
    quickImpact: {
      carbonSaved: '90% less CO2',
      waterSaved: '1,500L saved',
      wasteReduced: '80% less waste',
      energyEfficiency: '95% renewable',
      socialImpact: 'Promotes Clean Energy'
    },
    impact: {
      carbonReduction: '90%',
      waterUsage: 'Very Low',
      wasteReduction: '80%',
      energyEfficiency: 'Very High',
      recyclability: 'Partially Recyclable',
      carbonFootprint: '3.2 kg CO2e',
      waterSaved: '1,500 liters',
      landfillWaste: '0.2 kg',
      renewableEnergy: '95%',
      packagingScore: '88%',
      transportationImpact: 'Medium',
      socialImpact: 'Medium',
      biodiversityImpact: 'Neutral',
      chemicalUsage: 'Low',
      lifecycleAssessment: 'A',
      circularEconomy: 'Medium',
      supplyChainTransparency: 'High'
    }
  },
  {
    id: 5,
    name: 'Plastic Food Container',
    price: 12.99,
    greenScore: 45,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Recyclable', 'Durable'],
    quickImpact: {
      carbonSaved: '30% less CO2',
      waterSaved: '800L saved',
      wasteReduced: '40% less waste',
      energyEfficiency: '40% renewable',
      socialImpact: 'Basic Sustainability'
    },
    impact: {
      carbonReduction: '30%',
      waterUsage: 'Medium',
      wasteReduction: '40%',
      energyEfficiency: 'Medium',
      recyclability: 'Partially Recyclable',
      carbonFootprint: '4.5 kg CO2e',
      waterSaved: '800 liters',
      landfillWaste: '0.8 kg',
      renewableEnergy: '40%',
      packagingScore: '65%',
      transportationImpact: 'High',
      socialImpact: 'Low',
      biodiversityImpact: 'Negative',
      chemicalUsage: 'Medium',
      lifecycleAssessment: 'C',
      circularEconomy: 'Low',
      supplyChainTransparency: 'Medium'
    }
  },
  {
    id: 6,
    name: 'Conventional Cotton T-Shirt',
    price: 15.99,
    greenScore: 35,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    sustainability: ['Basic Materials'],
    quickImpact: {
      carbonSaved: '20% less CO2',
      waterSaved: '200L saved',
      wasteReduced: '25% less waste',
      energyEfficiency: '25% renewable',
      socialImpact: 'Minimal Impact'
    },
    impact: {
      carbonReduction: '20%',
      waterUsage: 'High',
      wasteReduction: '25%',
      energyEfficiency: 'Low',
      recyclability: 'Partially Recyclable',
      carbonFootprint: '6.8 kg CO2e',
      waterSaved: '200 liters',
      landfillWaste: '1.2 kg',
      renewableEnergy: '25%',
      packagingScore: '45%',
      transportationImpact: 'Very High',
      socialImpact: 'Very Low',
      biodiversityImpact: 'Very Negative',
      chemicalUsage: 'High',
      lifecycleAssessment: 'D',
      circularEconomy: 'Very Low',
      supplyChainTransparency: 'Low'
    }
  }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedProducts products={products} />
              <Categories />
              <Newsletter />
            </>
          } />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
