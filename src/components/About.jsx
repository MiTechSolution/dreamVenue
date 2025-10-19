" useclient ";

import React, { use } from 'react'


const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
    <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 fade-in">
            <h2 className="text-4xl font-cinzel font-bold mb-6">
                <span className="gold-gradient">About GrandVenue Hall</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
                GrandVenue Hall stands as the epitome of luxury and sophistication in event hosting. 
                With our exquisite black and gold interiors, state-of-the-art facilities, and impeccable service, 
                we create the perfect backdrop for your most important celebrations. From grand weddings to corporate galas, 
                our dedicated team ensures every detail is executed to perfection.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-gray-900/50 gold-border fade-in transform transition duration-300 hover:scale-110">
                <div className="text-yellow-400 text-4xl mb-4">
                    <i className="fas fa-crown"></i>
                </div>
                <h3 className="text-xl font-cinzel font-semibold mb-3 ">Luxury Design</h3>
                <p className="text-gray-300">Exquisite interiors with custom gold accents and premium finishes.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-900/50 gold-border fade-in transform transition duration-300 hover:scale-110">
                <div className="text-yellow-400 text-4xl mb-4">
                    <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-cinzel font-semibold mb-3">Capacity</h3>
                <p className="text-gray-300">Accommodating events from intimate gatherings to grand celebrations of up to 500 guests.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-900/50 gold-border  fade-in transform transition duration-300 hover:scale-110">
                <div className="text-yellow-400 text-4xl mb-4">
                    <i className="fas fa-concierge-bell"></i>
                </div>
                <h3 className="text-xl font-cinzel font-semibold mb-3">Premium Services</h3>
                <p className="text-gray-300">Dedicated event planning, catering, and concierge services for a seamless experience.</p>
            </div>
        </div>
    </div>
</section>
  )
}

export default About