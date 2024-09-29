import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const regions = [
  "All Regions",
  "Ladakh",
  "Himachal Pradesh",
  "Sikkim",
  "Arunachal Pradesh",
  "Uttarakhand"
] as const;

type Region = typeof regions[number];

interface Route {
  name: string;
  region: Exclude<Region, 'All Regions'>;
  condition: string;
  recommendation: string;
  lat: number;
  lng: number;
}

const routes: Route[] = [
  { name: "Route A", region: "Ladakh", condition: "Clear", recommendation: "Recommended", lat: 34.2268, lng: 77.5619 },
  { name: "Route B", region: "Ladakh", condition: "Snowy", recommendation: "Proceed with Caution", lat: 34.1526, lng: 77.5771 },
  { name: "Route C", region: "Himachal Pradesh", condition: "Foggy", recommendation: "Not Recommended", lat: 31.1048, lng: 77.1734 },
  { name: "Route D", region: "Himachal Pradesh", condition: "Clear", recommendation: "Recommended", lat: 32.2190, lng: 77.6167 },
  { name: "Route E", region: "Sikkim", condition: "Rainy", recommendation: "Not Recommended", lat: 27.3389, lng: 88.6065 },
  { name: "Route F", region: "Sikkim", condition: "Cloudy", recommendation: "Proceed with Caution", lat: 27.5917, lng: 88.4583 },
  { name: "Route G", region: "Arunachal Pradesh", condition: "Clear", recommendation: "Recommended", lat: 28.2180, lng: 94.7278 },
  { name: "Route H", region: "Arunachal Pradesh", condition: "Misty", recommendation: "Proceed with Caution", lat: 27.0844, lng: 93.6053 },
  { name: "Route I", region: "Uttarakhand", condition: "Windy", recommendation: "Proceed with Caution", lat: 30.0668, lng: 79.0193 },
  { name: "Route J", region: "Uttarakhand", condition: "Clear", recommendation: "Recommended", lat: 30.7333, lng: 79.0667 },
];

interface WeatherCondition {
  temperature: string;
  humidity: string;
  windSpeed: string;
  visibility: string;
}

const weatherConditions: Record<Exclude<Region, 'All Regions'>, WeatherCondition> = {
  "Ladakh": { temperature: "5°C", humidity: "30%", windSpeed: "20 km/h", visibility: "Excellent" },
  "Himachal Pradesh": { temperature: "15°C", humidity: "60%", windSpeed: "10 km/h", visibility: "Good" },
  "Sikkim": { temperature: "18°C", humidity: "75%", windSpeed: "5 km/h", visibility: "Moderate" },
  "Arunachal Pradesh": { temperature: "22°C", humidity: "80%", windSpeed: "8 km/h", visibility: "Fair" },
  "Uttarakhand": { temperature: "12°C", humidity: "55%", windSpeed: "15 km/h", visibility: "Good" }
};

const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCM6w8q5ALYC3sEhHvzWgljvpwi78ZXBiY`;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

interface MapProps {
  selectedRegion: Region;
  filteredRoutes: Route[];
}

const Map: React.FC<MapProps> = ({ filteredRoutes }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript().then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 5,
      });
      setMap(newMap);
    }
  }, [isLoaded, map]);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      const infoWindow = new window.google.maps.InfoWindow();

      // Clear existing markers
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });

      filteredRoutes.forEach((route) => {
        const marker = new window.google.maps.Marker({
          position: { lat: route.lat, lng: route.lng },
          map,
          title: route.name,
        });

        bounds.extend(marker.getPosition()!);

        marker.addListener("click", () => {
          const content = `
            <div>
              <h3>${route.name}</h3>
              <p>Region: ${route.region}</p>
              <p>Condition: ${route.condition}</p>
              <p>Recommendation: ${route.recommendation}</p>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      });

      map.fitBounds(bounds);
    }
  }, [map, filteredRoutes]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default function WeatherPatrolRoutes() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('All Regions')

  const filteredRoutes = selectedRegion === 'All Regions' 
    ? routes 
    : routes.filter(route => route.region === selectedRegion)

  const currentWeather = selectedRegion !== 'All Regions' ? weatherConditions[selectedRegion] : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Weather Conditions</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedRegion} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {regions.map(region => (
                  <DropdownMenuItem key={region} onSelect={() => setSelectedRegion(region)}>
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            {currentWeather ? (
              <div className="space-y-2">
                <p>Temperature: {currentWeather.temperature}</p>
                <p>Humidity: {currentWeather.humidity}</p>
                <p>Wind Speed: {currentWeather.windSpeed}</p>
                <p>Visibility: {currentWeather.visibility}</p>
              </div>
            ) : (
              <p>Select a specific region to view weather conditions.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patrol Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRoutes.map(route => (
                <div key={route.name} className="border-b pb-2 last:border-b-0">
                  <h3 className="font-semibold">{route.name} - {route.region}</h3>
                  <p className="text-sm">Condition: {route.condition}</p>
                  <p className="text-sm">Recommendation: {route.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="md:row-span-2">
        <CardHeader>
          <CardTitle>Patrol Map</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Map selectedRegion={selectedRegion} filteredRoutes={filteredRoutes} />
        </CardContent>
      </Card>
    </div>
  )
}