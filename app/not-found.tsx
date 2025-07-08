import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-initial-fade-in">
      <div className="max-w-md w-full space-y-8 text-center animate-initial-slide-in">
        <h1 className="text-9xl font-bold text-myPrimary">404</h1>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-5">
          <Link href="/">
            <span className="inline-flex items-center bg-myPrimary px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform-hover-active">
              Go back home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
