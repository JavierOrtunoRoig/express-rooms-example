import './App.css';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const URL = 'http://localhost:4000';

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io(URL);

function App () {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const createRoom = () => {
    // send to server room choosed by user

    fetch(`${URL}/newRoom`)
      .then((res) => res.json())
      .then((data) => {
        socket.emit('join', data.room);
        socket.on('joined', (roomId) => {
          navigate(`/room/${roomId}`);
        });
      });
  };

  const joinRoom = () => {
    // send to server room choosed by user

    fetch(`${URL}/joinRoom?roomId=${roomId}&name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          socket.emit('join', data.roomId);
          socket.on('joined', (roomId) => {
            navigate(`/room/${roomId}`);
          });
        } else {
          return toast.error(data.msg);
        }
      });
  };

  return (
    <>
      <h1>Rooms example</h1>
      <div className="card">
        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="text" placeholder="Enter room id" onChange={(e) => setRoomId(e.target.value)} />
        <br />
        <button onClick={createRoom}>Create new room</button>
        <button onClick={joinRoom}>Join in room</button>
      </div>
    </>
  );
}

export default App;
