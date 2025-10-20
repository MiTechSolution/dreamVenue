import React from 'react'

export const historyData = {
    title: "Our History",
    content: [
      "Established in 2005, GrandVenue Hall has been the premier destination for luxury events...",
      "Over the years, we've hosted thousands of events from intimate gatherings to grand celebrations...",
      "Our commitment to excellence has earned us numerous awards and the trust of clients..."
    ]
  };

const History = () => {
  return (
    <section className="py-20 bg-black">
    <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                    <h2 className="text-4xl font-cinzel font-bold mb-6 gold-gradient">{historyData.title}</h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        
                        {historyData.content}
                           </p>
                    {/* <p className="text-gray-300 mb-4 leading-relaxed">
                        Over the years, we've hosted thousands of events from intimate gatherings to grand celebrations, 
                        each one tailored to perfection with our signature attention to detail.
                       </p>
                    <p className="text-gray-300 leading-relaxed">
                        Our commitment to excellence has earned us numerous awards and the trust of clients who return year after year 
                        for their most important occasions.
                    </p> */}
                </div>
                <div className="fade-in" >
                    <div className="h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg gold-border flex items-center justify-center">
                        <i className="fas fa-landmark text-6xl text-yellow-400"></i>
                    </div>
                </div>
            </div>
         </div>
    </div>
</section>
  )
}


export default History