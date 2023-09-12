import React, { useState } from "react";
import "./PageNotFound.css"; // Create this file to style the component
import darkBackgroundImage from "./bg-effect.jpg"; // Replace with the path to your dark background image
import originalBackgroundImage from "./bg-original.jpg"; // Replace with the path to your original background image

const PageNotFound = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      className="darkened-background-container"
      onMouseMove={handleMouseMove}
    >
      <div
        className="background-image darkened"
        style={{ backgroundImage: `url(${darkBackgroundImage})` }}
      />

      <div
        className="background-image original "
        style={{
          // backgroundImage: `url(${originalBackgroundImage})`,

          backgroundImage: ` url(${originalBackgroundImage})`,

          clipPath: `circle(200px at ${cursorPosition.x}px ${cursorPosition.y}px  )`,
        }}
      />
      {/* Add the cursor gradient effect */}
    
      {/* Add other content on top of the background image if needed */}
    </div>
  );
};

export default PageNotFound;
