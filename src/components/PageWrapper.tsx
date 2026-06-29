import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";
import BecomePartnerButton from "./BecomePartnerButton";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const topOffset = bannerVisible ? 40 : 0;

  return (
    <div className="grain-overlay min-h-screen relative">
      <div className="blob-top-right" />
      <div className="blob-bottom-left" />
      <div className="relative z-10">
        <AnnouncementBanner onDismiss={() => setBannerVisible(false)} />
        <Navbar topOffset={topOffset} />
        <div style={{ paddingTop: topOffset + 64 }}>{children}</div>
        <Footer />
      </div>
      <BecomePartnerButton />
    </div>
  );
};

export default PageWrapper;
