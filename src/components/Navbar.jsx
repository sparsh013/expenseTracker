import React from 'react';
import Logo from './shared/logo';
import { Popover, PopoverTrigger , PopoverContent } from './ui/popover';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
// import { PopoverContent } from './ui/popover';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/logout");
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error("Failed to log out. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='border-b border-gray-300'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-4'>
                <div className='flex-shrink-0'>
                    <Logo />
                </div>
                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="User Avatar"
                                />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Button variant='link' onClick={logoutHandler}>
                                Logout
                            </Button>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link to='/login'>
                            <Button variant='outline'>Login</Button>
                        </Link>
                        <Link to='/signup'>
                            <Button>Signup</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
