import axios from "axios";
import { SwapValues } from "../types";

const url: string = "https://api.0x.org/swap/v1/quote";

const headers = {
  "Content-Type": "application/json;charset=utf-8",
};

//TODO validate request e.g. buy-sell not identical
//TODO prettier error handling insufficient liquidity
const getSwapQuote = async (
  buyToken: string,
  sellToken: string,
  sellAmount: string
) => {
  const params: SwapValues = {
    buyToken,
    sellToken,
    sellAmount,
  };

  const swapQuote = await axios
    .get(url, {
      timeout: 2000,
      headers,
      params,
    })
    .then((response: any) => {
      console.log("Response: ", response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response
      }
    });

  return swapQuote;
};

export { getSwapQuote };
