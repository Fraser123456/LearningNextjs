import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  const { name, price } = body;
  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      price: price,
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  const deletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(deletedProduct);
}
