"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  Twitter,
  Facebook,
  Instagram,
  Search,
  PieChart,
  MapPin,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Pie,
  Legend,
} from "recharts";

type Threat = {
  id: number;
  platform: "X" | "Facebook" | "Instagram";
  content: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  location: string;
  link: string;
};
// Example link, you can replace it with actual post links.
const mockThreats: Threat[] = [
  {
    id: 1,
    platform: "X",
    content: "Suspicious activity near border post A",
    severity: "high",
    timestamp: "2023-06-15T10:30:00Z",
    location: "Border Post A",
    link: "https://x.com/post1",
  },
  {
    id: 2,
    platform: "Facebook",
    content: "Unusual gathering reported in sector B",
    severity: "medium",
    timestamp: "2023-06-15T11:45:00Z",
    location: "Sector B",
    link: "https://facebook.com/post2",
  },
  {
    id: 3,
    platform: "Instagram",
    content: "Unidentified drone sighting in region C",
    severity: "high",
    timestamp: "2023-06-15T12:15:00Z",
    location: "Region C",
    link: "https://instagram.com/post3",
  },
  {
    id: 4,
    platform: "X",
    content: "Potential smuggling activity detected at checkpoint D",
    severity: "medium",
    timestamp: "2023-06-15T13:00:00Z",
    location: "Checkpoint D",
    link: "https://x.com/post4",
  },
  {
    id: 5,
    platform: "Facebook",
    content: "Rumors of illegal border crossing at point E",
    severity: "low",
    timestamp: "2023-06-15T14:30:00Z",
    location: "Point E",
    link: "https://facebook.com/post5",
  },
];
const platformIcons = {
  X: Twitter,
  Facebook: Facebook,
  Instagram: Instagram,
};

const chartData = [
  { name: "Mon", X: 4, Facebook: 3, Instagram: 2 },
  { name: "Tue", X: 3, Facebook: 4, Instagram: 3 },
  { name: "Wed", X: 5, Facebook: 2, Instagram: 4 },
  { name: "Thu", X: 2, Facebook: 3, Instagram: 5 },
  { name: "Fri", X: 3, Facebook: 5, Instagram: 3 },
  { name: "Sat", X: 4, Facebook: 4, Instagram: 2 },
  { name: "Sun", X: 3, Facebook: 3, Instagram: 3 },
];

const severityData = [
  { name: "Low", value: 3 },
  { name: "Medium", value: 3 },
  { name: "High", value: 2 },
];

const locationData = [
  { name: "Border Post A", value: 2 },
  { name: "Sector B", value: 1 },
  { name: "Region C", value: 3 },
  { name: "Checkpoint D", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function EnhancedSocialMediaThreatDetectionDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("7d");

  const filteredThreats = mockThreats.filter(
    (threat) =>
      (selectedPlatform === "all" || threat.platform === selectedPlatform) &&
      (selectedSeverity === "all" || threat.severity === selectedSeverity) &&
      (searchQuery === "" ||
        threat.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Social Media Threat Detection Dashboard
      </h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Threats
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockThreats.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  High Severity
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockThreats.filter((t) => t.severity === "high").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Most Active Platform
                </CardTitle>
                <Twitter className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">X</div>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Recent Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredThreats.map((threat) => (
                  <Card key={threat.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {React.createElement(platformIcons[threat.platform], {
                            size: 20,
                          })}
                          <span className="font-semibold">
                            {threat.platform}
                          </span>
                        </div>
                        <Badge
                          variant={
                            threat.severity === "high"
                              ? "destructive"
                              : threat.severity === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {threat.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{threat.content}</p>
                      <a
                        href={threat.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Post
                      </a>
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                        <span>
                          {new Date(threat.timestamp).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {threat.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="threats">
          <Card>
            <CardHeader>
              <CardTitle>All Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Select
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedSeverity}
                  onValueChange={setSelectedSeverity}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search threats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-auto"
                  />
                  <Button variant="outline" size="icon" className="ml-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[400px]">
                {filteredThreats.map((threat) => (
                  <Card key={threat.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {React.createElement(platformIcons[threat.platform], {
                            size: 20,
                          })}
                          <span className="font-semibold">
                            {threat.platform}
                          </span>
                        </div>
                        <Badge
                          variant={
                            threat.severity === "high"
                              ? "destructive"
                              : threat.severity === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {threat.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{threat.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {new Date(threat.timestamp).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {threat.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Threat Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="X" stroke="#1DA1F2" />
                      <Line
                        type="monotone"
                        dataKey="Facebook"
                        stroke="#4267B2"
                      />
                      <Line
                        type="monotone"
                        dataKey="Instagram"
                        stroke="#E1306C"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={severityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityData.map(( {index} : any) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Threat Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {locationData.map(( {index} : any) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Key Insights:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          X remains the most active platform for potential
                          threats
                        </li>
                        <li>
                          High severity threats have increased by 15% in the
                          last 7 days
                        </li>
                        <li>
                          Region C shows the highest concentration of threat
                          activities
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Emerging Trends:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Increase in coordinated disinformation campaigns
                        </li>
                        <li>
                          Rise in drone-related incidents near border areas
                        </li>
                        <li>
                          Growing number of social media inquiries about border
                          crossings
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Recommended Actions:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Enhance monitoring of X platform, especially in Region
                          C
                        </li>
                        <li>
                          Increase patrols and surveillance in high-threat areas
                        </li>
                        <li>
                          Develop counter-strategies for disinformation
                          campaigns
                        </li>
                        <li>
                          Implement advanced drone detection systems in
                          vulnerable sectors
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
