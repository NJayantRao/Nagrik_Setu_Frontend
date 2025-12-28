const complaintToDepartmentMap = {
  pothole: "Roads Department",
  accident: "Traffic Department",
  electricity: "Electricity Department",
  light: "Electricity Department",
  sanitation: "Sanitation Department",
  drainage: "Sanitation Department",
  water: "Water Supply Department",
};

export function groupComplaintsByTitle(complaints) {
  const map = {};

  complaints.forEach((c) => {
    const key = c.title.toLowerCase().trim();
    map[key] = (map[key] || 0) + 1;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
}
