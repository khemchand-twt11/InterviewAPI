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
    <div>
      <video
        ref={videoRef}
        style={{ width: "80%", height: "100%" }}
        autoPlay
        playsInline
      />
    </div>
  );
});

export default Camerafeed;
