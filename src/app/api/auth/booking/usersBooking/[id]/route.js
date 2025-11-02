import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT 
         b.id, b.booking_type, b.event_type, b.event_date, b.event_time,
         b.guest_count, b.payment_method, b.total_amount, b.status, b.created_at
       FROM bookings b
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "No bookings found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User bookings fetched successfully",
        user_id: id,
        totalBookings: result.rows.length.toString(),
        bookings: result.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
