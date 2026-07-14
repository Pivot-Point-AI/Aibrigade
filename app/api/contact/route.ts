import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData, ApiResponse } from "@/types";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();

    // Validate required fields
    const required = ["name", "email", "company", "message"] as const;
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Integrate with CRM (e.g., HubSpot, Salesforce)
    // TODO: Send Slack notification to sales channel

    const escapeHtml = (s: string) =>
      s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

    await sendMail({
      subject: `New contact form submission — ${body.company}`,
      replyTo: body.email,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(body.company)}</p>
        ${body.phone ? `<p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>` : ""}
        <p><strong>Industry:</strong> ${escapeHtml(body.industry)}</p>
        ${body.budget ? `<p><strong>Budget:</strong> ${escapeHtml(body.budget)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json<ApiResponse<{ id: string }>>(
      {
        success: true,
        data: { id: `contact-${Date.now()}` },
        message: "Thank you! We'll be in touch within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Rate limiting headers (implement with Upstash Redis or similar in production)
export async function GET() {
  return NextResponse.json({ message: "Contact API is operational" });
}
