import { eventPresentation } from '@/data/eventContent';

function OrnamentedImage({ src, alt, className = '' }) {
  const shellClassName = ['location-image-shell', className].filter(Boolean).join(' ');

  return (
    <div className={shellClassName}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <span className="corner-ornament corner-ornament--top-left" aria-hidden="true" />
      <span className="corner-ornament corner-ornament--top-right" aria-hidden="true" />
      <span className="corner-ornament corner-ornament--bottom-left" aria-hidden="true" />
      <span className="corner-ornament corner-ornament--bottom-right" aria-hidden="true" />
    </div>
  );
}

export default function EventPresentation() {
  const {
    hero,
    overview,
    facts,
    playerHighlights,
    location,
    locationDetails,
    worldBoss,
    activities,
    activityCards,
    finalCta
  } = eventPresentation;

  return (
    <main className="event-page" style={{ '--page-bg': `url(${hero.repeatBackground})` }}>
      <section
        className="event-hero"
        style={{ '--hero-bg': `url(${hero.background})` }}
        aria-labelledby="hero-title"
      >
        <div className="event-hero__inner">
          <div className="event-hero__copy">
            <div className="event-hero__title-block">
              <div className="hero-ornament hero-ornament--top">
                <span>{hero.ornamentTitle}</span>
              </div>
              <h1 id="hero-title">{hero.title}</h1>
              <div className="hero-ornament hero-ornament--bottom" aria-hidden="true">
                <span className="ornament-mark" />
                <span className="ornament-mark" />
                <span className="ornament-mark" />
              </div>
            </div>
            <div className="event-hero__actions">
              <span className="event-badge">{hero.badge}</span>
              <a className="event-button" href="#details">
                {hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="event-content" id="details">
        <section className="section-block section-block--overview" aria-labelledby="overview-title">
          <div className="content-shell overview-grid">
            <div className="section-heading">
              <p className="section-kicker">O wydarzeniu</p>
              <h2 id="overview-title">Letni event w klimacie</h2>
              <p>{overview}</p>
            </div>

            <aside className="facts-panel" aria-label="Najwazniejsze informacje">
              {facts.map((fact) => (
                <div className="fact-row" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section-block" aria-labelledby="players-title">
          <div className="content-shell">
            <div className="section-heading section-heading--center">
              <p className="section-kicker">Co czeka graczy?</p>
              <h2 id="players-title">Aktywnosci przygotowane pod codzienna gre</h2>
            </div>

            <div className="feature-grid">
              {playerHighlights.map((item) => (
                <article className="feature-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" aria-labelledby="location-title">
          <div className="content-shell location-section">
            <div className="section-heading location-heading">
              <p className="section-kicker">{location.kicker}</p>
              <h2 id="location-title">{location.title}</h2>
              <p>{location.text}</p>
            </div>

            <div className="location-showcase">
              <div className="location-gallery" aria-label="Galeria Morskiej Swiatyni">
                {location.gallery.map((image, index) => (
                  <figure className="location-frame" key={image.src}>
                    <OrnamentedImage src={image.src} alt={image.alt} />
                    <figcaption>Widok {index + 1}</figcaption>
                  </figure>
                ))}
              </div>

              <aside className="minimap-panel" aria-label="Minimapa Morskiej Swiatyni">
                <OrnamentedImage
                  className="minimap-frame location-image-shell--minimap"
                  src={location.minimap.src}
                  alt={location.minimap.alt}
                />
                <p>Minimapa lokacji</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-block section-block--temple-rules" aria-labelledby="temple-rules-title">
          <div className="content-shell temple-rules">
            <div className="section-heading section-heading--center temple-rules__heading">
              <p className="section-kicker">{locationDetails.kicker}</p>
              <h2 id="temple-rules-title">{locationDetails.title}</h2>
              <p>{locationDetails.text}</p>
            </div>

            <div className="temple-rules__flow">
              <div className="temple-entry">
                <OrnamentedImage src={locationDetails.image.src} alt={locationDetails.image.alt} />
                <p>{locationDetails.entryText}</p>
              </div>

              <div className="temple-requirements" aria-label="Wymagania Morskiej Swiatyni">
                {locationDetails.requirements.map((item) => (
                  <p className="temple-requirement" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </p>
                ))}
              </div>

              <div className="temple-warning">
                <h3>{locationDetails.warningTitle}</h3>
                <p>{locationDetails.warning}</p>
              </div>

              <div className="section-divider" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="temple-tunnel" aria-labelledby="temple-tunnel-title">
                <div className="temple-tunnel__heading">
                  <h3 id="temple-tunnel-title">{locationDetails.tunnel.title}</h3>
                  <p>{locationDetails.tunnel.text}</p>
                </div>

                <p className="tunnel-gate-warning">
                  <span className="tunnel-gate-warning__mark" aria-hidden="true">
                    !
                  </span>
                  <span>{locationDetails.tunnel.warning}</span>
                </p>

                <div className="stone-list">
                  {locationDetails.tunnel.stones.map((stone) => (
                    <article className="stone-item" key={stone.name}>
                      <div className="stone-image-wrap">
                        <img src={stone.image} alt={stone.alt} loading="lazy" decoding="async" />
                        <span className="stone-corner stone-corner--top-left" aria-hidden="true" />
                        <span className="stone-corner stone-corner--top-right" aria-hidden="true" />
                        <span className="stone-corner stone-corner--bottom-left" aria-hidden="true" />
                        <span className="stone-corner stone-corner--bottom-right" aria-hidden="true" />
                      </div>
                      <div className="stone-copy">
                        <p className="stone-rule">{stone.rule}</p>
                        <h4>{stone.name}</h4>
                        <p>{stone.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block world-boss-section" aria-labelledby="world-boss-title">
          <div className="content-shell world-boss">
            <div className="guardian-encounter">
              <div className="encounter-art">
                <OrnamentedImage
                  className="boss-art boss-art--guardian"
                  src={worldBoss.guardian.image.src}
                  alt={worldBoss.guardian.image.alt}
                />
              </div>

              <div className="encounter-copy">
                <p className="encounter-badge">{worldBoss.guardian.badge}</p>
                <h2 id="world-boss-title">{worldBoss.guardian.title}</h2>
                <p>{worldBoss.guardian.text}</p>
              </div>
            </div>

            <div className="boss-encounter" aria-labelledby="queen-title">
              <div className="boss-hero">
                <div className="boss-copy">
                  <p className="encounter-badge encounter-badge--strong">{worldBoss.boss.badge}</p>
                  <h2 id="queen-title">{worldBoss.boss.title}</h2>
                  <p>{worldBoss.boss.lead}</p>
                </div>

                <div className="boss-art-wrap">
                  <OrnamentedImage
                    className="boss-art boss-art--queen"
                    src={worldBoss.boss.image.src}
                    alt={worldBoss.boss.image.alt}
                  />
                </div>
              </div>

              <div className="boss-callouts" aria-label="Najwazniejsze mechaniki Krolowej Syren">
                {worldBoss.boss.callouts.map((callout) => (
                  <p className="boss-callout" key={callout}>
                    {callout}
                  </p>
                ))}
              </div>

              <div className="boss-mechanics">
                {worldBoss.boss.mechanics.map((mechanic) => (
                  <article
                    className={mechanic.featured ? 'boss-mechanic boss-mechanic--featured' : 'boss-mechanic'}
                    key={mechanic.title}
                  >
                    <h3>{mechanic.title}</h3>
                    <p>{mechanic.text}</p>
                  </article>
                ))}
              </div>

              <div className="boss-flow" aria-label="Przebieg po smierci w ostatniej komnacie">
                {worldBoss.boss.flow.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" aria-labelledby="activities-title">
          <div className="content-shell split-section split-section--reverse">
            <div className="activity-grid">
              {activityCards.map((item) => (
                <article className="activity-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="section-heading">
              <p className="section-kicker">Specjalne aktywnosci</p>
              <h2 id="activities-title">Dynamicznie, ale bez przesadnego tempa</h2>
              <p>{activities}</p>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="content-shell final-cta__inner">
            <div>
              <p className="section-kicker">Final</p>
              <h2 id="final-title">{finalCta.title}</h2>
              <p>{finalCta.text}</p>
            </div>
            <span className="final-cta__badge">{finalCta.badge}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
