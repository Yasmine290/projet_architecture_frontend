import React from 'react'

const HomeView = () => {
  return (
      <div className='mt-10'>
        <div className='mb-5  ml-16'>
          <h1 className="font-extrabold text-xl mb-3">{"Obtenez 40% de réductions sur votre prochaine réservation d'hotel"}</h1>
          <h2>{"Nous comparons des prix d'hotels venant de plus de 100 sites"}</h2>
        </div>
        <div className='mx-14 flex justify-around border rounded-md'>
          <input
            id="input"
            type="text"
            className="flex-1 p-2 mt-4 h-14 rounded-md focus:border-blue-500"
            placeholder="Ou voulez-vous aller ?"
          />
          <input type="date" name="" id="" className='flex-1 p-2 mt-4 h-14 rounded-md'/>
          <input type="date" name="" id="" className='flex-1 p-2 mt-4 h-14 rounded-md'/>

          <div className='mx-5'>
            <h1 className="font-extrabold">{"invités et chambres"}</h1>
            <h2>{"2 invités, 1 chambre"}</h2>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-2 mx-2">
            Rechercher
          </button>
        </div>
      </div>
  )
}

export default HomeView