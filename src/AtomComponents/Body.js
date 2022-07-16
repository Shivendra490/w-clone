import React from "react";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const Body = () => {
  return (
    <div className="chatWrapper">
      <div className="chatLeftRightwrapper">


        <div className="chat chatRight">
        <span>hello</span>
          <div className="tickTimeWrapper">
          <span>12:30 PM</span>
          <span className='rightDoubleTick'><DoneOutlinedIcon style={{fontSize:'small'}}/></span>
            
          </div>
        </div>

        <div className="chat">
        <span>Hi</span>
          <div className="tickTimeWrapper">
            
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="chat chatRight">
        <span>How are you?</span>
          <div className="tickTimeWrapper">
          <span>12:30 PM</span>
            <span className='rightDoubleTick'><DoneAllOutlinedIcon style={{fontSize:'small'}}/></span>
            
          </div>
        </div>

        <div className="chat">
        <span>fine , what about you</span>
          <div className="tickTimeWrapper">
            
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="chat chatRight">
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet libero debitis! Veritatis harum fugit aspernatur laudantium ad quasi porro!</span>
          <div className="tickTimeWrapper">
          <span>12:30 PM</span>
          <span className='rightDoubleTick'><DoneAllOutlinedIcon style={{fontSize:'small',fill:'#68daf9'}}/></span>
            
          </div>
        </div>

        <div className="chat">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam in mollitia. Aperiam, consectetur cumque.</span>
          <div className="tickTimeWrapper">
            
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="chat chatRight">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam in mollitia. Aperiam, consectetur cumque.</span>
          <div className="tickTimeWrapper">
          <span>12:30 PM</span>
          <span className='rightDoubleTick'><DoneAllOutlinedIcon style={{fontSize:'small',fill:'blue'}}/></span>
            
          </div>
        </div>

        <div className="chat">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam in mollitia. Aperiam, consectetur cumque.</span>
          <div className="tickTimeWrapper">
            
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="chat">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam in mollitia. Aperiam, consectetur cumque.</span>
          <div className="tickTimeWrapper">
            
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="chat chatRight">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam in mollitia. Aperiam, consectetur cumque.</span>
          <div className="tickTimeWrapper">
          <span>12:30 PM</span>
          <span className='rightDoubleTick'><DoneAllOutlinedIcon style={{fontSize:'small',fill:'blue'}}/></span>
            
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Body;
