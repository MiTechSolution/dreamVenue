import pool from "@/lib/db";
import { comparePassword } from "@/app/utils/hash.js";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
        
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const user = userResult.rows[0];
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = generateToken(user);

    return NextResponse.json({ message: "Login successful", token, user}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
