import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

//GET User
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error reading users.json:", error);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

//CREATE User
export async function POST(request) {
  try {
    const newUser = await request.json();
    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData);

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
