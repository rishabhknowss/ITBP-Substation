import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, AlertTriangle, ChevronDown, Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const regions = [
  "All",
  "Ladakh",
  "Himachal Pradesh",
  "Sikkim",
  "Arunachal Pradesh",
  "Uttarakhand"
]

const locations = [
  { name: "Pangong Tso Lake", region: "Ladakh" },
  { name: "Kaurik", region: "Himachal Pradesh" },
  { name: "Jelep La", region: "Sikkim" },
  { name: "Tawang", region: "Arunachal Pradesh" },
  { name: "Daulat Beg Oldi", region: "Ladakh" },
  { name: "Mana Pass", region: "Uttarakhand" },
  { name: "Shipki La", region: "Himachal Pradesh" },
  { name: "Walong", region: "Arunachal Pradesh" }
]

// Define the type for feeds
interface Feed {
  name: string;
  region: string;
  status: string;
  lastUpdated: Date;
  lastMotionDetected: Date | null;
  lastAlertSent: Date | null;
  runningTime: number;
}

export default function SatelliteDroneView() {
  const [view, setView] = useState('satellite')
  const [selectedRegion, setSelectedRegion] = useState('All')
  
  // Define the feeds state with explicit typing
  const [feeds, setFeeds] = useState<Feed[]>(
    locations.map(loc => ({
      ...loc, 
      status: 'Normal', 
      lastUpdated: new Date(),
      lastMotionDetected: null,
      lastAlertSent: null,
      runningTime: 0
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setFeeds(prevFeeds => 
        prevFeeds.map(feed => {
          const now = new Date()
          const newStatus = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Motion detected' : 'Human detected') : 'Normal'
          const isNewAlert = newStatus !== 'Normal' && feed.status === 'Normal'
          return {
            ...feed,
            status: newStatus,
            lastUpdated: now,
            lastMotionDetected: newStatus !== 'Normal' ? now : feed.lastMotionDetected,
            lastAlertSent: isNewAlert ? now : feed.lastAlertSent,
            runningTime: feed.runningTime + 1
          }
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const filteredFeeds = selectedRegion === 'All' 
    ? feeds 
    : feeds.filter(feed => feed.region === selectedRegion)

  const sendManualAlert = (feedName: string) => {
    setFeeds(prevFeeds =>
      prevFeeds.map(feed =>
        feed.name === feedName
          ? { ...feed, lastAlertSent: new Date(), status: 'Manual alert' }
          : feed
      )
    )
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="satellite">Satellite View</TabsTrigger>
            <TabsTrigger value="drone">Drone View</TabsTrigger>
          </TabsList>
        </Tabs>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredFeeds.map(feed => (
          <Card key={feed.name} className={`overflow-hidden transition-all duration-300 ${feed.status !== 'Normal' ? 'border-red-500 border-2 shadow-lg' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {feed.name}
              </CardTitle>
              <Alert variant={feed.status === 'Normal' ? 'default' : 'destructive'} className="h-4 w-4">
                <AlertTriangle className="h-4 w-4" />
              </Alert>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <Camera className="h-8 w-8 text-gray-500" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {formatTime(feed.runningTime)}
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">Region: {feed.region}</p>
                <p className="text-xs text-gray-500">Last updated: {feed.lastUpdated.toLocaleTimeString()}</p>
                {feed.lastMotionDetected && (
                  <p className="text-xs text-amber-500">
                    Last motion: {feed.lastMotionDetected.toLocaleTimeString()}
                  </p>
                )}
                {feed.lastAlertSent && (
                  <p className="text-xs text-red-500">
                    Last alert: {feed.lastAlertSent.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
              <AlertDescription className={`text-xs font-medium ${feed.status !== 'Normal' ? 'text-red-500' : 'text-green-500'}`}>
                {feed.status}
              </AlertDescription>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => sendManualAlert(feed.name)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Manual Alert
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
