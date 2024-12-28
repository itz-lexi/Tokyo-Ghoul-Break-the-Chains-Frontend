import React, { useState, useEffect } from "react";

const CharacterPassives = ({ character }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState("left");

  const handlePassiveDetails = () => {
    setIsVisible(!isVisible); // Toggle visibility
  };

  useEffect(() => {
    const updateBoxPosition = () => {
      // Set box position based on window size
      if (window.innerWidth <= 768) {
        setBoxPosition("right");
      } else {
        setBoxPosition("left");
      }
    };

    updateBoxPosition(); // Run on mount
    window.addEventListener("resize", updateBoxPosition); // Update on resize
    return () => {
      window.removeEventListener("resize", updateBoxPosition);
    };
  }, []);

  return (
    <div>
      <button onClick={handlePassiveDetails}>Show Passives</button>
      {isVisible && (
        <div
          className={`passive-box ${boxPosition}`}
          style={{
            position: "absolute",
            top: "50px",
            [boxPosition]: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#fff",
            zIndex: 1000,
          }}
        >
          <h3>{character.name}'s Passives</h3>
          <ul>
            {character.passives.map((passive, index) => (
              <li key={index}>{passive}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterPassives;
