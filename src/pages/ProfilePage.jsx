import PageTransition from "../components/common/PageTransition";
import HighlightsRow from "../components/profile/HighlightsRow";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProjectGrid from "../components/profile/ProjectGrid";
import { usePortfolioStore } from "../store/usePortfolioStore";

function ProfilePage() {
  const projects = usePortfolioStore((state) => state.projects);

  return (
    <PageTransition>
      <ProfileHeader />
      <HighlightsRow />
      <ProjectGrid projects={projects} />
    </PageTransition>
  );
}

export default ProfilePage;
