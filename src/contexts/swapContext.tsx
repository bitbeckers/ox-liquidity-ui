import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { SwapValues } from "../types";
import { getSwapQuote } from "../utils/0x-protocol";

type SwapContextType = {
  buyToken?: string;
  sellToken?: string;
  amount?: string;
  swapQuote?: any;
  updateSwapValues: (values: SwapValues) => void;
};

export const SwapContext = createContext<SwapContextType>({
  buyToken: undefined,
  sellToken: undefined,
  amount: undefined,
  swapQuote: undefined,
  updateSwapValues: (values: SwapValues) => {},
});

interface SwapProps {
  children: any;
}

export const SwapContextProvider: React.FC<SwapProps> = ({
  children,
}: SwapProps) => {
  const [buyToken, setBuyToken] = useState<string>();
  const [sellToken, setSellToken] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [swapQuote, setSwapQuote] = useState();

  const updateSwapValues = (values: SwapValues) => {
    const amount = ethers.utils.parseUnits(values.sellAmount, "ether").toString();
    console.log(`Amount in Wei: ${amount}`)
    setBuyToken(values.buyToken);
    setSellToken(values.sellToken);
    setAmount(amount);
  };

  useEffect(() => {
    if (buyToken && sellToken && amount) {
      const getQuote = async () => {
        console.log(`Getting quote for ${buyToken} with ${amount} ${sellToken}`);
        const quote = await getSwapQuote(buyToken, sellToken, amount);
        console.log(quote)
        setSwapQuote(quote.data);
      };

      getQuote();
    }
  }, [buyToken, sellToken, amount]);

  return (
    <SwapContext.Provider
      value={{
        buyToken,
        sellToken,
        amount,
        swapQuote,
        updateSwapValues,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const { buyToken, sellToken, amount, swapQuote, updateSwapValues } =
    useContext(SwapContext);
  return {
    buyToken,
    sellToken,
    amount,
    swapQuote,
    updateSwapValues,
  };
};
