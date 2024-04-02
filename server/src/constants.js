export const DB_NAME = "project1";

export const GenderEnum = {
  Male: "Male",
  Female: "Female",
  Genderqueer: "Genderqueer",
  Bigender: "Bigender",
  Agender: "Agender",
  Polygender: "Polygender",
  Genderfluid: "Genderfluid",
  "Non-binary": "Non-binary",
};

export const DomainEnum = {
  IT: "IT",
  Management: "Management",
  Sales: "Sales",
  "Business Development": "Business Development",
  "UI Designing": "UI Designing",
  Finance: "Finance",
  Marketing: "Marketing",
};

export const AvailableGenders = Object.values(GenderEnum);

export const AvailableDomains = Object.values(DomainEnum);
