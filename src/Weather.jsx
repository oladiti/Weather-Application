import { React, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import Spinner from "./Spinner";
import Footer from "./Footer";

const Weather = () => {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timestamp, setTimestamp] = useState(null);
    const [weather, setWeather] = useState(null);


    const apiKey = "process.env.REACT_APP_API_KEY";

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
            setError(null);
            setTimestamp(moment().format('MMMM Do YYYY, h:m:ss'));

            setLoading(false);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setError('City not found');
                } else {
                    setError('Failed to fetch weather data. Please try again later.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
            setWeather(null);
        }

        setLoading(false);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() === '') {
            setError('Please enter a city name.');
            setWeather(null);
            return;
        }

        fetchWeather();

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="w-full max-w-md p-8 bg-green-500 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">Weather Application</h1>
                <form onSubmit={handleSubmit} className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        className="p-2 border border-gray-300 rounded-l-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="p-2  max-sm:py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Search
                    </button>
                </form>
                {loading && <Spinner />}

                {error && <p className="text-red-500 text-center">{error}</p>}
                {weather && !loading && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="mx-auto" />
                        <p className="text-gray-900 -mt-3">{weather.weather[0].description}</p>
                        <p className="text-gray-900">Temperature: {weather.main.temp}°C</p>
                        <p className="text-gray-900">Humidity: {weather.main.humidity}%</p>
                        <p className="text-gray-900">Wind Speed: {weather.wind.speed} m/s</p>
                        <p className="text-gray-900 mt-4">last updated: {timestamp}</p>
                        <button className="p-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setWeather(null)}>
                            Get Weather
                        </button>

                    </div>
                )}
                <div className=" mt-5">
                    <Footer />
                </div>
            </div>

        </div>


    );
};

export default Weather;