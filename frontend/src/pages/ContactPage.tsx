import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <p className="text-gray-300 mb-6">
            We're here to help! If you have any questions, suggestions, or need support, 
            please don't hesitate to reach out to us.
          </p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Customer Support</h2>
              <p className="text-gray-400">Email: support@quantumapp.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Business Inquiries</h2>
              <p className="text-gray-400">Email: business@quantumapp.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 