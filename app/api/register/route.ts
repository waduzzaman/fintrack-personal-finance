import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Create default categories for the user
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
        userId: user.id
      }))
    })

    // Create a default cash account
    await prisma.bankAccount.create({
      data: {
        userId: user.id,
        name: "Cash",
        type: "CASH",
        balance: 0,
      }
    })

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
