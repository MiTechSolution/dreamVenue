import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM gallery ORDER BY id DESC");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
