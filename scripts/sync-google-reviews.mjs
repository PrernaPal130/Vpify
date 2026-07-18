import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourcesPath = path.join(root, "data", "google-review-sources.json");
const outputPath = path.join(root, "lib", "google-review-overrides.ts");
async function loadLocalEnv() {
  const envPath = path.join(root, ".env.local");

  try {
    const envFile = await readFile(envPath, "utf8");
    for (const line of envFile.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      if (key && !process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional. CI/Vercel can provide the key directly.
  }
}

await loadLocalEnv();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

if (!apiKey) {
  console.error("Missing GOOGLE_MAPS_API_KEY. Add it to .env.local or your shell before running this script.");
  process.exit(1);
}

const sources = JSON.parse(await readFile(sourcesPath, "utf8"));
const fields = [
  "place_id",
  "name",
  "website",
  "url",
  "rating",
  "user_ratings_total",
  "reviews"
].join(",");

function cleanReviewText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function getBestReview(reviews = []) {
  return reviews.find((review) => cleanReviewText(review.text).length > 0) || null;
}

async function fetchPlaceDetails(source) {
  if (!source.placeId) {
    console.warn(`Skipping ${source.businessName}: placeId is empty.`);
    return null;
  }

  const params = new URLSearchParams({
    place_id: source.placeId,
    fields,
    reviews_sort: "newest",
    key: apiKey
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`);
  if (!response.ok) {
    throw new Error(`Google Places request failed for ${source.businessName}: ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== "OK") {
    throw new Error(`Google Places returned ${data.status} for ${source.businessName}: ${data.error_message || "No details"}`);
  }

  const place = data.result;
  const review = getBestReview(place.reviews);

  return {
    projectId: source.projectId,
    placeId: place.place_id || source.placeId,
    websiteUrl: source.websiteUrl || place.website || "",
    googleBusinessUrl: place.url || `https://www.google.com/maps/place/?q=place_id:${source.placeId}`,
    googleReviewUrl: place.url || `https://www.google.com/maps/place/?q=place_id:${source.placeId}`,
    reviewSource: "Google Reviews",
    rating: Number(place.rating || 0),
    reviewCount: Number(place.user_ratings_total || 0),
    review: review
      ? cleanReviewText(review.text)
      : "Google review data synced. A written review will appear here when available.",
    reviewerName: review?.author_name || "Google reviewer",
    reviewerRole: "Verified Google Review",
    syncedAt: new Date().toISOString()
  };
}

const overrides = [];

for (const source of sources) {
  const override = await fetchPlaceDetails(source);
  if (override) overrides.push(override);
}

const file = `import type { ReviewSource } from "@/lib/clients";

export type GoogleReviewOverride = {
  projectId: number;
  placeId: string;
  websiteUrl?: string;
  googleBusinessUrl?: string;
  googleReviewUrl?: string;
  reviewSource: ReviewSource;
  rating: number;
  reviewCount: number;
  review: string;
  reviewerName: string;
  reviewerRole: string;
  syncedAt: string;
};

export const googleReviewOverrides: GoogleReviewOverride[] = ${JSON.stringify(overrides, null, 2)};
`;

await writeFile(outputPath, file, "utf8");
console.log(`Synced ${overrides.length} Google review profile${overrides.length === 1 ? "" : "s"} into ${path.relative(root, outputPath)}.`);
