import styled from "styled-components";
import React, { useState } from "react";
import PropTypes from "prop-types";

const contentStyle = `  
  width: 150px;
  padding: 2px;
`;

const DropDownContent = styled.ul`
  display: ${(props) => (!props.isHidden ? "block" : "none")};
  position: absolute;
  list-style: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  ${contentStyle}
  max-height: 400px;
  margin: 0;
  overflow-y: scroll;
  cursor: pointer;
  background-color: rgba(240, 240, 240, 1);
`;
const DropDownTitle = styled.div`
  display: block;
  ${contentStyle}
  border: 3px solid rgba(50, 50, 50, 1);
  background-color: rgba(240, 240, 240, 1);
`;

export const SourceDropDown = (props) => {
  const [dropState, setDropState] = useState({
    focused: false,
    focusedSource: props.sources[0],
  });
  return (
    <div>
      <DropDownTitle
        onClick={() =>
          setDropState({ ...dropState, focused: !dropState.focused })
        }
      >
        {dropState.focusedSource}
      </DropDownTitle>
      <DropDownContent isHidden={!dropState.focused}>
        {props.sources.map((source, i) => (
          <li
            onClick={() => {
              setDropState({
                ...dropState,
                focused: false,
                focusedSource: source,
              });
              props.onSourceChanged(source);
            }}
            key={i}
          >
            {source}
          </li>
        ))}
      </DropDownContent>
    </div>
  );
};

SourceDropDown.propTypes = {
  onSourceChanged: PropTypes.func,
  sources: PropTypes.arrayOf(PropTypes.string),
};

const Label = styled.label`
  width: 200px;
`;

const RowItem = styled.div`
  display: flex;
  padding: 20px;
`;

const ContentInput = styled.input`
  ${contentStyle}
`;

export const RowInput = (props) => (
  <RowItem>
    <Label>{props.label}</Label>
    <ContentInput
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></ContentInput>
  </RowItem>
);
SourceDropDown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
const Content = styled.div`
  ${contentStyle}
`;
export const CostingRow = (props) => (
  <RowItem>
    <Label>{props.label}</Label>
    <Content>
      {"£" + Math.round((props.value + Number.EPSILON) * 100) / 100}
    </Content>
  </RowItem>
);
CostingRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
};

const DropDownContainer = styled(RowItem)`
  user-select: none;
`;
export const RowDropdown = (props) => (
  <DropDownContainer>
    <Label>{props.label}</Label>
    <SourceDropDown sources={props.list} onSourceChanged={props.onChange} />
  </DropDownContainer>
);
DropDownContainer.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

const FilledButton = styled.button`
  flex-grow: 1;
`;
export const RowButton = (props) => (
  <RowItem>
    <FilledButton onClick={props.onClick}>{props.name}</FilledButton>
  </RowItem>
);
