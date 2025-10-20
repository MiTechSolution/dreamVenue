import pool from "@/lib/db";
import { hashPassword } from "@/app/utils/hash.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
  const { name, email, password, phone } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "All fields (name, email, password, phone) are required" },
        { status: 400 }
      );
    }

    // Check existing user
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, email, name,phone",
      [name, email, hashed, phone]
    );


    return NextResponse.json({ message: "User registered SuccessFully", user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
