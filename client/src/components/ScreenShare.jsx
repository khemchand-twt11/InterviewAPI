import React, { useRef, useEffect } from "react";

function ScreenShare({ onScreenShare }) {
  const videoRef = useRef(null);

  const startCapture = async () => {
    try {
      const displayMediaOptions = {
        video: {
          cursor: "always",
        },
        audio: false,
      };
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );

      mediaStream.getTracks()[0].onended = function () {
        alert("Your entire screen is not being shared!");
      };

      videoRef.current.srcObject = mediaStream;

      if (onScreenShare) {
        onScreenShare();
      } else {
        console.warn("onScreenShare function is not defined");
      }
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  useEffect(() => {
    startCapture();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <video
        ref={videoRef}
        style={{ maxWidth: "80%", border: "1px solid #333" }}
        autoPlay
        playsInline
      />
    </div>
  );
}

export default ScreenShare;
