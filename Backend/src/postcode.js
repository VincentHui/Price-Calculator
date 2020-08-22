const axios = require("axios");

const getPostCodes = async (postcode) =>
  axios
    .get(`http://postcodes.io/postcodes/${postcode}`)
    .then((response) => response.data);

const validatePostCodes = async (postcode) =>
  axios
    .get(`http://postcodes.io/postcodes/${postcode}/validate`)
    .then((response) => response.data.nhs_ha);

const CostTable = {
  London: 1.33,
  "Devon & Cornwall": 1.6,
  Grampian: 8.54,
  Highland: 21.35,
  "Isle of Wight": 7.47,
  "Industrial Scotland": 1.07,
  "Northern Ireland": 21.58,
  Default: 20,
};

const RegexTable = [
  { name: "Isle of Wight", regex: /PO[3-4][0-1]/ },
  { name: "Northern Ireland", regex: /BT/ },
];

const getRegionFromPostcode = (postcode) =>
  RegexTable.find((regObj) => postcode.match(regObj.regex));

const massageRegion = (region, postcode) => {
  if (CostTable[region]) return { region, cost: CostTable[region] };
  //see if we can match and extract
  const regex = /(Grampian|Highland|Isle of Man|London|Industrial Scotland|Scottish Offshore|Scilly Isles|Isle of Wight|Devon & Cornwall|Jersey|Guernsey|Dyfed & Powys|Northern Ireland)/g;
  const matches = region.match(regex);

  if (matches && CostTable[matches[0]])
    return { region: [matches[0]], cost: CostTable[matches[0]] };

  const regResult = getRegionFromPostcode(postcode);
  if (regResult)
    return { region: regResult.name, cost: CostTable[regResult.name] };

  return { region, cost: CostTable["Default"] };
};

const getRegion = async (postcode) => {
  const pcResp = await getPostCodes(postcode).catch((e) => {
    if (e.isAxiosError) {
      return {
        status: e.response.status,
        error: e.response.statusText,
      };
    } else {
      throw e;
    }
  });
  if (pcResp.error) return pcResp;
  return massageRegion(pcResp.result.nhs_ha, postcode);
};

module.exports = {
  getPostCodes,
  validatePostCodes,
  getRegion,
};
