import { useState } from "react";
import { Handshake, ArrowRight } from "lucide-react";
import LeadFormDialog from "./LeadFormDialog";

const BecomePartnerSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="become-a-partner"
      className="px-4 sm:px-6 py-14 sm:py-20"
      style={{ scrollMarginTop: 120 }}
    >
      <div
        className="max-w-3xl mx-auto text-center rounded-3xl px-6 sm:px-12 py-12 sm:py-16"
        style={{
          background: "#6B4C4C",
          boxShadow: "0 20px 60px rgba(42, 26, 24, 0.25)",
        }}
      >
        <div
          className="inline-flex items-center justify-center mb-5 rounded-full"
          style={{ width: 52, height: 52, background: "rgba(243, 239, 234, 0.1)" }}
        >
          <Handshake size={24} color="#F2EDE8" />
        </div>

        <h2
          className="font-bold mb-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 30,
            lineHeight: 1.15,
            color: "#F2EDE8",
            letterSpacing: "-0.01em",
          }}
        >
          Become a Lyzr Partner
        </h2>
        <p
          className="mx-auto mb-8"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(243, 239, 234, 0.7)",
            maxWidth: 460,
          }}
        >
          Join the firms shaping enterprise AI delivery. Tell us about your
          practice and our team will get back to you within 48 hours.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all hover:opacity-90"
          style={{
            background: "#F2EDE8",
            color: "#6B4C4C",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
          }}
        >
          Apply now <ArrowRight size={16} />
        </button>
      </div>

      <LeadFormDialog
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Become a Partner"
        title="Partner with Lyzr"
        description="Tell us about your firm and our partnerships team will be in touch within 48 hours."
        submitLabel="Apply now"
        logSource="Become a Partner"
      />
    </section>
  );
};

export default BecomePartnerSection;
