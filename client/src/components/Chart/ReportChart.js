import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState, useRef } from "react";
import { apiBaseUrl } from "../../api";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportChart = ({ token }) => {
    const options = {};
    const [monthly, setMonthly] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Total Income",
                data: [],
                backgroundColor:
                    "linear-gradient(to bottom, #44bbfe, #1e78fe);",
                borderColor: "black",
                borderWidth: 1,
            },
            {
                label: "Expense",
                data: [],
                backgroundColor: "orange",
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            },
        ],
    });

    useEffect(() => {
        fetch(`${apiBaseUrl}/users/all-transactions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                setMonthly(response.result.monthlyTransaction);
            });
    }, [token]);

    useEffect(() => {
        function changeData() {
            setData({
                labels: monthly?.map((transaction) => `${transaction.month}`),
                datasets: [
                    {
                        label: "Income",
                        data: monthly?.map(
                            (transaction) => transaction.monthlyIncome
                        ),
                        backgroundColor: (context) => {
                            const chart = context.chart;
                            const { ctx, chartArea } = chart;
                            if (!chartArea) {
                                return null;
                            }
                            return gradientBlue(chart);
                        },
                        borderColor: "black",
                        borderRadius: "10px",
                        borderWidth: 0,
                        borderRadius: 10,
                        borderSkipped: false,
                    },
                    {
                        label: "Total Expense",
                        data: monthly?.map(
                            (transaction) => transaction.monthlyExpense
                        ),
                        backgroundColor: (context) => {
                            const chart = context.chart;
                            const { ctx, chartArea } = chart;
                            if (!chartArea) {
                                return null;
                            }
                            return gradientYellow(chart);
                        },
                        borderColor: "black",
                        borderWidth: 0,
                        borderRadius: 10,
                        borderSkipped: false,
                    },
                ],
            });
        }
        changeData();
    }, [monthly]);

    // ====== linear-gradient function =====
    function gradientBlue(chart) {
        const {
            ctx,
            chartArea: { top, bottom, left, right },
            scales: { x, y },
        } = chart;
        const gradientSegment = ctx.createLinearGradient(0, bottom, 0, top);
        gradientSegment.addColorStop(0, "#44BBFE");
        gradientSegment.addColorStop(0, "#44BBFE");
        gradientSegment.addColorStop(1, "#1E78FE");
        gradientSegment.addColorStop(1, "#1E78FE");
        return gradientSegment;
    }
    function gradientYellow(chart) {
        const {
            ctx,
            chartArea: { top, bottom, left, right },
            scales: { x, y },
        } = chart;
        const gradientSegment = ctx.createLinearGradient(0, bottom, 0, top);
        gradientSegment.addColorStop(0, "#FFCF53");
        gradientSegment.addColorStop(0, "#FFCF53");
        gradientSegment.addColorStop(1, "#FF9900");
        gradientSegment.addColorStop(1, "#FF9900");
        return gradientSegment;
    }

    return (
        <div>
            <Bar data={data} options={options}></Bar>
        </div>
    );
};

export default ReportChart;
