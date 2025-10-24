"use client";

import { useState } from "react";

export default function CreateUser({ onUserCreated }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resUsers = await fetch("/api/users");
      if (!resUsers.ok) throw new Error("Failed to fetch users");
      const users = await resUsers.json();

      const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 10;

      const newUser = {
        id: maxId + 1,
        name: form.name,
        email: form.email,
        company: { name: form.companyName },
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setShow(false);
        setForm({ name: "", companyName: "", email: "" });
        onUserCreated(newUser);
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <button onClick={() => setShow(true)} className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer">
        Create User
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="p-6 rounded-xl w-[90%] max-w-md bg-white">
            <h3 className="text-lg font-semibold text-black mb-4">
              Create New User
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Name" value={form.name} onChange={e => handleChange("name", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Company Name" value={form.companyName} onChange={e => handleChange("companyName", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="email" placeholder="Email" value={form.email} onChange={e => handleChange("email", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShow(false)} className="px-3 py-2 rounded-lg text-sm bg-red-600 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg text-sm text-white bg-blue-600 cursor-pointer">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}