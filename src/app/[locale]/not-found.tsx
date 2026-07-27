import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="mt-5 text-[clamp(2.4rem,7vw,4.5rem)]">
          Cette page <span className="text-aurora">n&apos;existe pas</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-[40ch] text-dim">
          Le lien est peut-être ancien. Le reste du site fonctionne.
          <br />
          This link may be outdated. The rest of the site works.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/fr"
            className="rounded-full px-7 py-4 text-sm font-medium text-white"
            style={{ background: "var(--aurora)" }}
          >
            Accueil
          </Link>
          <Link href="/en" className="glass rounded-full px-7 py-4 text-sm font-medium text-bright">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
