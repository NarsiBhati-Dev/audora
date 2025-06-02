// import { useEffect, useState } from 'react';

// const useSignal = (signal: string) => {
//   const [signalData, setSignalData] = useState<any>(null);

//   useEffect(() => {
//     const socket = new WebSocket(signal);

//     socket.onmessage = event => {
//       console.log('message', event.data);
//     };
//   }, [signal]);
// };

// export default useSignal;
