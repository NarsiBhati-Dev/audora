import { Message } from '@audora/types';

export const onMessage = (message: Message) => {
  switch (message.type) {
    case 'user:join':
      console.log('User joined:', message.data);
      break;
    case 'user:leave':
      console.log('User left:', message.data);
      break;
    case 'webrtc:offer':
      console.log('Offer:', message.data);
      break;
    case 'webrtc:answer':
      console.log('Answer:', message.data);
      break;
    case 'webrtc:ice-candidate':
      console.log('ICE candidate:', message.data);
      break;
    case 'webrtc:ice-candidate':
      console.log('Candidate:', message.data);
      break;
    case 'recording:start':
      console.log('Recording started:', message.data);
      break;
    case 'recording:stop':
      console.log('Recording stopped:', message.data);
      break;
  }
};
