import React from 'react';

const Home = () => {
  return (
    <div>
      <div>This is the homepage to the server listening on port 3000</div>
      <button onClick={() => console.log('Button Clicked!!')}>Click Me</button>
    </div>
  );
};

export default {
	component: Home
};
