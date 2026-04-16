import { profile } from "../../data/projects";
import LazyMedia from "../common/LazyMedia";

function ProfileHeader() {
  return (
    <section className="glass-panel mb-6 rounded-[32px] p-4 md:p-6">
      <div className="mb-5 flex items-start gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 blur-md" />
          <LazyMedia
            src={profile.avatar}
            alt={profile.name}
            className="relative h-20 w-20 rounded-full border border-white/10 md:h-24 md:w-24"
          />
        </div>

        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold">{profile.name}</h2>
          <p className="mt-2 text-sm font-medium text-cyan-200">{profile.tagline}</p>
          {profile.handle ? (
            <p className="mt-2 text-sm font-medium text-cyan-200">{profile.handle}</p>
          ) : null}
          <p className="mt-2 text-sm text-white/85">{profile.role}</p>
          <p className="mt-2 text-sm text-muted">{profile.bio}</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
