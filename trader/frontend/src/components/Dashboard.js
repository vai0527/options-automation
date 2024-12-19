import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import TradeSetupForm from "./TradeSetupForm";


const Dashboard = () => {
  const [trades, setTrades] = useState([]);
  const [accounts, getAccounts ] = useState([]);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('/accounts');
      console.log("Fetched accounts:", response.data); // Debug: Log fetched data
      getAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error.response?.data || error.message);
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await axios.get("/fetch-trades");
      setTrades(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTrades();
    fetchAccounts();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("remember_token");
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Failed to log out.");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TradeSetupForm onTradeAdded={fetchTrades} />
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.symbol} - {trade.strategy} - {trade.execution_time}
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Account number</th>
            <th>External ID</th>
            <th>Nickname</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key = {account['account-number']}>
              <td>{account['account-number']}</td>
              <td>{account['external-id']}</td>
              <td>{account['nickname']}</td>
              <td>{account['account-type-name']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
