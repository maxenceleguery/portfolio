import CopyEmail from "@/components/CopyEmail";
import { EMAIL, GITHUB, LINKEDIN } from "@/lib/data";

export default function Contact() {
  return (
    <section className="wrap bay" id="contact">
      <header className="bay-head">
        <h2 className="plate">Contact</h2>
      </header>

      <div className="contact brackets">
        <div>
          <p className="contact-lead">Tell me what you&apos;re building.</p>
          <p className="contact-copy">
            A few lines are enough: what exists today, what should exist, and by when. I usually answer within a day.
          </p>
          <div className="email-row">
            <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <CopyEmail email={EMAIL} />
          </div>
        </div>

        <div className="contact-side">
          <div>
            <h3>What I take on</h3>
            <ul>
              <li>Building a product from zero to production: web, mobile, AI features</li>
              <li>Cloud infrastructure in Terraform, CI/CD and security hardening</li>
              <li>Taking over an existing codebase and making it dependable</li>
              <li>Fractional CTO work: architecture and technical decisions</li>
            </ul>
          </div>
          <div className="contact-meta">
            <a className="link" href={LINKEDIN}>LinkedIn</a>
            <a className="link" href={GITHUB}>GitHub</a>
          </div>
          <p className="contact-status">
            <span className="lamp" aria-hidden="true" />
            Open to new missions. Remote from Paris, in French or English.
          </p>
        </div>
      </div>
    </section>
  );
}
