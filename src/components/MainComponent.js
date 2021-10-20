import React, { useStaet } from "react";
import Header from "./HeaderComponent";
import Search from "./SearchComponent";
import WeatherInfo from "./CardComponent";
import Footer from "./FooterComponent";

const Main = () => {
  const [state, setState] = React.useState({
    searchBarInput: "",
    details: {
      temprature: null,
      description: "",
    },
    isFetching: false,
  });

  const onChange = (e) => {
    setState({ searchBarInput: e ? e.target.value : "" });
  };

  const setWeather = () => {
    const city = state.searchBarInput;
    const API_KEY = "d302d98fe71b4661c7d0b51f198888df";
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const URL = API_URL + `?q=${city}&appid=${API_KEY}&units=metric`;
    if (city && city.trim().length > 0) {
      setState({ isFetching: true });
      fetch(URL)
        .then(
          (response) => {
            if (response.ok) return response;
            else return null;
          },
          (error) => {
            alert("City not found...");
            console.log(error);
            return null;
          }
        )
        .then(
          (response) => {
            if (response) return response.json();
          },
          (error) => {
            console.log(error);
            return null;
          }
        )
        .then((data) => {
          if (data && data.cod === 200) {
            setState({
              details: {
                temprature: data.main.temp,
                description: data.weather[0].main,
              },
              isFetching: false,
            });
          } else if (data) {
            throw data.cod;
          } else {
            alert("City not found...");
            onChange(null);
            setState({
              searchBarInput: "",
              details: {
                temprature: null,
                description: "",
                isFetching: false,
              },
            });
          }
        });
    } else {
      setState({
        details: {
          temprature: null,
          description: "",
          isFetching: false,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <Search
        value={state.searchBarInput}
        onChange={onChange}
        onClick={setWeather}
      />
      {state.searchBarInput && !state.isFetching && !state.details ? (
        "No data available."
      ) : (
        <WeatherInfo data={state.details} />
      )}
      <Footer />
    </div>
  );
};
export default Main;
