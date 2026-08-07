import { backendClient } from "@/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface CartItemPayload {
  productId: string;
  quantity: number;
}

// GET /api/cart — returns the saved cart items for the signed-in user
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const doc = await backendClient.fetch<{ items: CartItemPayload[] } | null>(
    `*[_type == "cart" && clerkUserId == $userId][0]{ items }`,
    { userId },
  );

  return NextResponse.json(doc?.items ?? []);
}

// POST /api/cart — upserts the full cart snapshot for the signed-in user
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const items: CartItemPayload[] = body.items ?? [];

  // Find existing cart document for this user
  const existing = await backendClient.fetch<{ _id: string } | null>(
    `*[_type == "cart" && clerkUserId == $userId][0]{ _id }`,
    { userId },
  );

  if (existing) {
    await backendClient
      .patch(existing._id)
      .set({ items, updatedAt: new Date().toISOString() })
      .commit();
  } else {
    await backendClient.create({
      _type: "cart",
      clerkUserId: userId,
      items,
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ success: true });
}
