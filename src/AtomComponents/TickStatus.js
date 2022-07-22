import React from 'react'

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { DoneAllOutlined, ScheduleOutlined } from "@mui/icons-material";


const TickStatus = ({status}) => {
    let component
    switch(status){
        case 'read':
            component=<DoneAllOutlined style={{color:'blue',fontSize:'small'}}/>
            break;
        case 'delivered':
                component=<DoneAllOutlined style={{fontSize:'small'}}/>
            break;
        case 'sent':
                component=<DoneOutlinedIcon style={{fontSize:'small'}}/>
            break;
        case 'pending':
                component=<ScheduleOutlined style={{fontSize:'small'}}/>
            break;
        default:
            return


    }
    
  return (
    component
  )
}

export default TickStatus
