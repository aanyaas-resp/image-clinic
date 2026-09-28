import Image from "next/image";

type ResultItem = { slug: string; image: string; alt: string };

const DEFAULT_RESULTS: ResultItem[] = [
  { slug: "result-1", image: "/result/result-1.webp", alt: "Before and after transformation at Image Clinic" },
  { slug: "result-2", image: "/result/result-2.webp", alt: "Before and after transformation at Image Clinic" },
  { slug: "result-3", image: "/result/result-3.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-4", image: "/result/result-4.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-5", image: "/result/result-5.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-6", image: "/result/result-6.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-7", image: "/result/result-7.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-8", image: "/result/result-8.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-9", image: "/result/result-9.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-10", image: "/result/result-10.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-11", image: "/result/result-11.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-12", image: "/result/result-12.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-13", image: "/result/result-13.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-14", image: "/result/result-14.webp", alt: "Real skin result at Image Clinic" },
  { slug: "result-15", image: "/result/result-15.webp", alt: "Real skin result at Image Clinic" },
];

const DEFAULT_LIMIT = 8;

export default function ResultsGrid({
  results = DEFAULT_RESULTS,
  limit = DEFAULT_LIMIT,
}: {
  results?: ResultItem[];
  limit?: number;
}) {
  const visibleResults = results.slice(0, limit);

  return (
    <section id="results" className="bg-noir px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3 justify-center sm:mb-4">Real Results</p>
            <h2 className="font-display text-2xl font-semibold leading-snug text-parchment sm:text-4xl lg:text-5xl">
              Our <span className="accent-italic">Results</span>
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-parchment/70 sm:mt-4 sm:text-base">
              A snapshot of real transformations from Image Clinic in Kailash Garden and Gurugram. For the full collection, follow along on Instagram.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {visibleResults.length === 0 ? (
              <p className="col-span-full text-center text-sm text-parchment/60">
                Results coming soon.
              </p>
            ) : (
              visibleResults.map((item) => (
                <div
                  key={item.slug}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_10px_30px_-8px_rgba(43,32,22,0.25)] ring-1 ring-inset ring-gold/10 transition-shadow duration-500 hover:shadow-[0_20px_45px_-12px_rgba(184,134,58,0.35)] sm:rounded-3xl"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-noir-deep/60 via-transparent to-transparent"
                  />
                </div>
              ))
            )}
          </div>
        </div>
    </section>
  );
}