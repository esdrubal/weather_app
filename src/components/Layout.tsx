import React from 'react';
import styled from 'styled-components';
import TopMenu from './TopMenu'

interface Props {
  children: JSX.Element,
}

const WrapperCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;`

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 24pt 0;`

const Layout: React.FC<Props> = (props) => {
  return (
    <div>
      <TopMenu />
      <WrapperCenter>
        <Wrapper>
          {props.children}
        </Wrapper>
      </WrapperCenter>
    </div>
  );
};

export default Layout;
