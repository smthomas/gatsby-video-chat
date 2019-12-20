import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import UseTwilioVideo from '../hooks/use-twillio-video';

const VideoDisplay = ({ roomID }) => {
  const { state, startVideo, leaveRoom, videoRef } = UseTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: { roomName: roomID } });
    }

    if (!state.room) {
      startVideo();
    }

    window.addEventListener('beforeunload', leaveRoom);

    return () => {
      window.removeEventListener('beforeunload', leaveRoom);
    }
  }, [state, roomID, startVideo, leaveRoom]);

  return (
    <>
      <h1>Room: "{roomID}"</h1>
      {state.room && (
        <button className="leave-room" onClick={leaveRoom}>
          Leave Room
        </button>
      )}
      <div className="chat" ref={videoRef} />
    </>
  );
};

export default VideoDisplay;
