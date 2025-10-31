import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Get all bookings with user info (JOIN query)
    const result = await pool.query(`
      SELECT 
        b.id AS booking_id,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.phone AS user_phone,
        b.booking_type,
        b.event_type,
        b.event_date,
        b.event_time,
        b.guest_count,
        b.payment_method,
        b.total_amount,
        b.status,
        b.special_request,
        b.created_at
      FROM bookings b
      INNER JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `);

    // If no bookings found
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "No bookings found", bookings: [] },
        { status: 200 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: "All bookings fetched successfully",
        totalBookings: result.rows.length,
        bookings: result.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
