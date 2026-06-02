export const SITE_STATS = {
  projectsDelivered:   "80+",
  fintechSystems:      "32",
  healthtechSystems:   "26",
  retailSystems:       "14",
  valueDelivered:      "$340M",
  countries:           "Global",
  industries:          "5",
  avgRoiLift:          "3.2×",
  deploymentRate:      "100%",
  enterpriseClients:   "47+",
} as const;

/** Single-line summary used across the site */
export const GLOBAL_PROOF_LINE =
  `${SITE_STATS.industries} industries · ${SITE_STATS.deploymentRate} production · globally`;

export const GLOBAL_REACH_LINE = `Deployed globally`;
