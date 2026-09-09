import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // Jangan lupa npm install nodemailer

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Validasi data masuk
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // 1. Konfigurasi pengirim email (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Email Gmail lu
        pass: process.env.EMAIL_PASS, // App Password Gmail lu
      },
    });

    // 2. Proses pengiriman email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Dikirim ke email lu sendiri biar masuk inbox
      replyTo: email, // Biar lu bisa langsung klik 'Reply' ke pengirim
      subject: `Pesan Baru [${category || "Umum"}] dari ${name}`,
      text: `Ada pesan baru nih dari website!\n\nNama: ${name}\nEmail: ${email}\nKategori: ${category || "Umum"}\n\nPesan:\n${message}`,
    });

    // Kalau sukses, balikin response ini ke frontend lu
    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim ke email.",
    });

  } catch (error) {
    // Biar gampang nge-debug kalau ada error di server Render
    console.error("Gagal ngirim email:", error); 
    
    return NextResponse.json(
      { error: "Gagal memproses pengiriman pesan." },
      { status: 500 }
    );
  }
}