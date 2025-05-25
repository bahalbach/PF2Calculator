import { useCallback } from "react";
import { useGenerateGraphData } from "../Display/useGenerateGraphs";
import { graphTypes } from "../Model/types";

const useExportCsv = () => {
  const { byLeveldatasets } = useGenerateGraphData(graphTypes.DISTRIBUTION);
  // const routineDescriptions = useAppSelector(selectRoutineDescriptions);
  return useCallback(() => {
    const rows: string[] = [];
    // make header row
    const headerRow = Array.from({ length: 21 }, (_, i) => `${i}`);
    headerRow[0] = "Name";
    rows.push(headerRow.join(","));
    byLeveldatasets.forEach((dataset) => {
      const row: string[] = Array.from({ length: 21 }, () => "");
      const { name, x, y } = dataset;
      row[0] = name;
      for (let i = 0; i < x.length; i++) {
        row[x[i]] = `${y[i].toFixed(3)}`; // Format to 3 decimal place
      }
      rows.push(row.join(","));
    });
    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "routines.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link); // Clean up
  }, [byLeveldatasets]);
};

export default useExportCsv;
