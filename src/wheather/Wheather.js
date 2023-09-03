//d099c8c1d1b88813e128e238edc852e9
//apicity   api.openweathermap.org/data/2.5/weather?q=lucknow&appid=d099c8c1d1b88813e128e238edc852e9
import React from 'react'
import './wheather.css'



const Wheather = () => {

 const [searchValue, setSearchValue]= React.useState("lucknow");  
 const [tempInfo, setTempInfo]=React.useState({});

 const icons ={
      Clear:'https://cdn-icons-png.flaticon.com/512/2392/2392508.png',
      Haze:'https://w7.pngwing.com/pngs/244/421/png-transparent-weather-clouds-fog-foggy-weather-color-icon.png',
      Clouds:'https://w7.pngwing.com/pngs/244/421/png-transparent-weather-clouds-fog-foggy-weather-color-icon.png',
      Mist:'https://cdn-icons-png.flaticon.com/512/175/175959.png',
      Smoke:'https://upload.wikimedia.org/wikipedia/commons/2/23/Smoke_icon_iOS.png',
      Rain:'https://cdn-icons-png.flaticon.com/512/7038/7038403.png',
      
 }
 
 const getWeatherInfo=async ()=>{
    try{
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d099c8c1d1b88813e128e238edc852e9`;
        const res = await fetch(url);
        const data = await res.json();

        const { temp,humidity,pressure} = data.main;
        const { speed} = data.wind;
        const { main:weatherMood} = data.weather[0];
        const { country,sunset}=data.sys
        const {name,timezone}=data
        
        
        const myWeather={
            name :name,
            humidity :humidity,
            pressure: pressure,
            speed:speed,
            weatherMood : weatherMood,
            country:country,
            sunset:sunset,
            temp:temp,
            timezone:timezone

        };
        setTempInfo(myWeather);
    
        
    } catch(error){
       console.log(error)
    }
 }
 const iconsWeather ={
    Clear:'https://cdn-icons-png.flaticon.com/512/2392/2392508.png',
    Haze:'https://cdn-icons-png.flaticon.com/512/182/182266.png',
    Clouds:'https://cdn-icons-png.flaticon.com/512/3222/3222791.png',
    Mist:'https://cdn-icons-png.flaticon.com/512/175/175959.png',
    Smoke:'https://upload.wikimedia.org/wikipedia/commons/2/23/Smoke_icon_iOS.png',
    Rain:'https://cdn-icons-png.flaticon.com/512/7038/7038403.png',
    
}   
  const getIcon=(w)=>{
    switch(w){
        case "Clear":return(iconsWeather.Clear);break;
        case "Haze":return(iconsWeather.Haze);break;
        case "Clouds":return(iconsWeather.Clouds);break;
        case "Mist":return(iconsWeather.Mist);break;
        case "Smoke":return(iconsWeather.Smoke);break;
        case "Rain":return(iconsWeather.Rain);break;
    }
  }









 React.useEffect(()=>{
            getWeatherInfo();
 }, [])
 
    let sec= tempInfo.sunset;
    let date=new Date(sec*1000);
    let timeStr=`${date.getHours()}:${date.getMinutes()}`


    let d=new Date();
    let utc =d.getTimezoneOffset()
    d.setMinutes(d.getMinutes() +utc);
    let city_minutes=(tempInfo.timezone)/60;
    
    d.setMinutes(d.getMinutes() +city_minutes);
    let hours_ ="";
    let mer =""; 
    let x=d.getHours()
   if(x >12){
       hours_ =d.getHours() -12;
       mer ='PM';
      }
       else if(x==12){
        mer='PM'
        hours_=d.getHours();
       }
   else{
       hours_=d.getHours();
       mer='AM'
    } 
    let city_time=`${hours_}:${d.getMinutes()} ${mer}`;
    let city_date=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    console.log(hours_)



  return (
    <>
      <div className='searchbar'>
        <div className='search'>
           <input type="search"  placeholder='search...' id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
           <button className='searchButton' type='button' onClick={getWeatherInfo}>SEARCH</button>
        </div>
      </div>
      <article className='widget'>
        <div className='weatherIcon'>
          <img className='icon' src={getIcon(tempInfo.weatherMood)} alt="" />
           
        </div>
        <div className='weatherInfo btn-group'>
            <div className='temperature'>
                <span>{tempInfo.temp}°</span>
                
            </div>
            <div className='description'>
                <div className='weatherCondition'>{tempInfo.weatherMood}</div>
                <div className="place">{tempInfo.name},{tempInfo.country}</div>
               
            </div>
        </div>
        <div className='date'>{city_date} <br />{city_time}</div>

        
        {/* our 4 column section */}
        
        
      </article>
      <footer className='aside'>
         {/* <div  className='attributeImage'><img src="https://cdn.iconscout.com/icon/free/png-256/free-sun-sunset-weather-shine-orange-sea-forecast-15470.png?f=webp" alt="" /></div> */}
         
        <h5 className='Attributes'> {timeStr} <br />Sunset</h5>
        <h5 className='Attributes'>{tempInfo.humidity} <br />humidity</h5>
        <h5 className='Attributes'>{tempInfo.pressure} <br />pressure</h5>
        <h5 className='Attributes'> {tempInfo.speed}<br />Wind speed</h5>

      </footer>
    
    

    </>
  )
}

export default Wheather
