"use client"

import { Plus, Target, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const goals = [
  { id: "1", name: "Emergency Fund", current: 5000, target: 10000, deadline: "2026-12-31", color: "bg-blue-500" },
  { id: "2", name: "New Laptop", current: 1200, target: 2000, deadline: "2026-06-15", color: "bg-purple-500" },
  { id: "3", name: "Vacation to Japan", current: 3500, target: 5000, deadline: "2026-09-01", color: "bg-green-500" },
  { id: "4", name: "Car Down Payment", current: 8000, target: 15000, deadline: "2027-01-01", color: "bg-orange-500" },
]

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Goal</DialogTitle>
              <DialogDescription>
                Set a new financial goal to track your savings progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="e.g. New Car" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">Target Amount</Label>
                <Input id="target" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current" className="text-right">Current Saved</Label>
                <Input id="current" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">Deadline</Label>
                <Input id="deadline" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100)
          
          return (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${goal.color} bg-opacity-10`}>
                      <Target className={`h-5 w-5 ${goal.color.replace('bg-', 'text-')}`} />
                    </div>
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-2xl">
                    ${goal.current.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">
                    of ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-3" 
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{percentage.toFixed(1)}% Complete</span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" size="sm">Add Funds</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
