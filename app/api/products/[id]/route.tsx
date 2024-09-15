import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: {
    id: number;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  if (id > 10)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Milk", price: 2.5 });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  if (id > 10)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  return NextResponse.json({ id: 1, ...body });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  if (id > 10)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  return NextResponse.json({});
}
