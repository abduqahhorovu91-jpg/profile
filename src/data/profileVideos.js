const instagramCoverModules = import.meta.glob("../../png/isnta*.png", {
  eager: true,
  import: "default",
});

const instagramReels = [
  "https://www.instagram.com/reel/DVjQivbirf4/?igsh=MXgxdGZucGJ2ODZ6MQ==",
  "https://www.instagram.com/reel/DUdR2ueCmAc/?igsh=bmd1MTk2azk4dTBk",
  "https://www.instagram.com/reel/DUQk-N5ClFH/?igsh=ank5a2FjeHBhM3U=",
  "https://www.instagram.com/reel/DUJbn64jjRM/?igsh=MWE3OTNtY2d6b2J4ag==",
  "https://www.instagram.com/reel/DTZ-BI-Cngk/?igsh=MTExaHhkMmM2YnppYw==",
  "https://www.instagram.com/reel/DTZ7xnfCjFx/?igsh=enVwajdvbnlkYWJs",
  "https://www.instagram.com/reel/DMsBmlAKxxt/?igsh=ZmFzOHVwcmFnMmt6",
  "https://www.instagram.com/race.x299/reel/DIg6aU8i7AR/",
  "https://www.instagram.com/race.x299/reel/DUOQZnKikGZ/",
];

const sortedCoverEntries = Object.entries(instagramCoverModules).sort(([left], [right]) =>
  left.localeCompare(right, undefined, { numeric: true }),
);

const formatViews = (value) => {
  if (value >= 10000) {
    const compact = (value / 1000).toFixed(1).replace(".", ",");
    return `${compact}k`;
  }

  return `${value}`;
};

const remoteVideos = instagramReels.map((href, index) => ({
  id: `reel-${index + 1}`,
  kind: "instagram",
  href,
  cover: sortedCoverEntries[index]?.[1] || "",
  alt: `Instagram reel ${index + 1}`,
  views: formatViews([116, 171, 376, 286, 320, 205, 562][index] ?? 100 + index * 90),
}));

export const profileVideos = remoteVideos;
