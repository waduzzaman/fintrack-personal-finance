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

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        category: true,
        account: true,
      },
    })

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Get transaction error:", error)
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

    const { amount, type, date, note, categoryId, accountId } = await req.json()

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      )
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: params.id },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(type && { type }),
        ...(date && { date: new Date(date) }),
        ...(note !== undefined && { note }),
        ...(categoryId !== undefined && { categoryId }),
        ...(accountId && { accountId }),
      },
      include: {
        category: true,
        account: true,
      },
    })

    return NextResponse.json(updatedTransaction)
  } catch (error) {
    console.error("Update transaction error:", error)
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

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      )
    }

    await prisma.transaction.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Transaction deleted" })
  } catch (error) {
    console.error("Delete transaction error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}