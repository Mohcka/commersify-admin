import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { exclude } from "@/lib/utils/prisma-utils";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email taken" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = exclude(
      await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      }),
      ["hashedPassword"]
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 400 }
    );
  }
}
