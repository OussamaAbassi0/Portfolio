import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, CONTACT } from "@/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Aurora from "@/components/Aurora";

export const metadata: Metadata = {
  title: "Mentions légales — Oussama Abassi",
  robots: { index: false, follow: true },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const d = getDict(locale);

  return (
    <>
      <Nav d={d} locale="fr" />
      <main id="main">
        <section className="relative isolate overflow-hidden pb-20 pt-36 md:pt-44">
          <Aurora variant="soft" />
          <div className="shell relative max-w-3xl">
            <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Mentions légales</h1>

            <div className="mt-12 space-y-10 text-dim">
              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">Éditeur</h2>
                <p className="mt-3 leading-relaxed">
                  Oussama Abassi, ingénieur indépendant, établi en France (Union européenne).
                  <br />
                  Contact :{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-magenta underline decoration-magenta/30 underline-offset-4"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">Hébergement</h2>
                <p className="mt-3 leading-relaxed">
                  Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
                  États-Unis.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Données personnelles
                </h2>
                <p className="mt-3 leading-relaxed">
                  Les informations transmises via le formulaire de contact ou l'assistant
                  conversationnel (nom, adresse email, entreprise, type de projet, enveloppe
                  envisagée, message) sont utilisées uniquement pour répondre à votre demande. Elles
                  sont conservées sur une base PostgreSQL hébergée dans l'Union européenne et ne
                  sont ni revendues, ni transmises à des tiers à des fins commerciales.
                </p>
                <p className="mt-3 leading-relaxed">
                  Aucune adresse IP n'est stockée en clair : seule une empreinte cryptographique
                  salée est conservée, à seule fin de limiter les abus automatisés.
                </p>
                <p className="mt-3 leading-relaxed">
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
                  d'effacement et de portabilité de vos données. Une simple demande à{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-magenta underline decoration-magenta/30 underline-offset-4"
                  >
                    {CONTACT.email}
                  </a>{" "}
                  suffit ; elle est traitée sous 30 jours.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Cookies et mesure d'audience
                </h2>
                <p className="mt-3 leading-relaxed">
                  Ce site ne dépose aucun cookie publicitaire et n'utilise aucun traceur tiers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Assistant conversationnel
                </h2>
                <p className="mt-3 leading-relaxed">
                  L'assistant suit un parcours de qualification déterministe. Lorsqu'une question
                  libre est posée, elle peut être transmise à un modèle de langage hébergé par Groq
                  afin de générer une réponse. Le contenu de la conversation est enregistré pour
                  permettre le suivi de votre demande.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-extrabold text-bright">
                  Propriété intellectuelle
                </h2>
                <p className="mt-3 leading-relaxed">
                  L'ensemble des contenus de ce site — textes, visuels, schémas d'architecture,
                  code — est la propriété d'Oussama Abassi, sauf mention contraire.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer d={d} locale="fr" />
    </>
  );
}
