import { request } from "services";
import { proxy } from "valtio";

type Conversion = {
  from: string;
  to: string;
  amount: string;
  result: string;
  isFetching: boolean;
  fetch: () => void;
  setAmount: (amount: string) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  swap: () => void;
};

export const conversion = proxy<Conversion>({
  from: "",
  to: "",
  amount: "0",
  result: "0",
  isFetching: false,
  fetch() {
    if (!conversion.from || !conversion.to) {
      return;
    }
    conversion.isFetching = true;
    request
      .get("latest", {
        params: {
          amount: conversion.amount,
          base: conversion.from,
          symbols: conversion.to,
        },
      })
      .then((response) => {
        conversion.result = response.data.rates[conversion.to];
        conversion.isFetching = false;
      });
  },
  setAmount(amount) {
    conversion.amount = amount;
  },
  setFrom(from) {
    conversion.from = from;
    conversion.fetch();
  },
  setTo(to) {
    conversion.to = to;
    conversion.fetch();
  },
  swap() {
    const tmp = conversion.amount;
    const tmp2 = conversion.from;

    conversion.amount = conversion.result;
    conversion.result = tmp;

    conversion.from = conversion.to;
    conversion.to = tmp2;
  },
});
