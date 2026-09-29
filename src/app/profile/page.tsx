import Image from "next/image";
import type { Metadata } from "next";
import ProfileSummary from "@/components/ProfileSummary";

export const metadata: Metadata = {
  title: "Perfil | Wanderlust Explorer",
  description: "Tu perfil de viajero.",
};

const user = {
  name: "Lucía Fernández",
  email: "lucia.fernandez@example.com",
  location: "Madrid, Spain",
  bio: "Viajera empedernida y amante de la fotografía. Siempre buscando la próxima ruta de senderismo, un buen mercado local y una puesta de sol frente al mar.",
  memberSince: "15 de marzo de 2023",
  avatarUrl: "https://picsum.photos/seed/profile-avatar/256/256",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Mi perfil</h1>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start">
          <Image
            src={user.avatarUrl}
            alt={`Avatar de ${user.name}`}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover ring-4 ring-indigo-100"
          />
          <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
            <dl className="grid gap-2 text-sm">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-medium text-gray-900">Email:</dt>
                <dd className="text-gray-600">{user.email}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-medium text-gray-900">Ubicación:</dt>
                <dd className="text-gray-600">{user.location}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-medium text-gray-900">Miembro desde:</dt>
                <dd className="text-gray-600">{user.memberSince}</dd>
              </div>
            </dl>
            <p className="leading-7 text-gray-700">{user.bio}</p>
          </div>
        </section>

        <ProfileSummary />
      </div>
    </main>
  );
}
