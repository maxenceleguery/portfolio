import OrbitChart from "@/components/stations/OrbitChart";

// Station 1, the forward window. The black hole outside is a capture of my simulator.
export default function Helm() {
  return (
    <div className="helm">
      <div className="helm-copy">
        <h1 className="plate">
          Maxence
          <br />
          Leguéry
        </h1>
        <p className="hero-role">Freelance engineer, Paris</p>
        <p className="hero-lede">
          I take products from the first commit to production and keep them running: the app, the models, and the cloud
          underneath.
        </p>
        <p className="hero-now">
          Currently CTO for Podtech, remotely. Also shipping Relevé, a road-collecting game for France, now on the App
          Store.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#comms">Open a channel</a>
          <a className="btn btn-ghost" href="#missions">Review missions</a>
        </div>
        <dl className="helm-readouts">
          <div>
            <dt>Outside</dt>
            <dd>Kerr black hole, spin a = 0.90</dd>
          </div>
          <div>
            <dt>Rendered by</dt>
            <dd>
              <a className="link" href="https://blackhole.maxenceleguery.net">my WebGL2 simulator</a>
            </dd>
          </div>
          <div>
            <dt>Clouds flown</dt>
            <dd>GCP, AWS, Azure, OVH</dd>
          </div>
        </dl>
      </div>
      <OrbitChart />
    </div>
  );
}
