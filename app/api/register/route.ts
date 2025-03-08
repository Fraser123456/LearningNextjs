import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { RegisterUserBody } from "./types";

const schema = z.object({
  username: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(14),
});

export async function POST(request: NextRequest) {
  const body: RegisterUserBody = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: body.email }, { username: body.username }] },
  });

  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.fullName,
      username: body.username,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
