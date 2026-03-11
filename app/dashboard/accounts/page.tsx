"use client"

import { Plus, Wallet, CreditCard, Landmark, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const accounts = [
  { id: "1", name: "Main Checking", type: "Bank", balance: 4500.00, icon: Landmark, color: "text-blue-500" },
  { id: "2", name: "Savings", type: "Bank", balance: 12500.00, icon: Landmark, color: "text-green-500" },
  { id: "3", name: "Credit Card", type: "Credit", balance: -1250.50, icon: CreditCard, color: "text-red-500" },
  { id: "4", name: "Cash Wallet", type: "Cash", balance: 350.00, icon: Banknote, color: "text-emerald-500" },
]

export default function AccountsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Account</DialogTitle>
              <DialogDescription>
                Create a new account to track your balances.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="e.g. Chase Checking" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">Initial Balance</Label>
                <Input id="balance" type="number" placeholder="0.00" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              <account.icon className={`h-4 w-4 ${account.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {account.type} Account
              </p>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full" size="sm">View Transactions</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
