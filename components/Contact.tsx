import CopyEmail from "@/components/CopyEmail";
import { EMAIL, GITHUB, LINKEDIN } from "@/lib/data";

const BARS = Array.from({ length: 32 }, (_, i) => i);

export default function Contact() {
  return (
    <div className="contact">
      <div className="comms-main">
        <div className="signal" aria-hidden="true">
          {BARS.map((i) => (
            <i key={i} style={{ animationDelay: `${(i * 137) % 900}ms` }} />
          ))}
        </div>
        <p className="contact-lead">Tell me what you&apos;re building.</p>
        <p className="contact-copy">
          A few lines are enough: what exists today, what should exist, and by when. I usually answer within a day.
        </p>
        <div className="channel">
          <span className="channel-label">Channel</span>
          <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="email-row">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Transmit by email</a>
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
        <div>
          <h3>Relays</h3>
          <div className="contact-meta">
            <a className="link" href={LINKEDIN}>LinkedIn</a>
            <a className="link" href={GITHUB}>GitHub</a>
          </div>
        </div>
        <p className="contact-status">
          <span className="lamp" aria-hidden="true" />
          Open to new missions. Remote from Paris, in French or English.
        </p>
        <p className="fine-print">
          © {new Date().getFullYear()} Maxence Leguéry. A static Next.js export, served by nginx from a VPS I run.
        </p>
      </div>
    </div>
  );
}
