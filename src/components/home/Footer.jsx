import React from 'react'

const Footer = () => {
  return (
    <footer id="contact" className="py-12 bg-black border-t gold-border">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* <!-- Address --> */}
            <div className="text-center md:text-left">
                <h3 className="font-cinzel font-bold text-xl mb-4 gold-gradient">Address</h3>
                <p className="text-gray-300 mb-2">
                    <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i>
                    123 Luxury Avenue
                </p>
                <p className="text-gray-300 mb-2">Prestige District</p>
                <p className="text-gray-300">Metropolis, MP 12345</p>
            </div>
            
            {/* <!-- Contact --> */}
            <div className="text-center">
                <h3 className="font-cinzel font-bold text-xl mb-4 gold-gradient">Contact</h3>
                <p className="text-gray-300 mb-2">
                    <i className="fas fa-phone text-yellow-400 mr-2"></i>
                    (555) 123-4567
                </p>
                <p className="text-gray-300 mb-2">
                    <i className="fas fa-envelope text-yellow-400 mr-2"></i>
                    info@grandvenuehall.com
                </p>
                <a href="booking.html" className="gold-button px-6 py-2 rounded-full font-medium inline-block mt-4">
                    Book a Tour
                </a>
            </div>
            
            {/* <!-- Social Links --> */}
            <div className="text-center md:text-right">
                <h3 className="font-cinzel font-bold text-xl mb-4 gold-gradient">Follow Us</h3>
                <div className="flex justify-center md:justify-end space-x-4">
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 text-2xl">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 text-2xl">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 text-2xl">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 text-2xl">
                        <i className="fab fa-pinterest"></i>
                    </a>
                </div>
                <p className="text-gray-400 mt-6 text-sm">
                    &copy; 2023 GrandVenue Hall. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer