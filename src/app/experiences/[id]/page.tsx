import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocumentTitle from "@/components/DocumentTitle";
import FavoriteButton from "@/components/FavoriteButton";
import { experiences } from "@/data/experiences";
import type { Experience } from "@/types/experience";

export default async function ExperienceDetailPage({ params }: PageProps<"/experiences/[id]">) {
  const { id } = await params;
  const experience: Experience | undefined = experiences.find((item) => String(item.id) === id);

  if (!experience) {
    notFound();
  }

  const { title, description, category, destination, price, rating, imageUrl } = experience;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <DocumentTitle title={`${title} | Wanderlust Explorer`} />

      <Link
        href="/experiences"
        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        <span aria-hidden="true">←</span> Volver a experiencias
      </Link>

      <article className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-video w-full bg-gray-100">
          <Image src={imageUrl} alt={title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {category}
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
              <p className="mt-1 text-gray-600">{destination}</p>
            </div>
            <FavoriteButton experienceId={experience.id} title={title} />
          </div>

          <p className="text-lg leading-8 text-gray-700">{description}</p>

          <dl className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
            <div>
              <dt className="text-sm text-gray-600">Precio</dt>
              <dd className="text-2xl font-bold text-gray-900">{price} €</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Valoración</dt>
              <dd className="flex items-center gap-1 text-2xl font-bold text-amber-600">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
                {rating.toFixed(1)} <span className="text-base font-normal text-gray-600">/ 5</span>
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
