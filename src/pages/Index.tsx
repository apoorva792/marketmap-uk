import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import WhoIsLyzrSection from "@/components/WhoIsLyzrSection";
import GomlSection from "@/components/GomlSection";
import StartingPointSection from "@/components/StartingPointSection";
import TheListSection from "@/components/TheListSection";
import TagRecognitionBanner from "@/components/TagRecognitionBanner";
import FindCompanyPopup from "@/components/FindCompanyPopup";
import { companies, getFilteredCompanies } from "@/data/companies";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("A–Z");

  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [verticalFilter, setVerticalFilter] = useState("All");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Read tag from URL on mount
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      const tags = tagParam.split(",").map((t) => t.replace(/-/g, " "));
      setTagFilter(tags);
    }
  }, []);

  // Sync tag filter to URL
  useEffect(() => {
    if (tagFilter.length > 0) {
      const tagParam = tagFilter.map((t) => t.replace(/\s+/g, "-")).join(",");
      setSearchParams({ tag: tagParam }, { replace: true });
    } else {
      if (searchParams.has("tag")) {
        searchParams.delete("tag");
        setSearchParams(searchParams, { replace: true });
      }
    }
  }, [tagFilter]);

  const urlTagName = searchParams.get("tag")
    ? searchParams.get("tag")!.split(",").map((t) => t.replace(/-/g, " ")).join(", ")
    : null;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setHasInteracted(true);
  };

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setHasInteracted(true);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setHasInteracted(true);
  };

  const handleRegionFilterChange = (regions: string[]) => {
    setRegionFilter(regions);
    setHasInteracted(true);
  };

  const handleTagFilterChange = (tags: string[]) => {
    setTagFilter(tags);
    setHasInteracted(true);
  };

  const handleVerticalFilterChange = (vertical: string) => {
    setVerticalFilter(vertical);
    setHasInteracted(true);
  };

  const filtered = useMemo(() => {
    const result = getFilteredCompanies(companies, search, activeFilter, sort, "All", regionFilter, tagFilter);
    return verticalFilter === "All" ? result : result.filter((c) => c.vertical === verticalFilter);
  }, [search, activeFilter, sort, regionFilter, tagFilter, verticalFilter]);

  return (
    <PageWrapper>
      {urlTagName && !bannerDismissed && (
        <TagRecognitionBanner tagName={urlTagName} onDismiss={() => setBannerDismissed(true)} />
      )}
      <HeroSection />
      <MethodologySection />
      <WhoIsLyzrSection />
      <GomlSection />
      <StartingPointSection />
      <TheListSection
        search={search}
        onSearchChange={handleSearchChange}
        filtered={filtered}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        sort={sort}
        onSortChange={handleSortChange}
        regionFilter={regionFilter}
        onRegionFilterChange={handleRegionFilterChange}
        tagFilter={tagFilter}
        onTagFilterChange={handleTagFilterChange}
        verticalFilter={verticalFilter}
        onVerticalFilterChange={handleVerticalFilterChange}
      />

      <FindCompanyPopup hasInteracted={hasInteracted} />
    </PageWrapper>
  );
};

export default Index;
