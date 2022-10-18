import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'

interface Props {
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: black;
  height: 48pt;
  padding: 8pt 32pt;
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  font-weight: 500;`

const LinkStyled = styled.a`
  flex: 0 0 auto;
  color: #f2f2f2;
  line-height: 2.4rem;
  cursor: pointer;
  padding: 2pt 4pt;`

const TitleStyled = styled(LinkStyled)`
  font-weight: 900;`

const Separator = styled.span`
  flex: 0 0 auto;
  width: 0.24rem;
  height: 0.24rem;
  margin: 0px 0.833333rem;`

const TopMenu: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Link href="/" passHref><TitleStyled>My Weather App</TitleStyled></Link>
      <Separator/>
      <Separator/>
      <Link href="/" passHref><LinkStyled>Local Weather</LinkStyled></Link>
      <Separator/>
      <Link href="/locations" passHref><LinkStyled>Locations Weather</LinkStyled></Link>  
    </Wrapper>
  );
};

export default TopMenu;
