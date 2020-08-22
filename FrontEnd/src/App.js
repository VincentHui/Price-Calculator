import React, { useState } from "react";
import {
  RowInput,
  CostingRow,
  RowDropdown,
  RowButton,
} from "./sharedComponents";
import styled from "styled-components";
import { PackageTypes, CalculateWithPostcode } from "./costs";

const AppContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
`;
const Aligner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const AppColumn = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [amount, setAmount] = useState("");
  const [postCode, setPostCode] = useState("");
  const [packageType, setPackage] = useState(PackageTypes()[0]);
  const [costObject, setCost] = useState({
    baseCost: 0,
    vat: 0,
    regionValue: 0,
    total: 0,
  });

  const { baseCost, vat, regionValue, total } = costObject;
  return (
    <Aligner>
      <AppContainer>
        <AppColumn>
          <RowInput
            type="number"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="bottles a month"
          />
          <RowInput
            type="text"
            placeholder="123 456"
            label="delivery postcode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
          <RowDropdown
            list={PackageTypes().map((p) => p.name)}
            label="subscription type"
            onChange={(p) => {
              setPackage(PackageTypes().find((pkg) => pkg.name === p));
            }}
          />
          <RowButton
            name="submit"
            onClick={() => {
              CalculateWithPostcode(
                packageType.value,
                0.2,
                amount,
                postCode
              ).then((result) => (!result.error ? setCost(result) : null));
            }}
          />
        </AppColumn>
        <AppColumn>
          <CostingRow label="base Cost" value={baseCost} />
          <CostingRow label="VAT Cost" value={vat} />
          <CostingRow label="Shipping Cost" value={regionValue} />
          <CostingRow label="Total Cost" value={total} />
        </AppColumn>
      </AppContainer>
    </Aligner>
  );
}

export default App;
