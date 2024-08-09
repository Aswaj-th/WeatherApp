import { useEffect, useState } from 'react'
import './App.css'

const API_KEY='5ead264837913b79b3c9c2faf2660e55'

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [place, setPlace] = useState('');
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getUserLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log(position.coords)
        },
        (error) => {
          alert('Error getting user location:', error);
        }
      );
    } else {
      alert("Please enable geolocation API to use this feature")
    }
  }

  useEffect(() => {
    const currentDate = new Date();
    setDate(`${days[currentDate.getDay()]}, ${month[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(place === null || place === '') {
      alert("Enter the place first");
    } else {
      callAPI();
    }
  }

  const callAPI = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
  }

  return (
    <>
      <div className="box flex flex-col h-80 bg-currentTheme-100">
        <div className="input py-6 bg-currentTheme-200">
          <form className='py-6 bg-currentTheme-300 flex' onSubmit={(e) => handleSubmit(e)}>
            <div className="cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={ () => {
              getUserLocation();
              setPlace("Your location");
            }
            }>Use Current Location</div>
            <input type="text" className="text-white bg-currentTheme-400 some p-2 mx-6 font-medium border-2 rounded-lg w-7/12" placeholder="enter the city" value={place} onChange={(e) => {
              setPlace(e.target.value)}}/>
            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>
          </form>
        </div>
        <div className="date">
          {date}
        </div>
        <div className="output bg-currentTheme-300 flex justify-between px-12">
          <div className="left w-1/3">hey</div>
          <div className="right w-2/3"></div>
        </div>
      </div>
    </>
    // <>
    // <h1>Geolocation App</h1>
    //   {/* create a button that is mapped to the function which retrieves the users location */}
    //   <button onClick={getUserLocation}>Get User Location</button>
    //   {/* if the user location variable has a value, print the users location */}
    //   {userLocation && (
    //     <div>
    //       <h2>User Location</h2>
    //       <p>Latitude: {userLocation.latitude}</p>
    //       <p>Longitude: {userLocation.longitude}</p>
    //     </div>
    //   )}
    // </>
  )
}

export default App
