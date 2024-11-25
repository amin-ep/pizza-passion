import { getPizza } from "@/app/_services/pizza-api";

export async function GET(request, { params }) {
  const { pizzaId } = params;

  try {
    const response = await Promise.all[getPizza(pizzaId)];
    return Response.json(response);
  } catch {
    return Response.json({ message: "Pizza not found!" });
  }
}

// export async function POST() {}

// export async function PATCH() {}

// export async function DELETE() {}
