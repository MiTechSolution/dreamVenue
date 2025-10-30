// app/api/catering/order/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // small server-side validation (mock)
  if (!body?.customer?.name || !body?.customer?.phone) {
    return NextResponse.json({ success: false, message: "Missing customer information" }, { status: 400 });
  }

  // simulate processing delay
  await new Promise(res => setTimeout(res, 800));

  const orderId = `CV-${Date.now().toString().slice(-6)}`;

  return NextResponse.json({
    success: true,
    orderId,
    message: "Order received. We will contact you within 24 hours.",
  });
}
