import React, { useState, useEffect } from 'react';
import days from '../datas/days'; // Import des jours

const AdventCalendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null); // État pour le jour sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modale
  const today = new Date().getDate();

  // Mélanger les jours pour un agencement aléatoire
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fonction pour choisir une image aléatoire parmi celles dans le dossier 'gift-wrap'
  const getRandomGiftBackground = () => {
    const randomIndex = Math.floor(Math.random() * 7) + 1; // Choisir un nombre entre 1 et 7
    return `${process.env.PUBLIC_URL}/gift-wrap/bg-${randomIndex}.jpg`; // Retourner le chemin de l'image correspondante
  };

  // Initialisation des données du calendrier
  useEffect(() => {
    const shuffledDays = shuffleArray(days).map((entry) => ({
      ...entry,
      background: getRandomGiftBackground(), // Assigner une image aléatoire pour chaque case
    }));
    setCalendar(shuffledDays); // Mélanger les jours et assigner une image de fond unique pour chaque case
  }, []);

  const handleOpen = (day) => {
    if (day <= today) {
      setSelectedDay(day); // Définir le jour sélectionné
      setIsModalOpen(true); // Ouvrir la modale
      setCalendar((prevCalendar) =>
        prevCalendar.map((entry) =>
          entry.day === day ? { ...entry, isOpen: true } : entry
        )
      );
    } else {
      alert('Tricheuse! Tu dois attendre pour celle là! CDB !!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fermer la modale
  };

  return (
    <div
      className="grid grid-cols-4 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 min-h-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background/chr-bg2.png)`, // Fond de calendrier
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {calendar.map((entry) => (
        <div
          key={entry.day}
          className={`flex items-center justify-center font-bold cursor-pointer 
            ${entry.isOpen ? 'bg-green-600' : 'bg-red-800'} 
            rounded-lg p-6 transition-transform transform hover:scale-105 
            shadow-2xl hover:shadow-2xl`}
          onClick={() => handleOpen(entry.day)}
          style={{
            backgroundImage: `url(${entry.background})`, // Appliquer l'image de fond unique pour chaque case
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <span className="text-outline text-3xl">{entry.day}</span>
        </div>
      ))}

      {/* Modale */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-md"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur la modale
          >
            <img
              src={`${process.env.PUBLIC_URL}/gifts/gift-${selectedDay}.jpg`}
              alt={`Gift for day ${selectedDay}`}
              className="w-full h-auto rounded"
            />
            <button
              className="mt-4 w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700"
              onClick={handleCloseModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventCalendar;



//////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';

// const AdventCalendar = () => {
//   const [calendar, setCalendar] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null); // État pour le jour sélectionné
//   const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modale
//   const today = new Date().getDate();

//   // Fonction pour récupérer les images du calendrier depuis l'API
//   useEffect(() => {
//     const fetchGifts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/gifts');  // Appel à l'API
//         const data = await response.json();
//         const shuffledDays = data.map((entry) => ({
//           ...entry,
//           background: `/gift-wrap/bg-${Math.floor(Math.random() * 7) + 1}.jpg`, // Appliquer une image aléatoire
//         }));
//         setCalendar(shuffledDays); // Mettre à jour l'état avec les données
//       } catch (error) {
//         console.error("Error fetching gifts:", error);
//       }
//     };

//     fetchGifts();  // Appel à l'API pour récupérer les images
//   }, []);

//   const handleOpen = (day) => {
//     if (day <= today) {
//       setSelectedDay(day); // Définir le jour sélectionné
//       setIsModalOpen(true); // Ouvrir la modale
//       setCalendar((prevCalendar) =>
//         prevCalendar.map((entry) =>
//           entry.day === day ? { ...entry, isOpen: true } : entry
//         )
//       );
//     } else {
//       alert("Vous ne pouvez pas ouvrir cette case avant le jour correspondant !");
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Fermer la modale
//   };

//   return (
//     <div
//       className="grid grid-cols-4 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 min-h-screen"
//       style={{
//         backgroundImage: 'url(/background/chr-bg2.png)', // Fond de calendrier
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       {calendar.map((entry) => (
//         <div
//           key={entry.day}
//           className={`flex items-center justify-center font-bold cursor-pointer 
//             ${entry.isOpen ? 'bg-green-600' : 'bg-red-800'} 
//             rounded-lg p-6 transition-transform transform hover:scale-105 
//             shadow-2xl hover:shadow-2xl`}
//           onClick={() => handleOpen(entry.day)}
//           style={{
//             backgroundImage: `url(${entry.background})`, // Appliquer l'image de fond unique pour chaque case
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//           }}
//         >
//           <span className="text-outline text-3xl">{entry.day}</span>
//         </div>
//       ))}

//       {/* Modale */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           onClick={handleCloseModal}
//         >
//           <div
//             className="bg-white p-4 rounded-lg shadow-lg max-w-md"
//             onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur la modale
//           >
//             <img
//               src={`http://localhost:5000/gifts/${selectedDay}.jpg`}  // Utiliser l'API pour récupérer l'image
//               alt={`Gift for day ${selectedDay}`}
//               className="w-full h-auto rounded"
//             />
//             <button
//               className="mt-4 w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700"
//               onClick={handleCloseModal}
//             >
//               Fermer
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdventCalendar;
