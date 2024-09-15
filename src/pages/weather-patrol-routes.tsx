import { useState } from 'react'
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
]


const routes = [
  { name: "Route A", region: "Ladakh", condition: "Clear", recommendation: "Recommended" },
  { name: "Route B", region: "Ladakh", condition: "Snowy", recommendation: "Proceed with Caution" },
  { name: "Route C", region: "Himachal Pradesh", condition: "Foggy", recommendation: "Not Recommended" },
  { name: "Route D", region: "Himachal Pradesh", condition: "Clear", recommendation: "Recommended" },
  { name: "Route E", region: "Sikkim", condition: "Rainy", recommendation: "Not Recommended" },
  { name: "Route F", region: "Sikkim", condition: "Cloudy", recommendation: "Proceed with Caution" },
  { name: "Route G", region: "Arunachal Pradesh", condition: "Clear", recommendation: "Recommended" },
  { name: "Route H", region: "Arunachal Pradesh", condition: "Misty", recommendation: "Proceed with Caution" },
  { name: "Route I", region: "Uttarakhand", condition: "Windy", recommendation: "Proceed with Caution" },
  { name: "Route J", region: "Uttarakhand", condition: "Clear", recommendation: "Recommended" },
]

export default function WeatherPatrolRoutes() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions')

  const filteredRoutes = selectedRegion === 'All Regions' 
    ? routes 
    : routes.filter(route => route.region === selectedRegion)

    const weatherConditions: { [key: string]: { temperature: string; humidity: string; windSpeed: string; visibility: string } } = {
      "Ladakh": { temperature: "5°C", humidity: "30%", windSpeed: "20 km/h", visibility: "Excellent" },
      "Himachal Pradesh": { temperature: "15°C", humidity: "60%", windSpeed: "10 km/h", visibility: "Good" },
      "Sikkim": { temperature: "18°C", humidity: "75%", windSpeed: "5 km/h", visibility: "Moderate" },
      "Arunachal Pradesh": { temperature: "22°C", humidity: "80%", windSpeed: "8 km/h", visibility: "Fair" },
      "Uttarakhand": { temperature: "12°C", humidity: "55%", windSpeed: "15 km/h", visibility: "Good" }
    };
    

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
        <CardContent>
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            Interactive Patrol Map
          </div>
        </CardContent>
      </Card>
    </div>
  )
}