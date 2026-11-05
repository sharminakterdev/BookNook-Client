import Link from "next/link";
import {
  FaBookOpen,
  FaFlask,
  FaLandmark,
  FaChild,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    description: "Explore stories and imaginary worlds.",
    icon: FaBookOpen,
    color: "bg-[#E8F0E9]",
  },
  {
    name: "Science",
    description: "Discover science and new knowledge.",
    icon: FaFlask,
    color: "bg-[#E8EDF5]",
  },
  {
    name: "History",
    description: "Travel through the pages of history.",
    icon: FaLandmark,
    color: "bg-[#F5EDE1]",
  },
  {
    name: "Kids",
    description: "Wonderful stories for young readers.",
    icon: FaChild,
    color: "bg-[#F8E9E9]",
  },
  {
    name: "Others",
    description: "Find something different to read.",
    icon: FaLayerGroup,
    color: "bg-[#EFEAF5]",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-white px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="text-sm font-bold uppercase tracking-[3px] text-green-700">
            Find Your Interest
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#183D2B] md:text-5xl">
            Explore Top Categories
            <span className="text-green-600">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-500">
            From fascinating fiction to inspiring knowledge,
            discover books that match your interests.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-green-700" />
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/books?category=${category.name}`}
                className="group rounded-2xl border border-gray-100 bg-[#FAFAF7] p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${category.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="text-3xl text-[#245C43]" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#183D2B]">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  Explore
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}