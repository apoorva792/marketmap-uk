import lyzrLogo from "@/assets/lyzr-logo-official.webp";

const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center" style={{ borderTop: "1px solid rgba(74,47,45,0.06)" }}>
      <img src={lyzrLogo} alt="Lyzr" className="h-6 mx-auto mb-3 opacity-60" />
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: "#8A6060",
      }}>
        © {new Date().getFullYear()} Lyzr AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
