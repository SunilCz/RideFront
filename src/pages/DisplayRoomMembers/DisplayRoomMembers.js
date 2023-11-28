import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../../components/Map/Map';
import './addToRoom.css';

const DisplayToRoom = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the room and participant list when the component mounts
    const fetchRoomList = async () => {
      try {
        const response = await axios.get(`${URL}/api/users/getParticipant`);
        console.log(response);
        setRooms(response.data.allRooms);
      } catch (error) {
        console.error("Failed to fetch room list:", error);
      }
    };

    fetchRoomList();
  }, [URL]);

  return (
    <div className='main'>
      <div>
        <h2>Room List ({rooms.length})</h2>
        {rooms.map((room, index) => (
          <div key={index}>
            <h3>Room ID: {room.roomId}</h3>
            <ul>
              {room.participants.map((participant, participantIndex) => (
                <li key={participantIndex}>{participant.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div><Map rooms={rooms} /></div>
    </div>
  );
};

export default DisplayToRoom;
