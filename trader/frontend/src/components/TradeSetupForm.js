import React, { useState } from "react";
import axios from "../services/api";

const TradeSetupForm = ({ onTradeAdded }) => {
  const [trade, setTrade] = useState({
    symbol: "",
    strategy: "",
    strike_price: "",
    delta_target: "",
    expiration_date: "",
    frequency: "daily",
    execution_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrade((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/setup-trade", trade);
      alert(response.data.message);
      onTradeAdded();
    } catch (error) {
      console.error("Error setting up trade:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Set Up Trade</h3>
      <input type="text" name="symbol" placeholder="Symbol" onChange={handleChange} />
      <input type="text" name="strategy" placeholder="Strategy" onChange={handleChange} />
      <input type="number" name="strike_price" placeholder="Strike Price" onChange={handleChange} />
      <input type="number" name="delta_target" placeholder="Delta Target" onChange={handleChange} />
      <input type="date" name="expiration_date" onChange={handleChange} />
      <select name="frequency" onChange={handleChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input type="time" name="execution_time" onChange={handleChange} />
      <button type="submit">Add Trade</button>
    </form>
  );
};

export default TradeSetupForm;
