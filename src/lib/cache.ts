export const cacheProfiles = {
  dashboard: "minutes",
} as const;

export const dashboardTag = (userId: string) => `dashboard:${userId}`;
export const orgTag = (orgId: string) => `org:${orgId}`;
