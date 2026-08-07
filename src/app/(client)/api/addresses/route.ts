import { backendClient } from "@/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/addresses — returns all addresses for the signed-in user
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const addresses = await backendClient.fetch(
    `*[_type == "address" && clerkUserId == $userId] | order(createdAt desc)`,
    { userId },
  );

  return NextResponse.json(addresses);
}

// POST /api/addresses — creates a new address for the signed-in user
export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, address, city, state, zip } = body;

  if (!name || !address || !city || !state || !zip) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // If this address is marked as default, unset default on all existing ones first
  if (body.default) {
    const existing = await backendClient.fetch<{ _id: string }[]>(
      `*[_type == "address" && clerkUserId == $userId && default == true]{ _id }`,
      { userId },
    );
    await Promise.all(
      existing.map(({ _id }) =>
        backendClient.patch(_id).set({ default: false }).commit(),
      ),
    );
  }

  const doc = await backendClient.create({
    _type: "address",
    clerkUserId: userId,
    name,
    address,
    city,
    state,
    zip,
    default: body.default ?? false,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(doc, { status: 201 });
}

// DELETE /api/addresses?id=<sanityId> — deletes an address owned by the signed-in user
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Verify ownership before deleting
  const doc = await backendClient.fetch<{ clerkUserId?: string } | null>(
    `*[_type == "address" && _id == $id][0]{ clerkUserId }`,
    { id },
  );

  if (!doc || doc.clerkUserId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await backendClient.delete(id);
  return NextResponse.json({ success: true });
}
