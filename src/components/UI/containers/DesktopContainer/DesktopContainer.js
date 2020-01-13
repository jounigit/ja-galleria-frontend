import React, { useState, useContext } from 'react'
import {
  Responsive,
  Segment,
  Menu,
  Container,
  Visibility,
  Button,
  // Header
} from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'
import { AppHeader } from '../../headers/AppHeader'
import * as routes from '../../../../shared/constants/routes'
import { AuthContext } from '../../../../App'

export default function DesktopContainer({ children }) {
  const [fixed, setFixed] = useState()
  const { state, dispatch } = useContext(AuthContext)

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          inverted
          textAlign="center"
          vertical
          style={{ padding: '1em 0em', marginBottom: '1.5em' }}
        >
          <AppHeader />
          <Menu
            fixed={fixed ? 'top' : null}
            inverted
            pointing={!fixed}
            secondary={!fixed}
            size='small'>
            <Container data-cy='menu'>
              <Menu.Item
                as={NavLink}
                to={routes.HOME}
                name='home'
                content='Home'
              />
              <Menu.Item
                as={NavLink}
                to={routes.CATEGORIES}
                name='categories'
                content='Categories'
              />
              <Menu.Item
                as={NavLink}
                to={routes.ALBUMS}
                name='album'
                content='Albums'
              />
              <Menu.Item
                as={NavLink}
                to={routes.PICTURES}
                name='pictures'
                content='Pictures'
              />

              {/* ------ right, login logout ------------ */}
              <Menu.Item position='right'>
                {
                  state.user === null ?
                    <Button as={Link}
                      to={routes.LOGIN}
                      name='login'
                      data-cy='login'
                      inverted size='tiny'
                      content='Log in'
                    />
                    :
                    <Button as='a'
                      onClick={() => dispatch({ type: 'LOGOUT' })}
                      data-cy='logout'
                      inverted size='tiny'>
                      Logout - {state.user.name}
                    </Button>
                }

                <Button as='a' inverted primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </Visibility>
      {children}
    </Responsive>
  )
}