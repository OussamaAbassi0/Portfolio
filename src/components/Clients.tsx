import type { Dict } from "@/content";

/**
 * Bandeau de confiance, juste après les chiffres.
 *
 * Les logos sont fournis en blanc plein, pas en couleur : cinq identités
 * visuelles côte à côte (un caméléon arc-en-ciel, un rouge, un violet) se
 * battraient entre elles et avec la page. Une seule couleur, des hauteurs
 * calibrées à l'œil et non au pixel, et la rangée redevient lisible d'un coup
 * d'œil — c'est le seul rôle qu'on lui demande.
 *
 * Ils ne sont pas cliquables : un visiteur qui clique sur un logo client
 * s'attend à aller chez le client, pas ailleurs sur mon site.
 */
export default function Clients({ d }: { d: Dict }) {
  return (
    <section className="shell relative pb-10 pt-4 md:pb-16">
      <p className="label text-center">{d.clients.kicker}</p>

      <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 md:gap-x-16">
        {d.clients.items.map((c) => (
          <li key={c.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.src}
              alt={c.name}
              height={c.h}
              style={{ height: c.h }}
              loading="lazy"
              decoding="async"
              className="w-auto opacity-55 transition-opacity duration-300 hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
