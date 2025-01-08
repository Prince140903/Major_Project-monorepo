import React from "react";
import './newsletter.css';

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Button } from "@mui/material";



const Newsletter = () => {
    return (
         <div className="newsLetterBanner ">
                  <SendOutlinedIcon />
                  <input type='text' placeholder="your email address" />
                  <Button className='btn-g'>Subcribe</Button>
                </div>
        
    )
}

export default Newsletter;