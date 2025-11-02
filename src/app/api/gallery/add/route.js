import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, category, image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO gallery (title, description, category, image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, category, image]
    );

    return NextResponse.json({ message: "Image added", data: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error adding image:", error);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
