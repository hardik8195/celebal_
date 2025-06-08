import React from 'react';
import Layout from '../components/Layout';

const Calendar = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-7 gap-4">
          {/* Calendar Header */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="aspect-square border rounded-lg p-2 hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm text-gray-500">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Calendar; 