"use client"

import React, { useState, } from 'react';

const HomeView = () => {
  const [cityName, setCityName] = useState<string>(''); // Etat pour la ville
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);  // Etat pour stocker les résultats
  const [showModal, setShowModal] = useState<boolean>(false); // Etat pour afficher/masquer le modal

  // Pour gérer le délai entre les requêtes (debouncing)
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fonction pour gérer la recherche de villes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);

    // Annuler la recherche précédente si elle existe
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Attendre 500ms avant de lancer la recherche
    const timeout = setTimeout(async () => {
      if (cityName.trim() === '') return; // Si le champ est vide, ne rien faire

      try {
        // Faire une requête GET à ton API Flask pour obtenir les résultats de la ville
        const response = await fetch(`http://localhost:5000/hotels/city-mappings?city_name=${cityName}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setResults(data); // Mettre à jour les résultats
          setShowModal(true); // Afficher le modal
        } else {
          console.error("Pas de données valides reçues.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }, 500); // Le délai de 500ms avant de faire la recherche

    // Sauvegarder le timeout pour pouvoir l'annuler si l'utilisateur tape de nouveau avant le délai
    setDebounceTimeout(timeout);
  };

  return (
    <div className='mt-10'>
      <div className='mb-5 ml-16'>
        <h1 className="font-extrabold text-xl mb-3">{"Obtenez 40% de réductions sur votre prochaine réservation d'hotel"}</h1>
        <h2>{"Nous comparons des prix d'hotels venant de plus de 100 sites"}</h2>
      </div>
      <div className='mx-14 flex justify-around border rounded-md'>
        <input
          id="input"
          type="text"
          className="flex-1 p-2 mt-4 h-14 rounded-md focus:border-blue-500"
          placeholder="Ou voulez-vous aller ?"
          value={cityName}
          onChange={(e) => console.log(e.target.value)} // Mettre à jour cityName à chaque changement dans le champ
          // onChange={(e) => handleSearch(e)} // Mettre à jour cityName à chaque changement dans le champ
        />
        <input type="date" name="" id="" className='flex-1 p-2 mt-4 h-14 rounded-md' />
        <input type="date" name="" id="" className='flex-1 p-2 mt-4 h-14 rounded-md' />

        <div className='mx-5'>
          <h1 className="font-extrabold">{"invités et chambres"}</h1>
          <h2>{"2 invités, 1 chambre"}</h2>
        </div>
        <button 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-2 mx-2"
          onClick={() => console.log("recherche")} // Lancer la recherche lors du clic sur le bouton (facultatif ici)
        >
          Rechercher
        </button>
      </div>

      {/* Modal pour afficher les résultats */}
      {showModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md p-4 shadow-lg w-full max-w-md">
            <button 
              className="text-black absolute top-2 right-2"
              onClick={() => setShowModal(false)} // Fermer le modal
            >
              ✖
            </button>
            <h2 className="font-bold text-lg mb-2">Résultats pour {cityName}</h2>
            <ul className="space-y-2">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {results.map((result: any) => (
                <li key={result.document_id} className="p-2 border-b">
                  <strong>{result.name}</strong> (ID: {result.document_id})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
