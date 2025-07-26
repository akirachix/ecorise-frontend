import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Sidebar from '../shared-components/SideBar';
import { FaUsers, FaTshirt, FaStar, FaProductHunt, FaPray, FaTruckPickup, FaMoneyBill, FaMonero } from "react-icons/fa";
import "./style.css";
import { DiResponsive } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { usePickups, useMarkets, useRewards, useProducts,useUsers,usePayment } from "../Hook/ecoriseUseData";

function Dashboard() {
  const navigate = useNavigate();
  const recycledPercentage = 70;

  const { data: pickups = [], loading: pickupsLoading } = usePickups();
  const { data: markets = [], loading: marketsLoading } = useMarkets();
  const { data: rewards = [], loading: rewardsLoading } = useRewards();
  const { data: products = [], loading: productsLoading } = useProducts();
  const { data: payment = [], loading: paymentsLoading } = usePayment();
  console.log('Dashboard paymentsLoading:', paymentsLoading, 'payment:', payment);


const pickupCounts = pickups.reduce((acc, pickup) => {
  const id = pickup.material_id;
  acc[id] = (acc[id] || 0) + 1;
  return acc;
}, {});
const totalMaterialPickups = pickups.length;
const pendingPickups = pickups.filter(pickup => pickup.pickup_status === "Pending");
const pendingPickupCount = pendingPickups.length;

const availableProduct = products.length

const totalAmountPaid = payment.reduce(
  (sum, p) => sum + (Number(p.amount) || 0),
  0
);

const totalPointsAwarded = payment.reduce(
  (sum, p) => sum + (Number(p.points_award) || 0),
  0
);
console.log(totalAmountPaid); 
console.log(totalPointsAwarded)


const materialMonthlyTotals = {};
payment.forEach(p => {
  const date = new Date(p.paid_at);
  const month = format(date, "MMM");
  if (!materialMonthlyTotals[month]) materialMonthlyTotals[month] = 0;
  materialMonthlyTotals[month] += Number(p.amount) || 0;
});

const rewardMonthlyTotals = {};
products.forEach(product => {
  const date = new Date(product.listed_at); 
  const month = format(date, "MMM");
  if (!rewardMonthlyTotals[month]) rewardMonthlyTotals[month] = 0;
  rewardMonthlyTotals[month] += Number(product.price) || 0;
});

const allMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"
];

const chartData = allMonths.map(month => ({
  month,
  material: materialMonthlyTotals[month] || 0,
  reward: rewardMonthlyTotals[month] || 0
}));



const maxPayment = Math.max(...chartData.map(d => d.totalPayment), 1);
const maxPoints = Math.max(...chartData.map(d => d.totalPoints), 1);

const cards = [
   {
    icon: <FaPray size={40} />,
    label: "Available product reward",
    value: availableProduct,
    color: "#8B0000",
    route:"/Reward",
  },
  {
    icon: <FaTruckPickup size={40} />,
    label: "Pending pickup requests",
    value: pendingPickupCount,
    color: "#8B0000",
    route:"/Requests",
  },
  {
    icon: <FaMonero size={40} />,
    label: "Total amount paid",
    value: totalAmountPaid,
    color: "#8B0000",
    route:"payments"
  },
]
const locationCounts = {};
pickups.forEach(pickup => {
  const location = pickup.market_location ;
  locationCounts[location] = (locationCounts[location] || 0) + 1;
});

const totalRequests = pickups.length;

const marketRequests = Object.entries(locationCounts).map(([name, requests]) => ({
  name,
  percent: totalRequests ? ((requests / totalRequests) * 100).toFixed(2) : 0
}));
const sortedByRequests = [marketRequests].sort((a, b) => b.requests - a.requests);
const highest = sortedByRequests[0];
const lowest = sortedByRequests[sortedByRequests.length - 1];

console.log(marketRequests);
console.log('Highest:', highest);
console.log('Lowest:', lowest);

const {data:users = [],loading,error} = useUsers() || {};
console.log('users:',users)
if(loading) return <p>Loading traders...</p>;
if(error) return <p>Error loading traders:{error}</p>;
const totalTraders = users?.length
const statistics = [
  {
    icon: <FaUsers size={40} />,
    label: "Total traders",
    value: totalTraders,
    color: "#8B0000",
    route:"/trader",
  },
  {
    icon: <FaTshirt size={40} />,
    label: "Total collected materials",
    value: totalMaterialPickups,
    color: "#8B0000",
    route:"/materials",
  },
  {
    icon: <FaStar size={40} />,
    label: "Points awarded",
    value: totalPointsAwarded,
    color: "#8B0000",
    route:"/points",
  },
];




  return (
    <div className="nav">
      <Sidebar/>
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="title">ECORISE</h1>
        
        </div>

        <div className="dashboard-stats">
          
          {statistics.map((stat, idx) => (
            <div className="dashboard-stat-card" key={idx}
              tableindex ={0}
              role = "button"
              onClick = {()=> navigate(stat.route)}>
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
              role = "button"
              onClick = {()=> navigate(card.route)}>
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
       <div 
      className="chart-y-label">35000</div>
       <div 
      className="chart-y-label">30000</div>
       <div 
      className="chart-y-label">25000</div>
      <div 
      className="chart-y-label">20000</div>
      <div 
      className="chart-y-label">15000</div>
      <div className="chart-y-label">10000</div>
      <div className="chart-y-label">5000</div>
      <div className="chart-y-label">0</div>
    </div> 
  
    <div className="bars">
  {chartData.map((data, idx) => (
    <div className="chart-bar" key={idx}>
      <div className="chart-bar-pair">
        <div
          className="chart-reward"
          style={{ height: `${(data.totalPoints / maxPoints) * 100}%` }}
          title={`Points: ${data.totalPoints}`}
        />
        <div
          className="chart-materials"
          style={{ height: `${(data.totalPayment / maxPayment) * 100}%` }}
          title={`Payment: ${data.totalPayment}`}
        />
      </div>
      <div className="chart-label">{data.month}</div>
    </div>
  ))}
</div>
  </div>
  <div className="chart-legend">
    <div className="legend-item">
      <span className="legend-dot rewards-dot"></span> Rewards
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















