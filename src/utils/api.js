import axios from "axios";

// API kalitini bu yerga qo'yish kerak
const API_KEY = "d3c3dd33f293f3e1184e9afd";

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );
    return response.data.conversion_rates;
  } catch (error) {
    console.error("API so'rovi xatoligi", error);
    return {};
  }
};
