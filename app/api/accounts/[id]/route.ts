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

    const account = await prisma.bankAccount.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(account)
  } catch (error) {
    console.error("Get account error:", error)
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

    const { name, type, balance } = await req.json()

    const account = await prisma.bankAccount.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      )
    }

    const updatedAccount = await prisma.bankAccount.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(balance !== undefined && { balance: parseFloat(balance) }),
      },
    })

    return NextResponse.json(updatedAccount)
  } catch (error) {
    console.error("Update account error:", error)
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

    const account = await prisma.bankAccount.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      )
    }

    // Check if account has transactions
    const transactionCount = await prisma.transaction.count({
      where: { accountId: params.id },
    })

    if (transactionCount > 0) {
      return NextResponse.json(
        { message: "Cannot delete account with existing transactions" },
        { status: 400 }
      )
    }

    await prisma.bankAccount.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Account deleted" })
  } catch (error) {
    console.error("Delete account error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
}