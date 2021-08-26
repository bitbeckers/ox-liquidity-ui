import React from "react";
import { Box } from "@chakra-ui/react";
import { useSwap } from "../../contexts/swapContext";

const QuoteBox = () => {
  const { swapQuote } = useSwap();
  console.log("SwapQuote: ", swapQuote);

  return (
    <Box bg="tomato" borderRadius={5} p={2} color="white">
      Price: {swapQuote?.price || swapQuote?.validationErrors[0]?.reason}
    </Box>
  );
};

export default QuoteBox;
