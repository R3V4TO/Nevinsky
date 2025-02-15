import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function EnergyChart({ data }) {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (!data.length) return;

    // Aggregate data by week
    const weeklyAggregation = {};
    data.forEach((entry) => {
      const week = new Date(entry.timestamp).toLocaleDateString("en-US", {
        week: "numeric",
        year: "numeric",
      });

      if (!weeklyAggregation[week]) {
        weeklyAggregation[week] = { total: 0, count: 0 };
      }

      weeklyAggregation[week].total += entry.energyUsage;
      weeklyAggregation[week].count++;
    });

    // Format data for the graph
    const formattedData = Object.keys(weeklyAggregation).map((week) => ({
      week,
      avgUsage: weeklyAggregation[week].total / weeklyAggregation[week].count,
    }));

    setWeeklyData(formattedData);
  }, [data]);

  return (
    <Line
      data={{
        labels: weeklyData.map((d) => `Week ${d.week}`),
        datasets: [
          {
            label: "Avg Energy Usage (kWh)",
            data: weeklyData.map((d) => d.avgUsage),
            borderColor: "blue",
            fill: false,
          },
        ],
      }}
    />
  );
}
