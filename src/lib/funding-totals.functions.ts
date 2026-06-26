import { createServerFn } from "@tanstack/react-start";
import { fetchBackabuddyStats } from "./backabuddy.functions";
import { getContributionTotals } from "./contributions.functions";

export type CombinedFundingStats = {
  /** Combined total raised, in rands: Back a Buddy raised + verified EFT contributions. */
  totalRaised: number;
  /** Overall campaign target, in rands (currently sourced from the Back a Buddy target). */
  target: number;
  /** Back a Buddy raised amount alone, in rands. */
  babRaised: number;
  babDonors: number;
  /** Verified direct EFT contributions, in cents. */
  eftVerifiedCents: number;
  /** All logged EFT contributions (verified + unverified), in cents. */
  eftCommittedCents: number;
  fetchedAt: string;
  source: "live" | "cache" | "fallback";
};

export const getCombinedFundingStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<CombinedFundingStats> => {
    const [bab, eft] = await Promise.all([
      fetchBackabuddyStats(),
      getContributionTotals(),
    ]);

    const eftVerifiedRands = eft.verified_cents / 100;

    return {
      totalRaised: bab.raised + eftVerifiedRands,
      target: bab.target,
      babRaised: bab.raised,
      babDonors: bab.donors,
      eftVerifiedCents: eft.verified_cents,
      eftCommittedCents: eft.committed_cents,
      fetchedAt: bab.fetchedAt,
      source: bab.source,
    };
  },
);
