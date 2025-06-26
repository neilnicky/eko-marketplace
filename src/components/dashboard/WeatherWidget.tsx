"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  Thermometer,
  CloudSun,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";


interface Location {
  city: string;
  region: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

type WeatherIconName =
  | "Sun"
  | "Cloud"
  | "CloudRain"
  | "Snowflake"
  | "Wind"
  | "CloudSun";

interface WeatherCondition {
  temp: number;
  condition: string;
  farmingTip: string;
  icon: WeatherIconName;
}

interface ForecastDay {
  day: string;
  temp: number;
  condition: string;
  icon: WeatherIconName;
}

interface WeatherData {
  location: Location;
  today: WeatherCondition;
  forecast: ForecastDay[];
}

// Constants
const DEFAULT_COORDINATES = { lat: -23.5505, lon: -46.6333 } as const;
const WEATHER_CONDITIONS = [
  "Sunny",
  "Partly Cloudy",
  "Cloudy",
  "Light Rain",
] as const;
const FARMING_TIPS = [
  "Perfect day for planting and harvesting.",
  "Good conditions for field work.",
  "Ideal weather for outdoor activities.",
  "Consider indoor farm tasks today.",
] as const;
const ICON_NAMES: WeatherIconName[] = ["Sun", "CloudSun", "Cloud", "CloudRain"];
const FORECAST_DAYS = ["Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// Utils
const generateRandomTemp = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayItem = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const reverseGeocode = async (
  lat: number,
  lon: number
): Promise<Partial<Location>> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "Weather Widget App",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.address) {
      return {
        city:
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.municipality ||
          "Current Location",
        region:
          data.address.state || data.address.country_code?.toUpperCase() || "",
      };
    }

    return { city: "Current Location", region: "" };
  } catch (error) {
    console.warn("Reverse geocoding failed:", error);
    return { city: "Current Location", region: "" };
  }
};

const getWeatherData = async (
  lat?: number,
  lon?: number
): Promise<WeatherData> => {
  const coordinates = {
    lat: lat ?? DEFAULT_COORDINATES.lat,
    lon: lon ?? DEFAULT_COORDINATES.lon,
  };

  let location: Location = {
    city: "São Paulo",
    region: "SP",
    coordinates,
  };

  if (lat && lon) {
    const geoData = await reverseGeocode(lat, lon);
    location = {
      ...location,
      ...geoData,
      coordinates,
    };
  }

  const today: WeatherCondition = {
    temp: generateRandomTemp(18, 33),
    condition: getRandomArrayItem(WEATHER_CONDITIONS),
    farmingTip: getRandomArrayItem(FARMING_TIPS),
    icon: getRandomArrayItem(ICON_NAMES),
  };

  const forecast: ForecastDay[] = FORECAST_DAYS.map((day) => ({
    day,
    temp: generateRandomTemp(16, 28),
    condition: getRandomArrayItem(["Sunny", "Cloudy", "Rain"]),
    icon: getRandomArrayItem(["Sun", "Cloud", "CloudRain"]),
  }));

  return { location, today, forecast };
};

// Weather Icon
const WeatherIcon = React.memo<{
  iconName: WeatherIconName;
  className?: string;
  size?: number;
}>(({ iconName, className, size = 24, ...props }) => {
  const icons: Record<WeatherIconName, JSX.Element> = {
    Sun: <Sun size={size} {...props} />,
    Cloud: <Cloud size={size} {...props} />,
    CloudRain: <CloudRain size={size} {...props} />,
    Snowflake: <Snowflake size={size} {...props} />,
    Wind: <Wind size={size} {...props} />,
    CloudSun: <CloudSun size={size} {...props} />,
  };

  return (
    <div className={className}>
      {icons[iconName] ?? <Thermometer size={size} {...props} />}
    </div>
  );
});

WeatherIcon.displayName = "WeatherIcon";

// Weather Widget
const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      });
    });
  }, []);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let weatherData: WeatherData;

      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        weatherData = await getWeatherData(latitude, longitude);
      } catch (locationError) {
        console.warn(
          "Location access failed, using default location:",
          locationError
        );
        weatherData = await getWeatherData();
      }

      setWeather(weatherData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load weather data";
      console.error("Weather loading error:", err);
      setError(errorMessage);

      try {
        const fallbackData = await getWeatherData();
        setWeather(fallbackData);
      } catch (fallbackError) {
        console.error("Fallback weather data failed:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  }, [getCurrentPosition]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const toggleForecast = useCallback(() => {
    setShowForecast((prev) => !prev);
  }, []);

  const handleRefresh = useCallback(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-red-200">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-2">
            Unable to load weather data
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="text-xs"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <article className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WeatherIcon
            iconName={weather.today.icon}
            className="text-yellow-500"
            size={32}
          />
          <div>
            <p className="font-semibold text-lg text-gray-800">
              {weather.today.temp}°C
            </p>
            <p className="text-sm text-gray-600">{weather.today.condition}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>
                {weather.location.city}
                {weather.location.region && `, ${weather.location.region}`}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right ">
          {weather.today.farmingTip && (
            <div
              className="text-md  text-green-600 mb-2 max-w-max"
              title={weather.today.farmingTip}
            >
              <span className="line-clamp-2">{weather.today.farmingTip}</span>
            </div>
          )}
          <div className="space-y-1">
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-xs"
              onClick={toggleForecast}
              aria-expanded={showForecast}
              aria-controls="weather-forecast"
            >
              {showForecast ? "Hide forecast" : "7-day forecast"}
            </Button>
            {/* <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-xs block "
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh //refresh button
            </Button> */}
          </div>
        </div>
      </div>

      {showForecast && (
        <section
          id="weather-forecast"
          className="mt-4 pt-4 border-t border-gray-200"
          aria-label="7-day weather forecast"
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {weather.forecast.map((day, index) => (
              <div
                key={`${day.day}-${index}`}
                className="p-2 rounded-md bg-gray-50 text-center hover:bg-gray-100 transition-colors"
              >
                <p className="text-xs font-medium text-gray-700 mb-1">
                  {day.day}
                </p>
                <WeatherIcon
                  iconName={day.icon}
                  className="mx-auto my-2 text-blue-500"
                  size={20}
                />
                <p className="text-xs text-gray-600">{day.temp}°C</p>
                <p className="text-xs text-gray-500 mt-1">{day.condition}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default WeatherWidget;
