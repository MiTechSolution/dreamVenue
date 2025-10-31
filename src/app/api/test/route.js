import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return new Response(JSON.stringify({ time: result.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
    });
  }
}
