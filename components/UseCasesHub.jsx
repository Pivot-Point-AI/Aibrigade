import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import { Head, ARROW } from "@/components/Company";
import { getUseCase, useCaseIds, USE_CASES_PAGE } from "@/components/usecases.data";
import { SERVICE_PAGES } from "@/components/servicepages.data";

/**
 * /use-cases, the page that lists every product.
 *
 * Set in the service pages' language (company.css and svcpage.css): the
 * dark hero, a numbered chapter head, and below it the product cards the
 * use-case pages already close on ("More use cases", usecase.css). The
 * cards print each product's own name, sector and one-line use, so the
 * hub adds no copy of its own beyond the headline and the lede
 * (USE_CASES_PAGE in usecases.data.js).
 */

const PRODUCTS = useCaseIds.map((id) => getUseCase(id));

/* Where to go next: the two service pages and the company. */
const NEXT = [
  { label: SERVICE_PAGES.agentic.name, text: SERVICE_PAGES.agentic.description, href: SERVICE_PAGES.agentic.path },
  { label: SERVICE_PAGES.automation.name, text: SERVICE_PAGES.automation.description, href: SERVICE_PAGES.automation.path },
  {
    label: "Company",
    text: "Who AI Brigade is, the rules it builds by and how an engagement runs.",
    href: "/company",
  },
];

export default function UseCasesHub() {
  const page = USE_CASES_PAGE;
  return (
    <main className="ax-co ax-sp ax-hub">
      <section className="ax-co__hero ax-co--dark">
        <span className="ax-co__hero-grid" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__hero-copy">
              <span className="ax-page-eyebrow">{page.eyebrow}</span>
              <h1 className="ax-co__title ax-co__title--fit">
                <MaskHeading text={page.headline} />
              </h1>
              <Reveal variant="rise" delay={0.2} immediate className="ax-co__lede">
                <p>{page.lede}</p>
              </Reveal>
              <Reveal variant="rise" delay={0.3} immediate className="ax-co__actions">
                <TransitionLink href="/contact" className="ax-co__btn">
                  <span>Let&rsquo;s Start the Conversation</span>
                  {ARROW}
                </TransitionLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ax-co__band ax-hub__products" aria-labelledby="hub-products-title">
        <div className="padding-global">
          <div className="container-large">
            <Head
              n="01"
              label="The products"
              id="hub-products-title"
              title="One agent,"
              accent="one job done."
              lede="Pick the product closest to your workflow. If none is, tell us the workflow and we will say which fits."
            />
            <Reveal variant="stagger" selector=".ax-uc__card" className="ax-uc__cards ax-hub__cards" as="ul">
              {PRODUCTS.map((o) => (
                <li key={o.id} className="ax-uc__card">
                  <TransitionLink href={o.href} className="ax-uc__card-link">
                    {/* A portrait frame stands whole on a blurred wash of
                        itself, as it does on the use-case pages. */}
                    <span className="ax-uc__card-media" data-orientation={o.posterOrientation}>
                      {o.poster && o.posterOrientation === "portrait" ? (
                        <span
                          className="ax-uc__card-wash"
                          style={{ backgroundImage: `url(${o.poster})` }}
                          aria-hidden="true"
                        />
                      ) : null}
                      {o.poster ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={o.poster}
                          alt={`${o.name}: ${o.useCase}`}
                          loading="lazy"
                          className="ax-uc__card-img"
                        />
                      ) : null}
                    </span>
                    <span className="ax-uc__card-body">
                      <span className="ax-uc__card-sector">{o.sector}</span>
                      <span className="ax-uc__card-name">{o.name}</span>
                      <span className="ax-uc__card-line">{o.useCase}</span>
                    </span>
                    <span className="ax-uc__card-arrow" aria-hidden="true">
                      {ARROW}
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="ax-co__band ax-sp__related" aria-labelledby="hub-next-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise">
              <h2 id="hub-next-title" className="ax-sp__related-title">
                Keep exploring
              </h2>
            </Reveal>
            <Reveal variant="stagger" selector=".ax-sp__rel" as="ul" className="ax-sp__rel-grid">
              {NEXT.map((r) => (
                <li className="ax-sp__rel" key={r.href}>
                  <TransitionLink href={r.href} className="ax-sp__rel-link">
                    <span className="ax-sp__rel-name">{r.label}</span>
                    <span className="ax-sp__rel-text">{r.text}</span>
                    <span className="ax-sp__rel-go" aria-hidden="true">
                      {ARROW}
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
