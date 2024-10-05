import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pages } from '../data/pages';

const Wrapper = styled.div`
  //display: flex;
  display: none;
  left: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 32px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;
`;

const Nav = styled.nav`
  flex: none;
  margin: 0 auto;
`;

const NavLink = styled.a`
  border-radius: 8px;
  flex: none;
  font-weight: 500;
  padding: 12px 24px;
  text-decoration: none;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(47, 66, 80, 0.2);
  }
`;

function Navigation() {
    return (
        <Wrapper>
            <Nav>
                {pages
                    .filter((x) => !x.hide)
                    .map((page, index) => (
                        <NavLink as={Link} key={index} to={page.path}>
                            {page.title}
                        </NavLink>
                    ))}
            </Nav>
        </Wrapper>
    );
}

export { Navigation };
