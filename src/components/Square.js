import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 96px;
  font-weight: bold;
  line-height: 136px;
  height: 136px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 136px;

  ${props => props.isHighlight && css`
    background-color: lightgreen;
  `}

  &:focus {
    outline: none;
  }
`;

const Square = ({ value, onClick, isHighlight }) => {
  return (
    <Button 
      isHighlight={isHighlight}
      onClick={onClick}
    >
      {value}
    </Button>
  )
}

export default Square;