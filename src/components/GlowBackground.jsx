// "use client";
// import React from "react";


// const GlowBackground = ({ position = "center", color = "gold" }) => {
//   const positionClasses = {
//     center: "circle_at_center",
//     top: "ellipse_at_top",
//     bottom: "ellipse_at_bottom",
//     left: "ellipse_at_left",
//     right: "ellipse_at_right",
//   };

//   const glowColor =
//     color === "gold"
//       ? "rgba(255, 215, 0, 0.1)"
//       : color === "rose"
//       ? "rgba(255, 182, 193, 0.12)"
//       : color === "blue"
//       ? "rgba(100, 149, 237, 0.12)"
//       : "rgba(255, 215, 0, 0.1)";

//   return (
//     <div
//       className={`absolute inset-0 bg-[radial-gradient(${positionClasses[position]},_${glowColor},_transparent_70%)] blur-3xl pointer-events-none`}
//     ></div>
//   );
// };

// export default GlowBackground;
"use client";

const GlowBackground = ({ position = "top", color = "gold" }) => {
  const colorClass = color === "gold" ? "bg-yellow-500/10" : "bg-white/10";
  
  return (
    <div className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 h-1/2 ${colorClass} blur-3xl pointer-events-none`} />
  );
};

export default GlowBackground;