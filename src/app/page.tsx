import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { WorkspaceOverview } from "@/features/dashboard/components/workspace-overview";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <WorkspaceOverview />
      <ActivityFeed />
    </div>
  );
}
