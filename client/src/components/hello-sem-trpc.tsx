import { useEffect, useState } from 'react'

function HelloSemTRPC() {
  const [hello, setHello] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => setHello(data.message));
  }, []);

  if (!hello) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <h2>
      {hello}
    </h2>
  );
}

export default HelloSemTRPC;
