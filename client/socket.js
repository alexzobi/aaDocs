export let socket;

export const createSocket = url =>{
  socket = new WebSocket(url);
  socket.onopen = () =>{
    console.log('sockets engaged. charging thrusters...');
  };
  
  socket.onclose = () =>{
    console.log('Tata for now!');
  };

  socket.onerror = (err) =>{
    console.log('Houston, we have a problem.');
    console.error(err);
  };
  
  socket.onmessage = message =>{
    try {
      const json = JSON.parse(message.data);
      console.log('package delivered...', json);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;
    }
  };
};