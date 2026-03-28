export const exportCSMP = (tasks, vesselName) => {
  const headers = ["Task Name","System","Division","Start Day","Duration","End Day","Status","Priority","Crew Required","Parts (NSN)"];
  const rows = tasks.map(t => [
    `"${t.name}"`,
    t.system,
    t.division,
    t.startDay,
    t.duration,
    t.startDay + t.duration - 1,
    t.status ?? "scheduled",
    t.priority ?? "routine",
    t.requirements?.crew ?? 0,
    `"${(t.parts ?? []).map(p => `${p.name} (${p.nsn}) x${p.qty}`).join('; ')}"`,
  ]);
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CSMP_${vesselName.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
