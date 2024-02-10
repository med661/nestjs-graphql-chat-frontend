import React from 'react';
import {
    Box,
    Flex,
    Spacer,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { logoutAsync } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ user }) => {
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {

        dispatch(logoutAsync());
        navigate('/login');



    };
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="teal.500"
            color="black"
        >
            <Box>
                Logo
            </Box>

            <Spacer />

            {user && (
                <Box>
                    <Menu>
                        <MenuButton as={IconButton} icon={<FiLogOut />} variant="outline" />
                        <MenuList>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            )}
        </Flex>
    );
};

export default Navbar;
