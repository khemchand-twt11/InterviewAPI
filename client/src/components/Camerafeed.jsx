import React, { useEffect, useRef } from "react";

const Camerafeed = React.memo(() => {
  const videoRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, []); // <-- Don't forget to pass an empty dependencies array to useEffect

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        className="rounded-xl w-[85%] h-3/6"
        autoPlay
        playsInline
      />
    </div>
  );
});

export default Camerafeed;
