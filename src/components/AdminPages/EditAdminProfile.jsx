import React, { useState } from "react";

const EditAdminProfile = ({ adminDetails, onSave, onCancel }) => {
  const [form, setForm] = useState(adminDetails);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t pt-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-white"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 rounded bg-gray-200 text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 rounded bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditAdminProfile;
