import { backendClient } from "@/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST /api/cart/products — returns full Product documents for the given IDs
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const ids: string[] = body.ids ?? [];

  if (ids.length === 0) return NextResponse.json([]);

  const products = await backendClient.fetch(
    `*[_type == "product" && _id in $ids]`,
    { ids },
  );

  return NextResponse.json(products);
}
