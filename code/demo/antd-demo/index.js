import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Popover, Carousel } from 'antd';

function App() {
  let content = (
    <Carousel
      autoplay={ true }
      >
      <div className='div'>11111</div>
      <div className='div'>22222</div>
      <div className='div'>33333</div>
    </Carousel>
  );
  return (
    <div style={{ margin: 100 }}>
      <h1>AntDesign Demo</h1>
      <hr /><br />
      <Popover
        content={ content }
        trigger='click'
        width={ 100 }
        placement='bottom'
        >
        Click me to show
      </Popover>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
