import { CustomerService } from "@/lib/services/customer";
import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  try {
    const customerService = new CustomerService(DB);
    const customers = await customerService.getAll();
    
    // ডাটাবেস কোয়েরি সফল হলে ডাটা রিটার্ন করো (না পাওয়া গেলে empty array)
    return Response.json({ customers: customers || [] });
  } catch (error) {
    console.error("GET /api/customers Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  try {
    // রিকোয়েস্ট বডি ভ্যালিডেশন
    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      return Response.json({ message: "Invalid request body" }, { status: 400 });
    }

    const customerService = new CustomerService(DB);
    const success = await customerService.create(body);

    if (success) {
      return Response.json(
        { message: "Customer created successfully", success: true },
        { status: 201 },
      );
    } else {
      return Response.json(
        { message: "Failed to save customer data", success: false },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("POST /api/customers Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
