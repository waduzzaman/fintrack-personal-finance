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

    const accounts = await prisma.bankAccount.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(accounts)
  } catch (error) {
    console.error("Get accounts error:", error)
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

    const { name, type, balance } = await req.json()

    if (!name || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const account = await prisma.bankAccount.create({
      data: {
        name,
        type,
        balance: balance ? parseFloat(balance) : 0,
        userId: session.user.id,
      },
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error("Create account error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}