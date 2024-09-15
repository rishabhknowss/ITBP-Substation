import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SatelliteDish, CloudSun, WrenchIcon } from 'lucide-react'
import SatelliteDroneView from './satellite-drone-view'
import WeatherPatrolRoutes from './weather-patrol-routes'
import PredictiveMaintenance from './predictive-maintenance'
import * as React from "react";
export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('satellite-drone')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Security Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="satellite-drone" className="flex items-center gap-2">
            <SatelliteDish className="h-4 w-4" />
            Satellite & Drone
          </TabsTrigger>
          <TabsTrigger value="weather-patrol" className="flex items-center gap-2">
            <CloudSun className="h-4 w-4" />
            Weather & Patrol
          </TabsTrigger>
          <TabsTrigger value="predictive-maintenance" className="flex items-center gap-2">
            <WrenchIcon className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="satellite-drone">
          <SatelliteDroneView />
        </TabsContent>
        <TabsContent value="weather-patrol">
          <WeatherPatrolRoutes />
        </TabsContent>
        <TabsContent value="predictive-maintenance">
          <PredictiveMaintenance />
        </TabsContent>
      </Tabs>
    </div>
  )
}