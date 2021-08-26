import React, { useState } from "react";
import { useEffect } from "react";
import { useSwap } from "../../contexts/swapContext";

import { Formik, Form } from "formik";
import { ValidAmount } from "../../utils/validation";
import {
  Button,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Spacer,
  FormLabel,
  Container,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { SwapValues } from "../../types";

export interface SwapFormProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

//TODO use state to default form values
//TODO generate dropdown programmatically from list of tokens
const SwapForm: React.FC<SwapFormProps> = () => {
  const { updateSwapValues } = useSwap();

  const onFormSubmit = async (values: SwapValues) => {
    console.log(
      `Swapping ${values.buyToken} for ${values.sellAmount} ${values.sellToken}`
    );
    updateSwapValues(values);
  };

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{ buyToken: "", sellToken: "", sellAmount: "" }}
        validationSchema={ValidAmount}
        onSubmit={async (values: SwapValues, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            onFormSubmit(values);
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <FormControl id="swapForm" isRequired>
              <HStack>
                <FormLabel>Swap</FormLabel>
                <Spacer />
              </HStack>
              <HStack>
                <NumberInput
                  value={values.sellAmount}
                  textColor="white"
                  placeholder="Amount"
                  precision={4}
                  variant="outline"
                  width="80%"
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue("sellAmount", e);
                  }}
                  onBlur={handleBlur}
                  min={0}
                >
                  <NumberInputField name="sellAmount" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Select
                  placeholder="Select token to sell"
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue("sellToken", e.target.value);
                  }}
                >
                  <option value="ETH">Ether</option>
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                  <option value="0xCFB3467Fc2B5964edaf4d1f646FD756762B4AD10">DeFi Value Index</option>
                  <option value="0x70E685840FE73c78a759F1A5ED69B7d9845272Cd">Coinbase Ventures Index</option>

                </Select>
              </HStack>
              <InputGroup marginBottom="5px">
                <Select
                  placeholder="Select token to buy"
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue("buyToken", e.target.value);
                  }}
                >
                  <option value="ETH">Ether</option>
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                  <option value="0xCFB3467Fc2B5964edaf4d1f646FD756762B4AD10">DeFi Value Index</option>
                  <option value="0x70E685840FE73c78a759F1A5ED69B7d9845272Cd">Coinbase Ventures Index</option>
                </Select>
              </InputGroup>

              {touched.sellAmount && errors.sellAmount ? (
                <div className="error-message">{errors.sellAmount}</div>
              ) : null}
            </FormControl>
            <Button
              variant="solid"
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Submitting"
              width="100%"
            >
              Get Quote
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SwapForm;
