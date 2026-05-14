import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData, ApiResponse } from "@/types";

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

    // TODO: Integrate with email provider (e.g., SendGrid, Resend, AWS SES)
    // TODO: Integrate with CRM (e.g., HubSpot, Salesforce)
    // TODO: Send Slack notification to sales channel

    // Placeholder: log the submission (replace with real integrations)
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      company: body.company,
      industry: body.industry,
      budget: body.budget,
      timestamp: new Date().toISOString(),
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
