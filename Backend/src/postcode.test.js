const { getRegion } = require("./postcode");
const axios = require("axios");

describe("get regions", () => {
  it("NW1 0DP should get london", async () => {
    const result = await getRegion("NW10DP");
    expect(result).toEqual({ region: "London", cost: 1.33 });
  });
  it("AB101AB should get grampian", async () => {
    const result = await getRegion("AB101AB");
    expect(result).toEqual({ region: "Grampian", cost: 8.54 });
  });

  it("IV28 3TU should get highland", async () => {
    const result = await getRegion("IV283TU");
    expect(result).toEqual({ region: "Highland", cost: 21.35 });
  });

  it("JE2 3EH should get Defaults", async () => {
    const result = await getRegion("JE23EH");
    expect(result).toEqual({ region: "Jersey Health Authority", cost: 20 });
  });
  it("IM1 1AT should get Isle of Wight", async () => {
    const result = await getRegion("PO304PG");
    expect(result).toEqual({ region: "Isle of Wight", cost: 7.47 });
  });

  it("BT47 1AB should get Northern Ireland", async () => {
    const result = await getRegion("BT41AB");
    expect(result).toEqual({ region: "Northern Ireland", cost: 21.58 });
  });
});

describe("Invalid Postcode", () => {
  it("JEF2 3EH2 should get be false", async () => {
    const result = await getRegion("JEF23EH2");
    expect(result.error).toBe("Not Found");
  });
});
