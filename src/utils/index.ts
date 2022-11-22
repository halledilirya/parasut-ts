export const getFilterParam = (filter: any): string => {
  return filter
    ? Object.entries(filter)
        .map(([key, value]) => `filter[${key}]=${value}`)
        .join("&")
    : "";
};
