import { useEffect, useState } from 'react'
import './App.css'

const API_KEY='5ead264837913b79b3c9c2faf2660e55'

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [place, setPlace] = useState('');
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const [useLocation, setUseLocation] = useState(false);
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
    if(useLocation) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          // console.log(json);
          setData(json)
        })
        .catch(error => console.error(error))
      setPlace("")
      setUseLocation(false)
    } else {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(json => {
        let result = json;
        // console.log(json)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setData(json)
        })
        .catch(error => console.error(error))
      })
    }
  }

  return (
    <div className='flex h-screen items-center justify-center p-0'>
      <div className="box w-full flex m-8 flex-col bp:h-96 bg-currentTheme-100 rounded-xl overflow-hidden">
        <div className="date text-3xl pt-6 pb-3 px-12 text-white text-left">
          {date}
        </div>
        <div className="input mb-6 bg-currentTheme-200">
          <form className='py-6 bg-currentTheme-300 flex flex-col bp:flex-row justify-center' onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="place" className="placeholder-white text-white bg-currentTheme-200 some p-2 mx-auto font-medium border-2 rounded-lg bp:w-7/12 w-5/6" placeholder="enter the city" value={place} onChange={(e) => {
              setPlace(e.target.value)}}/>
            <div className="flex justify-between bp:p-0 px-12 py-3">
              <div className="cursor-pointer focus:outline-none text-white bg-purple-700 mx-3 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={ () => {
                getUserLocation();
                setPlace("Your location")
                setUseLocation(true);
              }
              }>Use Current Location</div>
              <button type="submit" className="mr-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>
            </div>
          </form>
        </div>
        <div className="output bg-currentTheme-300 flex justify-between px-12">
          <div className="left w-1/3 bp:w-1/5">
            {data && <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Icon" className='w-full'/>}
          </div>
          <div className="right w-2/3 py-4 text-right px-4">
            <span className="text-xl ">{data && `${data.name}, ${data.sys.country}`}</span> <br />
            <span className="text-2xl ">{data && data.weather[0].main}</span> <br />
            <span className="text-3xl font-bold">{data && (data.main.temp - 273.15).toFixed(2) + " \u00b0C"} </span> <br />
          </div>
        </div>
      </div>    
    </div>
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
