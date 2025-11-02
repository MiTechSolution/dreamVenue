import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await pool.query("DELETE FROM gallery WHERE id = $1", [id]);
    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
