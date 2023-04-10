import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 20px;
  background-color: #0079bf;
  color: white;
  font-weight: 500;
`;

const Logo = styled.div`
  font-size: 24px;
`;

const NavLinkList = styled.ul`
  padding-left: 0;
  display: flex;
  list-style-type: none;
  gap: 20px;
`;

const NavLinkItem = styled.li`
  cursor: pointer;
`;

export default function Navbar() {
  return (
    <Container>
      <Logo>Trello Clone</Logo>
      <NavLinkList>
        <NavLinkItem>Home</NavLinkItem>
        <NavLinkItem>About</NavLinkItem>
        <NavLinkItem>Contact</NavLinkItem>
      </NavLinkList>
    </Container>
  );
}
