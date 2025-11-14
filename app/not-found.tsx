import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-6xl font-extrabold tracking-tight mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page not found</h2>
                <p className="text-slate-300 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Try going back to the
                    homepage or
                    searching for something else.
                </p>

                <div className="flex justify-center lg:justify-start gap-4">
                    <Link href="/"
                          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition text-white px-5 py-3 rounded-md shadow">
                        Go back home
                    </Link>
                    <a href="#contact"
                       className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 px-4 py-3 rounded-md hover:bg-slate-800 transition">
                        Contact support
                    </a>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div
                    className="relative w-[360px] h-[280px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-600 to-pink-500">
                    <Image src="/images/event-full.png" alt="Not found illustration" fill
                           style={{objectFit: 'cover'}}/>
                </div>
            </div>
        </section>

    )

}

