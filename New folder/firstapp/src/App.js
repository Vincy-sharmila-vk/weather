import { useEffect, useState } from 'react';
import './App.css';
import { CircularProgress, Slide, TextField } from '@mui/material'
function App() {

  const [cityname, setCityname] = useState("Rome");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);






  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=24e7e858af508394f623011df44b8b5d&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        error && setError(false);
        return res.json()
      } else {
        throw new Error('Some went wrong')
      }
    }).then((data) => {
      setData(data)
    }).catch(() => setError(true))
      .finally(() => setLoading(false))

  }, [cityname, error]);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityname(e.target.value);
      setInputText("");
    }
  }



  return (
    <div className="bg-img">
      {
        !loading ? (
          <>
            <TextField variant='filled' label="Search location" className='input' value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleSearch}
              error={error}
              style={{ margin: '45px' }} />
            <h1 className='city'>{data.name}</h1>
            <div className='group'>
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
              <h1>{data.weather[0].main}</h1>
            </div>
            <h1 className='temp'>{data.main.temp.toFixed()} <span>&#8451;</span></h1>
            <Slide direction='right' timeout={800} in={!loading}>
              <div className='box_container'>
                <div className='box'>
                  <p>Humidity</p>
                  <h1>{data.main.humidity.toFixed()}%</h1>


                </div>
                <div className='box'>
                  <p>Wind</p>
                  <h1>{data.wind.speed.toFixed()} km/h</h1>


                </div>
                <div className='box'>
                  <p>Feels like</p>
                  <h1>{data.main.feels_like.toFixed()} <span>&#8451;</span></h1>


                </div>

              </div>
            </Slide>
          </>
        ) : (
          <CircularProgress />
        )
  }
    </div>

  );
}
export default App;
