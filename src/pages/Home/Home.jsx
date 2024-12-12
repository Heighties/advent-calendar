import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: 'url(/background/chr-bg1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <button
        onClick={() => navigate('/calendar')} // Naviguer vers la page du calendrier
        className="bg-black text-white py-3 px-6 rounded-lg bg-opacity-50 hover:bg-gray-800 transition transform hover:scale-105 italic"
        style={{ position: 'relative', top: '20vh' }} // Ajustement de la position
      >
        OPEN
      </button>
    </div>
  );
};

export default Home;
