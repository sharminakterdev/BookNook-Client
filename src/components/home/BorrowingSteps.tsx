import Link from "next/link";
import {
  FaSearch,
  FaBookOpen,
  FaExchangeAlt,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Explore Books",
    description:
      "Browse our collection and find your favorite books.",
    icon: FaSearch,
  },
  {
    number: "02",
    title: "Choose Your Book",
    description:
      "View book details and select the book you want to borrow.",
    icon: FaBookOpen,
  },
  {
    number: "03",
    title: "Enjoy Reading",
    description:
      "Borrow your book, enjoy reading, and return it on time.",
    icon: FaExchangeAlt,
  },
];

export default function BorrowingSteps() {
  return (
    <section className="bg-[#F8F7F2] px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="text-sm font-bold uppercase tracking-[3px] text-green-700">
            Simple & Easy
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#183D2B] md:text-5xl">
            How Borrowing Works
            <span className="text-green-600">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-500">
            Getting your next favorite book is easier than ever.
            Follow these three simple steps.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-green-700" />
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-[#E9E8DF] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8F0E9]">
                  <Icon className="text-3xl text-[#245C43]" />
                </div>

                <p className="mt-6 text-sm font-bold tracking-widest text-green-700">
                  STEP {step.number}
                </p>

                <h3 className="mt-3 text-xl font-bold text-[#183D2B]">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-xl bg-[#183D2B] px-8 py-4 font-semibold text-white transition hover:bg-green-800"
          >
            Start Exploring
            <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}