import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function AdminChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Sales",
            data: [12000, 19000, 15000, 22000, 17000, 24000],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default AdminChart;
