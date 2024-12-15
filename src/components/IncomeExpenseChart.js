import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = ({ filteredTransactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      return;
    }

    const categories = [
      ...new Set(
        filteredTransactions.map((transaction) => transaction.category)
      ),
    ];
    let incomeData = Array(categories.length).fill(0);
    let expenseData = Array(categories.length).fill(0);

    filteredTransactions.forEach((transaction) => {
      const categoryIndex = categories.indexOf(transaction.category);
      if (categoryIndex !== -1) {
        if (transaction.type === "income") {
          incomeData[categoryIndex] += transaction.amount;
        } else {
          expenseData[categoryIndex] += transaction.amount;
        }
      }
    });

    // Set the chart data state
    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Income", // Label for the income data
          data: incomeData,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          borderWidth: 2,
        },
        {
          label: "Expense", // Label for the expense data
          data: expenseData,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          borderWidth: 2,
        },
      ],
    });
  }, [filteredTransactions]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income vs. Expense Chart",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Income vs. Expense Chart</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;
