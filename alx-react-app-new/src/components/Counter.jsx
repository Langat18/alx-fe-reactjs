import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '0 10px', padding: '5px 15px', fontSize: '16px' }}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ margin: '0 10px', padding: '5px 15px', fontSize: '16px' }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ margin: '0 10px', padding: '5px 15px', fontSize: '16px' }}>Reset</button>
    </div>
  );
}

export default Counter;