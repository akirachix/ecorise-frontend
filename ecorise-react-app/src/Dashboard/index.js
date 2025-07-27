
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Sidebar from '../shared-components/SideBar';
import { FaUsers, FaTshirt, FaStar, FaPray, FaTruckPickup, FaMonero } from "react-icons/fa";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { usePickups, useMarkets, useRewards, useProducts, useUsers, usePayment } from "../hooks/ecoriseUseData";

function Dashboard() {
  const navigate = useNavigate();
 
  const {data:rewards ,loading:rewardsLoading} = useRewards;
  const { data: pickups  , loading: pickupsLoading } = usePickups();
  const { data: products, loading: productsLoading } = useProducts();
  const { data: payment , loading: paymentsLoading } = usePayment();
  const { data: users , loading, error } = useUsers() || {};

  if (loading || pickupsLoading || productsLoading || paymentsLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading traders: {error}</p>;

  
  const totalMaterialPickups = pickups.length;
  const pendingPickups = pickups.filter(pickup => pickup.pickup_status === "Pending");
  const pendingPickupCount = pendingPickups.length;
  const availableProduct = products.length;
  const totalAmountPaid = payment.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const totalPointsAwarded = payment.reduce((sum, p) => sum + (Number(p.points_award) || 0), 0);
  const totalTraders = users?.length || 0;

 const totalRecycledClothes = products.reduce(
  (sum, product) => sum + product.quantity,
  0
);
const totalMaterial = pickups.reduce((sum, pickup) => {
  const product = products.find(p => p.product_id === pickup.material);
  return sum + (product?.quantity || 0);
}, 0);


const recycledPercentage = totalMaterial > 0
  ? Math.min(100, Math.round((totalRecycledClothes / totalMaterialPickups) * 100))
  : 0;

  const locationCounts = {};
  pickups.forEach(pickup => {
    const location = pickup.market_location;
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });
  const totalRequests = pickups.length;
  const marketRequests = Object.entries(locationCounts).map(([name, requests]) => ({
    name,
    percent: totalRequests ? ((requests / totalRequests) * 100).toFixed(2) : 0
  }));

  
  const statistics = [
    {
      icon: <FaUsers size={40} />,
      label: "Total traders",
      value: totalTraders,
      color: "#8B0000",
      route: "/trader",
    },
    {
      icon: <FaTshirt size={40} />,
      label: "Total collected materials",
      value: totalMaterialPickups,
      color: "#8B0000",
      route: "/materials",
    },
    {
      icon: <FaStar size={40} />,
      label: "Points awarded",
      value: totalPointsAwarded,
      color: "#8B0000",
      route: "/points",
    },
  ];
  const cards = [
    {
      icon: <FaPray size={40} />,
      label: "Available product reward",
      value: availableProduct,
      color: "#8B0000",
      route: "/Reward",
    },
    {
      icon: <FaTruckPickup size={40} />,
      label: "Pending pickup requests",
      value: pendingPickupCount,
      color: "#8B0000",
      route: "/Requests",
    },
    {
      icon: <FaMonero size={40} />,
      label: "Total amount paid",
      value: totalAmountPaid,
      color: "#8B0000",
      route: "payments"
    },
  ];

  
  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const currentYear = new Date().getFullYear();
  const allMonthKeys = allMonths.map(m => `${currentYear} ${m}`);

  
  const monthlyPaid = {};
  payment.forEach(p => {
    if (!p.paid_at) return;
    const date = new Date(p.paid_at);
    if (isNaN(date)) return;
    const monthKey = format(date, "yyyy MMM");
    monthlyPaid[monthKey] = (monthlyPaid[monthKey] || 0) + Number(p.amount) || 0;
  });

  
  const monthlyPrice = {};
  products.forEach(product => {
    if (!product.listed_at) return;
    const date = new Date(product.listed_at);
    if (isNaN(date)) return;
    const monthKey = format(date, "yyyy MMM");
    monthlyPrice[monthKey] = (monthlyPrice[monthKey] || 0) + Number(product.price) || 0;
  });

  
  const chartData = allMonthKeys.map(monthKey => ({
    month: monthKey.slice(5), 
    paid: monthlyPaid[monthKey] || 0,
    price: monthlyPrice[monthKey] || 0,
  }));


  const maxYValue = Math.max(...chartData.flatMap(d => [d.paid, d.price]), 0);
  const yAxisStep = 5000;
  const yAxisMax = Math.max(yAxisStep, Math.ceil(maxYValue / yAxisStep) * yAxisStep);
  const yLabels = [];
  for (let y = yAxisMax; y >= 0; y -= yAxisStep) {
    yLabels.push(y);
  }

  return (
    <div className="nav">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="title">ECORISE</h1>
        </div>
        <div className="dashboard-stats">
          {statistics.map((stat, idx) => (
            <div className="dashboard-stat-card" key={idx}
              tabIndex={0}
              role="button"
              onClick={() => navigate(stat.route)}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
          <div className="dashboard-gauge">
            <h3>Recycled Clothes</h3>
            <CircularProgressbar
              value={recycledPercentage}
              text={`${recycledPercentage}%`}
              styles={buildStyles({
                textColor: '#8B0000',
                pathColor: '#DA6304',
                trailColor: '#f0f0f0',
                textSize: '1.4rem',
                strokeLinecap: 'round'
              })}
            />
          </div>
        </div>
        <div className="dashboard-stats">
          {cards.map((card, idx) => (
            <div className="stat-card" key={idx}
              role="button"
              onClick={() => navigate(card.route)}>
              <div className="stat-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value">{card.value}</div>
                <div className="stat-label">{card.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard-content">
          <div className="chart">
            <div className="chart-body">
              <div className="money">
                <h3>Money Spent</h3>
              </div>
              <div className="y-axis">
                <span className="y-arrow" />
              </div>
              <div className="chart-y-axis">
                {yLabels.map((label, idx) => (
                  <div className="chart-y-label" key={idx}>{label}</div>
                ))}
              </div>
              <div className="bars">
                {chartData.map((data, idx) => (
                  <div className="chart-bar" key={idx}>
                    <div className="chart-bar-pair">
                      
                      <div
                        className="chart-reward"
                        style={{
                          height: yAxisMax ? `${(data.price / yAxisMax) * 200}px` : 0,
                          background: " #Da6304",
                          width: 15,
                          marginRight: 2,
                          borderRadius: 3,
                        }}
                        title={`Product Price: ${data.price}`}
                      />
                      
                      <div
                        className="chart-materials"
                        style={{
                          height: yAxisMax ? `${(data.paid / yAxisMax) * 200}px` : 0,
                          background: "#a50922",
                          width: 15,
                          borderRadius: 3,
                        }}
                        title={`Payment: ${data.paid}`}
                      />
                    </div>
                    <div className="chart-label">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot rewards-dot"></span> Products
              </div>
              <div className="legend-item">
                <span className="legend-dot materials-dot"></span> Materials
              </div>
            </div>
            <div className="x-axis">
              <span className="x-arrow" />
            </div>
          </div>
          <div className="dashboard-market">
            <h3 className="market-title">Market Request percentage</h3>
            <div className="market-list">
              {marketRequests.map((market, idx) => (
                <div className="market-row" key={idx}>
                  <span className="market-name">{market.name}</span>
                  <div className="market-bar-container">
                    <div
                      className="market-bar"
                      style={{ width: `${market.percent}%` }}
                    />
                  </div>
                  <span className="market-percent">{market.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;











