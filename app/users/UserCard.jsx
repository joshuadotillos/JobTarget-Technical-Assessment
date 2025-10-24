export default function UserCard({ user }) {
  return (
    <div className="border p-4 rounded-xl bg-white">
      <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.company?.name}</p>
      <p className="text-sm text-blue-500">{user.email}</p>
    </div>
  );
}