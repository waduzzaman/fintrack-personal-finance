import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const budget = await prisma.budget.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    })

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(budget)
  } catch (error) {
    console.error("Get budget error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { categoryId, amount, period } = await req.json()

    const budget = await prisma.budget.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      )
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: params.id },
      data: {
        ...(categoryId !== undefined && { categoryId }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(period && { period }),
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(updatedBudget)
  } catch (error) {
    console.error("Update budget error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const budget = await prisma.budget.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      )
    }

    await prisma.budget.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Budget deleted" })
  } catch (error) {
    console.error("Delete budget error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}