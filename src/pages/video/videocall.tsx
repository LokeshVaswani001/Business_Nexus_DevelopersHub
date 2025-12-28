import React, { useRef, useState } from 'react';

const VideoCall: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const startCall = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
    setStream(mediaStream);
    setCameraOn(true);
    setMicOn(true);
  };

  const endCall = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setCameraOn(false);
    setMicOn(false);
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach(t => (t.enabled = !cameraOn));
    setCameraOn(!cameraOn);
  };

  const toggleMic = () => {
    stream?.getAudioTracks().forEach(t => (t.enabled = !micOn));
    setMicOn(!micOn);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Video Call</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-xl bg-black rounded"
      />

      <div className="flex gap-3">
        {!stream && (
          <button onClick={startCall} className="btn-primary">
            Start Call
          </button>
        )}

        {stream && (
          <>
            <button onClick={endCall} className="btn-danger">
              End Call
            </button>
            <button onClick={toggleCamera} className="btn-secondary">
              {cameraOn ? 'Camera Off' : 'Camera On'}
            </button>
            <button onClick={toggleMic} className="btn-secondary">
              {micOn ? 'Mic Off' : 'Mic On'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
