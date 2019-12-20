import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twillio-video';

const Join = ({ location }) => {
  const defaultRoom = (location && location.state && location.state.roomName) || '';

  const { state, getRoomToken } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState(defaultRoom);

  const handleSubmit = event => {
    event.preventDefault();
    getRoomToken({ identity, roomName });
  };

  useEffect(() => {
    if (state.token && state.roomName) {
      navigate(`/room/${state.roomName}`);
    }
  }, [state]);

  return (
    <>
      <h1>Join or Start a Video Call</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <form className="start-form" onSubmit={handleSubmit}>
        <label htmlFor="identity">
          Display Name:
          <input
            type="text"
            id="identity"
            value={identity}
            onChange={event => setIdentity(event.target.value)}
          />
        </label>
        <label htmlFor="roomName">
          Room Name:
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={event => setRoomName(event.target.value)}
          />
        </label>
        <button type="submit">Join Video Chat</button>
      </form>
    </>
  );
};

export default Join;
