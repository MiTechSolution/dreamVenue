import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, title, description, category, image } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    const updateQuery = `
      UPDATE gallery
      SET 
        title = $1,
        description = $2,
        category = $3,
        image = $4
      WHERE id = $5
      RETURNING *;
    `;

    const values = [title, description, category, image, id];
    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Image updated successfully",
      updatedImage: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
