import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

//Types
import { ChangePasswordBody } from "./types/change-password.types";

export async function POST(request: NextRequest) {
  const body: ChangePasswordBody = await request.json();

  console.log(body);
}
