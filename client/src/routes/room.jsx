import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../App';
import toast from 'react-hot-toast';

export const Room = () => {
  const { roomId } = useLoaderData();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    toast(`Welcome to room ${roomId}!`, {
      icon: '👏'
    });
  }, []);

  socket.on('users', (users) => {
    console.log('🚀 ~ file: room.jsx:12 ~ socket.on ~ users:', users);
    setUsers(users);
  });

  return (
    <div>
      <h1>Room {roomId}</h1>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (

          socket.id === user
            ? (<li key={user} style={{ color: 'green' }}>
                {user} (you)
              </li>)
            : (<li key={user}>{user}</li>)

        ))}
      </ul>
    </div>
  );
};
