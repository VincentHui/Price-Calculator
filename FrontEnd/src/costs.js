import axios from "axios";

//use this to stop hammering the backend at every call if the same postcode is used
const MemoiseFunction = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      cache[key] = fn.call(this, ...JSON.parse(key));
      return cache[key];
    }
  };
};

export const PackageTypes = () => [
  { name: "One-off", value: 40, months: 1 },
  { name: "Rolling", value: 30, months: 3 },
  { name: "6 month", value: 20, months: 6 },
  { name: "12 month", value: 18, months: 12 },
  { name: "18 month", value: 15, months: 18 },
];

export const CalculateCost = (packageValue, vatRate, quantity, regionValue) => {
  const baseCost = packageValue * quantity;
  const vat = baseCost * vatRate;
  const total = baseCost + regionValue + vat;
  return {
    baseCost,
    vat,
    regionValue,
    total,
  };
};

export const CalculateWithPostcode = MemoiseFunction(
  async (packageValue, vatRate, quantity, postcode) => {
    console.log(packageValue);
    const pc = await GetRegionPricing(postcode);
    if (pc.error) return pc;
    return CalculateCost(packageValue, vatRate, quantity, pc.cost);
  }
);

export const GetRegionPricing = async (postcode) =>
  axios
    .get(`http://localhost:8000/?pc=${postcode.replace(/\s+/g, "")}`)
    .then((response) => response.data);
