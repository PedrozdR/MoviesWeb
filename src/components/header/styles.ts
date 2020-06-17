import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { Link } from 'react-router-dom';

export const Heading = {
  Container: styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: #116193;
`,
  Title: styled(Link)`
  color: ${colors.white};
  text-decoration:none;
  `
}
