import AutoVideo from "@/components/AutoVideo";

const TICKS = Array.from({ length: 31 }, (_, i) => i * 10 + 5);

export default function Hero() {
  return (
    <>
      <section className="wrap hero" id="top">
        <div className="hero-copy">
          <h1 className="plate">
            Maxence
            <br />
            Leguéry
          </h1>
          <p className="hero-role">Freelance engineer, Paris</p>
          <p className="hero-lede">
            I take products from the first commit to production and keep them running: the app, the models, and the
            cloud underneath.
          </p>
          <p className="hero-now">
            Currently CTO for Podtech, remotely. Also shipping Relevé, a road-collecting game for France, now on the App Store.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">Start a project</a>
            <a className="btn btn-ghost" href="#missions">See the work</a>
          </div>
        </div>

        <figure className="viewport">
          <div className="viewport-glass">
            <AutoVideo
              src="/media/blackhole-loop.mp4"
              poster="/media/blackhole-poster.jpg"
              label="A Kerr black hole with its accretion disk, rendered by my simulator"
            />
            <svg className="reticle" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
              <g stroke="#5fd4e6" strokeOpacity="0.55" vectorEffect="non-scaling-stroke">
                {TICKS.map((x) => (
                  <line key={x} x1={x} x2={x} y1={x % 50 === 5 ? 0 : 1} y2={x % 50 === 5 ? 6 : 3.5} vectorEffect="non-scaling-stroke" />
                ))}
                <line x1="146" x2="154" y1="100" y2="100" vectorEffect="non-scaling-stroke" />
                <line x1="166" x2="174" y1="100" y2="100" vectorEffect="non-scaling-stroke" />
                <line x1="160" x2="160" y1="86" y2="94" vectorEffect="non-scaling-stroke" />
                <line x1="160" x2="160" y1="106" y2="114" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
            <div className="readout tl">KERR METRIC<br />SPIN a = 0.90</div>
            <div className="readout tr">OBSERVER r = 70 M<br />INCLINATION 80°</div>
            <div className="readout bl">Rendered by my WebGL2 simulator</div>
            <div className="readout br">
              <a href="https://blackhole.maxenceleguery.net">Fly it yourself</a>
            </div>
          </div>
        </figure>
      </section>

      <div className="wrap">
        <dl className="telemetry">
          <div>
            <dt>Base</dt>
            <dd>Paris, remote-first</dd>
          </div>
          <div>
            <dt>In service</dt>
            <dd>Relevé, Adenor, Cutforge, Buddy</dd>
          </div>
          <div>
            <dt>Clouds</dt>
            <dd>GCP, AWS, Azure, OVH</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="lamp" aria-hidden="true" />
              Open to new missions
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
