import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { confirm } = await req.json()

    if (confirm !== "RESET_ALL_DATA") {
      return NextResponse.json(
        { message: "Confirmation required" },
        { status: 400 }
      )
    }

    // Delete all user data in correct order (respecting foreign keys)
    await prisma.transaction.deleteMany({
      where: { userId: session.user.id },
    })

    await prisma.budget.deleteMany({
      where: { userId: session.user.id },
    })

    await prisma.goal.deleteMany({
      where: { userId: session.user.id },
    })

    await prisma.category.deleteMany({
      where: { userId: session.user.id },
    })

    await prisma.bankAccount.deleteMany({
      where: { userId: session.user.id },
    })

    // Reset default categories and cash account
    const defaultCategories = [
      { name: "Food", icon: "Utensils", color: "#ef4444" },
      { name: "Rent", icon: "Home", color: "#3b82f6" },
      { name: "Shopping", icon: "ShoppingBag", color: "#ec4899" },
      { name: "Utilities", icon: "Zap", color: "#eab308" },
      { name: "Transportation", icon: "Car", color: "#8b5cf6" },
      { name: "Salary", icon: "DollarSign", color: "#22c55e" },
    ]

    await prisma.category.createMany({
      data: defaultCategories.map(cat => ({
        ...cat,
        userId: session.user.id
      }))
    })

    await prisma.bankAccount.create({
      data: {
        userId: session.user.id,
        name: "Cash",
        type: "CASH",
        balance: 0,
      }
    })

    return NextResponse.json({ message: "All data reset successfully" })
  } catch (error) {
    console.error("Reset data error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}