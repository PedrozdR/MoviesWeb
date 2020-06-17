import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Input = {
  Container: styled.input`
    width: 100%;
    height: 50px; 
    border-radius:40px;
    outline:none;
    border:none;
    background: ${colors.gray};
    box-shadow: #00000024;
    padding: 8px 24px;
    margin: 34px 0px;
    color: ${colors.primary};
    font-size: 18px;
    ::placeholder{
      font-size: 18px;
      color: ${colors.primary}
    };
  `
}
