import React from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element,
}

const WrapperCenter = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;`
  
const Wrapper = styled.section`
  width: 100%;
  max-width: 900px;
  padding: 24pt 0;`

const Layout: React.FC<Props> = (props) => {
  return (
    <WrapperCenter>
      <Wrapper>
        {props.children}
      </Wrapper>
    </WrapperCenter>
  );
};

export default Layout;
