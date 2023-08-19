import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const userId = currentUser.id;
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
