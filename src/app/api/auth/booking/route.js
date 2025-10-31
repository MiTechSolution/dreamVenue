import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { sendBookingEmail } from "@/app/utils/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      user_id,
      bookingType,
      eventType,
      eventDate,
      eventTime,
      guestCount,
      paymentMethod,
      totalAmount,
      easyPaisaNumber,
      jazzCashNumber,
      accountNumber,
      specialRequest,
    } = body;

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO bookings 
      (user_id, booking_type, event_type, event_date, event_time, guest_count, 
       payment_method, total_amount, easy_paisa_number, jazz_cash_number, account_number, special_request, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending')
       RETURNING *`,
      [
        user_id,
        bookingType,
        eventType,
        eventDate,
        eventTime,
        guestCount,
        paymentMethod,
        totalAmount,
        easyPaisaNumber,
        jazzCashNumber,
        accountNumber,
        specialRequest,
      ]
    );

    const booking = result.rows[0];
    // await sendBookingEmail("user@example.com", "User Name", booking.id);

    return NextResponse.json({ message: "Booking created successfully!", booking }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}