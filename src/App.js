import React, { useState } from "react";
import "./styles.css";
import { Route, Switch } from "react-router-dom";
import DailyForecast from "./DailyForecast";
import { DateTime } from "luxon";
import WeekReport from "./WeekReport";
import TodayWeather from "./TodayWeather";

export default function App() {
  const [preventDup, setpreventDup] = useState(true);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [city, setCity] = useState(null);

  const unixConvert = d => {
    return DateTime.fromSeconds(d).toLocaleString({
      weekday: "short",
      month: "2-digit",
      day: "2-digit"
    });
  };

  preventDup &&
    fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=7edb06f1dd814179885ca67120c68468"
    )
      .then(response => response.json())
      .then(result => {
        setLat(result.latitude);
        setLon(result.longitude);
        setCity(result.city);
      })
      .catch(error => console.log("error", error));

  lat &&
    lon &&
    preventDup &&
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=hourly,daily&appid=222090c92da79d1605caf5ea9828115e&units=metric`
    )
      .then(response => response.json())
      .then(result => setWeekly(result.daily))
      .then(setpreventDup(false))
      .catch(error => console.log("error", error));

  return (
    <div className="App">
      <div className="row">
        {city && weekly && (
          <span className="header">
            Hello you sexy beast. Here is your weather report for <b>{city}</b>
          </span>
        )}
      </div>
      <div className="row2">
        {weekly &&
          city &&
          weekly.map((result, index) => (
            <WeekReport
              key={index}
              global={result}
              day={unixConvert(result.dt)}
              utc={result.dt}
              high={result.temp.max}
              low={result.temp.min}
              icon={result.weather[0].icon}
            />
          ))}
      </div>
      <div className="row">
        {weekly && city && (
          <Switch>
            <Route path="/:unix/">
              <DailyForecast results={weekly} />
            </Route>
            <Route path="/">
              {weekly &&
                weekly
                  .filter((_, ind) => {
                    return ind === 0;
                  })
                  .map((result, ind) => (
                    <TodayWeather
                      key={ind}
                      global={result}
                      day={unixConvert(result.dt)}
                      high={result.temp.max}
                      low={result.temp.min}
                      icon={result.weather[0].icon}
                    />
                  ))}
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}
