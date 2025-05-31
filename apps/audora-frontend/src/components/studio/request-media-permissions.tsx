// 'use client';

// import { useState } from 'react';

// export default function RequestMediaPermissions() {
//   const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const requestPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       // Stop tracks immediately after getting permission
//       stream.getTracks().forEach(track => track.stop());

//       // Get device list
//       const allDevices = await navigator.mediaDevices.enumerateDevices();
//       setDevices(allDevices);
//       setError(null);
//     } catch {
//       console.error(err);
//     }
//   };

//   return (
//     <div className='rounded-xl bg-zinc-800 p-4'>
//       <button
//         onClick={requestPermissions}
//         className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
//       >
//         Request Camera & Mic Access
//       </button>

//       {error && <p className='mt-2 text-red-400'>Error: {error}</p>}

//       {devices.length > 0 && (
//         <div className='mt-4 space-y-2 text-white'>
//           <h3 className='font-semibold'>Available Devices:</h3>
//           {devices.map((device, idx) => (
//             <div key={idx}>
//               <strong>{device.kind}</strong>: {device.label || 'No label'}{' '}
//               <br />
//               <small>{device.deviceId}</small>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
