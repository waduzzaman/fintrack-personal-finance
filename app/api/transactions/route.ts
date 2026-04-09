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

    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      include: {
        category: true,
        account: true,
      },
      orderBy: { date: "desc" },
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Get transactions error:", error)
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

    const { amount, type, date, note, categoryId, accountId } = await req.json()

    if (!amount || !type || !date || !accountId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        date: new Date(date),
        note,
        categoryId,
        accountId,
        userId: session.user.id,
      },
      include: {
        category: true,
        account: true,
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Create transaction error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}