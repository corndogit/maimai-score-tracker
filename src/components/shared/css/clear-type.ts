export const getClearTypeCssClass = (clearType: string): string =>
  `clear-type-display-${clearType
    .toLowerCase()
    .replace(" ", "-")
    .replace("+", "-plus")}`;
