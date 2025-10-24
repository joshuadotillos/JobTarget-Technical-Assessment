"use client";

import { useState } from "react";

export default function CreateUser({ onUserCreated }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",

    addressStreet: "",
    addressSuite: "",
    addressCity: "",
    addressZipcode: "",
    geoLat: "",
    geoLng: "",

    companyName: "",
    companyCatchPhrase: "",
    companyBs: ""
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
        username: form.username,
        email: form.email,
        address: {
          street: form.addressStreet,
          suite: form.addressSuite,
          city: form.addressCity,
          zipcode: form.addressZipcode,
          geo: {
            lat: form.geoLat,
            lng: form.geoLng
          }
        },
        phone: form.phone,
        website: form.website,
        company: {
          name: form.companyName,
          catchPhrase: form.companyCatchPhrase,
          bs: form.companyBs
        }
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
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div className="p-4 rounded-xl w-[90%] max-w-md bg-white">
            <h3 className="text-2xl font-semibold text-black mb-2">
              Create New User
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <h3 className="text-lg font-semibold text-black mb-2">User Information</h3>
              <input type="text" placeholder="Name" value={form.name} onChange={e => handleChange("name", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Username" value={form.username} onChange={e => handleChange("username", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Phone" value={form.phone} onChange={e => handleChange("phone", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="email" placeholder="Email" value={form.email} onChange={e => handleChange("email", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Website" value={form.website} onChange={e => handleChange("website", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />

              <h3 className="text-lg font-semibold text-black mb-2">Address</h3>
              <input type="text" placeholder="Street" value={form.addressStreet} onChange={e => handleChange("addressStreet", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Suite" value={form.addressSuite} onChange={e => handleChange("addressSuite", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="City" value={form.addressCity} onChange={e => handleChange("addressCity", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="ZIP Code" value={form.addressZipcode} onChange={e => handleChange("addressZipcode", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Latitude" value={form.geoLat} onChange={e => handleChange("geoLat", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Longitude" value={form.geoLng} onChange={e => handleChange("geoLng", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />

              <h3 className="text-lg font-semibold text-black mb-2">Company</h3>
              <input type="text" placeholder="Company Name" value={form.companyName} onChange={e => handleChange("companyName", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="Catch Phrase" value={form.companyCatchPhrase} onChange={e => handleChange("companyCatchPhrase", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />
              <input type="text" placeholder="BS" value={form.companyBs} onChange={e => handleChange("companyBs", e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 text-black" required />

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