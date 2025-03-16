"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Volume2, Clock } from "lucide-react"

export function SettingsForm() {
  const [focusTime, setFocusTime] = useState(25)
  const [shortBreakTime, setShortBreakTime] = useState(5)
  const [longBreakTime, setLongBreakTime] = useState(15)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState(80)
  const [theme, setTheme] = useState("system")

  const handleSave = () => {
    // In a real app, this would save to a database or local storage
    alert("Settings saved!")
  }

  return (
    <Tabs defaultValue="timer" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="timer">Timer</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>

      <TabsContent value="timer">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timer Settings
            </CardTitle>
            <CardDescription>Customize your Pomodoro timer durations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="focus-time">Focus Time (minutes): {focusTime}</Label>
                </div>
                <Slider
                  id="focus-time"
                  min={5}
                  max={60}
                  step={1}
                  value={[focusTime]}
                  onValueChange={(value) => setFocusTime(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="short-break-time">Short Break (minutes): {shortBreakTime}</Label>
                </div>
                <Slider
                  id="short-break-time"
                  min={1}
                  max={15}
                  step={1}
                  value={[shortBreakTime]}
                  onValueChange={(value) => setShortBreakTime(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="long-break-time">Long Break (minutes): {longBreakTime}</Label>
                </div>
                <Slider
                  id="long-break-time"
                  min={5}
                  max={30}
                  step={1}
                  value={[longBreakTime]}
                  onValueChange={(value) => setLongBreakTime(value[0])}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Customize your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-enabled">Sound Alerts</Label>
                <Switch id="sound-enabled" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              {soundEnabled && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-volume" className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Volume: {soundVolume}%
                    </Label>
                  </div>
                  <Slider
                    id="sound-volume"
                    min={0}
                    max={100}
                    step={1}
                    value={[soundVolume]}
                    onValueChange={(value) => setSoundVolume(value[0])}
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize the look and feel of your Study Buddy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

