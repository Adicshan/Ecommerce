import React from "react";
import { Check, Phone, ShoppingBag, CreditCard } from "lucide-react";

function HowToBuy() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        How to Buy Designs
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        
        <p className="text-lg mb-4 text-gray-700">
          Follow these simple steps to purchase blouse designs from our store.
        </p>

        {/* Step 1 */}
        <div className="flex gap-4 items-start mb-8">
          <ShoppingBag size={40} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">1. Select Your Design</h2>
            <p className="text-gray-600">
              Browse our blouse design categories and choose the design you like.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 items-start mb-8">
          <Check size={40} className="text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">2. Add to Cart</h2>
            <p className="text-gray-600">
              Click on the product and press the <strong>Add to Cart</strong> button.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 items-start mb-8">
          <CreditCard size={40} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">3. Fill Order Details</h2>
            <p className="text-gray-600">
              Go to the cart and fill in your name, address and mobile number.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-4 items-start mb-8">
          <Phone size={40} className="text-orange-600" />
          <div>
            <h2 className="text-xl font-semibold">4. Confirm Order on WhatsApp</h2>
            <p className="text-gray-600">
              After placing the order, our team will contact you on WhatsApp for confirmation.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-700 font-medium">
            If you have any questions, feel free to contact us on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowToBuy;
