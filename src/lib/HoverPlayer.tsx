import React, { useState, useEffect, useRef } from 'react';
import {speechify} from './play'

const PlayButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="play-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      cursor: "pointer",
      background: "#6B78FC",
      borderRadius: "50%",
    }}
    {...props}
  >
    <path
      d="M16.3711 11.3506C16.8711 11.6393 16.8711 12.361 16.3711 12.6497L10.3711 16.1138C9.87109 16.4024 9.24609 16.0416 9.24609 15.4642L9.24609 8.53603C9.24609 7.95868 9.87109 7.59784 10.3711 7.88651L16.3711 11.3506Z"
      fill="white"
    />
  </svg>
);

export default function HoverPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null); // Create a ref for the paragraph

  const handlePlay = () => {
    setIsPlaying(true);
    if (paragraphRef.current) {
      speechify(paragraphRef.current); // Pass the DOM element to speechify
    }
    console.log('Playing text...');
  };

  return (
    <div>
      <PlayButton onClick={handlePlay} />
      {isPlaying && (
        <p ref={paragraphRef}>Playing text... (Add text-to-speech functionality here)</p>
      )}
    </div>
  );
}