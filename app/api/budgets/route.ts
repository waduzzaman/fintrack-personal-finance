import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const budgets = await prisma.budget.findMany({
      where: { userId: session.user.id },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(budgets)
  } catch (error) {
    console.error("Get budgets error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { categoryId, amount, period } = await req.json()

    if (!amount || !period) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const budget = await prisma.budget.create({
      data: {
        categoryId,
        amount: parseFloat(amount),
        period,
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(budget, { status: 201 })
  } catch (error) {
    console.error("Create budget error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}