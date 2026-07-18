import type { ReviewSource } from "@/lib/clients";

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

export const googleReviewOverrides: GoogleReviewOverride[] = [];
