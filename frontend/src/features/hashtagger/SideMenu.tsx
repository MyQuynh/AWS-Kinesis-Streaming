import React from 'react';
import { IconType } from 'react-icons';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clean } from './hashtaggerSlice';

export interface MenuItem {
  icon: IconType;
  id: string;
  name: string;
}

interface SideMenuProps {
  items: MenuItem[];
}

// eslint-disable-next-line arrow-body-style
const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex flexDirection="column">
        {/* Menu Item box */}
        {items.map((item: MenuItem) => (
          <>
            <NavLink
              className="side-menu-nav"
              to={`/hashtagger/${item.id}`}
              activeClassName="selected"
              onClick={() => {
                dispatch(clean()); // Prune hashtagger previous generated data
              }}
            >
              <Flex
                flexDirection="row"
                className="side-menu-item"
                bg="#ffffff"
                _hover={{
                  backgroundColor: 'brand.300',
                  cursor: 'pointer',
                }}
                gridGap={5}
                p={3}
              >
                <Icon as={item.icon} display="inline" w="18px" h="18px" />

                <Text fontSize={14} fontWeight={600}>
                  {item.name}
                </Text>
              </Flex>
            </NavLink>
          </>
        ))}
      </Flex>
    </>
  );
};

export default SideMenu;
