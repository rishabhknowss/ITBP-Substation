import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react";
const regions = ["North", "South", "East", "West", "Central"]

const equipmentData = regions.map(region => ({
  region,
  items: [
    { name: "Drone", received: "2023-01-15", expiry: "2025-01-15", health: 75 },
    { name: "Camera System", received: "2022-11-30", expiry: "2026-11-30", health: 90 },
    { name: "Perimeter Sensors", received: "2023-03-01", expiry: "2028-03-01", health: 60 },
    { name: "Access Control", received: "2022-09-15", expiry: "2027-09-15", health: 85 },
    { name: "Emergency Generator", received: "2023-05-01", expiry: "2033-05-01", health: 95 },
  ]
}))

export default function PredictiveMaintenance() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue={regions[0]}>
        <TabsList>
          {regions.map(region => (
            <TabsTrigger key={region} value={region}>{region} Region</TabsTrigger>
          ))}
        </TabsList>
        {regions.map(region => (
          <TabsContent key={region} value={region}>
            <Card>
              <CardHeader>
                <CardTitle>{region} Region Equipment Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.find(data => data.region === region).items.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span>{item.name}</span>
                        <span>{item.health}%</span>
                      </div>
                      <Progress value={item.health} />
                      <div className="text-sm text-gray-500 mt-1">
                        Received: {item.received} | Expires: {item.expiry}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Resource Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Staff Utilization</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Energy Consumption</span>
                <span>Optimal</span>
              </div>
              <Progress value={70} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Supply Inventory</span>
                <span>Adequate</span>
              </div>
              <Progress value={60} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Main Building</AlertTitle>
              <AlertDescription>Good Condition</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Perimeter Fence</AlertTitle>
              <AlertDescription>Maintenance Required (Section E)</AlertDescription>
            </Alert>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Access Control Systems</AlertTitle>
              <AlertDescription>Optimal</AlertDescription>
            </Alert>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Emergency Power Generator</AlertTitle>
              <AlertDescription>Scheduled for Testing</AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}