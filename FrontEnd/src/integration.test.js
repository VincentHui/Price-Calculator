import { GetRegionPricing, PackageTypes, CalculateWithPostcode } from "./costs";

//NOTE! this needs the Backend running to test properly!

describe("get region logic", () => {
  it("test postcode logic", async () => {
    const result = await GetRegionPricing("NW1 0DP");
    expect(result.region).toBe("London");
    expect(result.cost).toBe(1.33);
  });
});

describe("calculate costs with postcodes", () => {
  it("1 bottle with the oneoff package from london", async () => {
    const result = await CalculateWithPostcode(
      PackageTypes()[0].value,
      0.2,
      1,
      "NW10DP"
    );

    expect(result.baseCost).toBe(40);
    expect(result.vat).toBe(8);
    expect(result.regionValue).toBe(1.33);
    expect(result.total).toBe(49.33);
  });
  it("10 bottle with the 12 month package from london", async () => {
    const result = await CalculateWithPostcode(
      PackageTypes()[3].value,
      0.2,
      10,
      "NW10DP"
    );
    expect(result.baseCost).toBe(180);
    expect(result.vat).toBe(36);
    expect(result.regionValue).toBe(1.33);
    expect(result.total).toBe(217.33);
  });
  it("10 bottle with the 12 month package from highlands", async () => {
    const result = await CalculateWithPostcode(
      PackageTypes()[3].value,
      0.2,
      10,
      "IV283TU"
    );
    expect(result.baseCost).toBe(180);
    expect(result.vat).toBe(36);
    expect(result.regionValue).toBe(21.35);
    expect(result.total).toBe(237.35);
  });
  it("10 bottle with the 12 month package from incorrect postcode", async () => {
    const result = await CalculateWithPostcode(
      PackageTypes()[3].value,
      0.2,
      10,
      "1231232asddss09"
    );

    expect(result.status).toBe(404);
    expect(result.error).toBe("Not Found");
  });
});
