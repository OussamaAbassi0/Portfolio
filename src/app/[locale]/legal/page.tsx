import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, CONTACT } from "@/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Aurora from "@/components/Aurora";

export const metadata: Metadata = {
  title: "Legal notice — Oussama Abassi",
  robots: { index: false, follow: true },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  const d = getDict(locale);

  return (
    <>
      <Nav d={d} locale="en" />
      <main id="main">
        <section className="relative isolate overflow-hidden pb-20 pt-36 md:pt-44">
          <Aurora variant="soft" />
          <div className="shell relative max-w-3xl">
            <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Legal notice</h1>

            <div className="mt-12 space-y-10 text-dim">
              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">Publisher</h2>
                <p className="mt-3 leading-relaxed">
                  Oussama Abassi, independent engineer, established in France (European Union).
                  <br />
                  Contact:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-magenta underline decoration-magenta/30 underline-offset-4"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">Hosting</h2>
                <p className="mt-3 leading-relaxed">
                  This site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
                  United States.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">Personal data</h2>
                <p className="mt-3 leading-relaxed">
                  Information submitted through the contact form or the conversational assistant
                  (name, email address, company, project type, budget range, message) is used solely
                  to answer your request. It is stored in a PostgreSQL database hosted in the
                  European Union and is never sold or passed to third parties for commercial
                  purposes.
                </p>
                <p className="mt-3 leading-relaxed">
                  No IP address is stored in plain text: only a salted cryptographic hash is kept,
                  purely to limit automated abuse.
                </p>
                <p className="mt-3 leading-relaxed">
                  Under the GDPR you have the right to access, rectify, erase and port your data. A
                  simple request to{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-magenta underline decoration-magenta/30 underline-offset-4"
                  >
                    {CONTACT.email}
                  </a>{" "}
                  is enough; it is handled within 30 days.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Cookies and analytics
                </h2>
                <p className="mt-3 leading-relaxed">
                  This site sets no advertising cookies and uses no third-party trackers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Conversational assistant
                </h2>
                <p className="mt-3 leading-relaxed">
                  The assistant follows a deterministic qualification flow. When a free-form
                  question is asked, it may be forwarded to a language model hosted by Groq to
                  generate an answer. Conversation content is recorded so your request can be
                  followed up.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Intellectual property
                </h2>
                <p className="mt-3 leading-relaxed">
                  All content on this site — text, visuals, architecture diagrams, code — is the
                  property of Oussama Abassi unless stated otherwise.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer d={d} locale="en" />
    </>
  );
}
