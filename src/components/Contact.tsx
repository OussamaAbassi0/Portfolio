import type { Dict, Locale } from "@/content";
import Aurora from "./Aurora";
import SectionHead from "./SectionHead";
import ContactForm from "./ContactForm";
import Chat from "./Chat";

export default function Contact({ d, locale }: { d: Dict; locale: Locale }) {
  return (
    <section id="contact" className="section relative isolate overflow-hidden">
      <Aurora variant="soft" />
      <div className="shell relative">
        <SectionHead kicker={d.contact.kicker} title={d.contact.title} sub={d.contact.sub} />

        <div className="reveal mt-14 grid items-start gap-4 lg:grid-cols-[1.25fr_1fr]">
          <ContactForm d={d} locale={locale} />
          <Chat d={d} locale={locale} />
        </div>
      </div>
    </section>
  );
}
