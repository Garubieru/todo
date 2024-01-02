export function hotReload(): string {
	return `
   (function() {
      const socket = new WebSocket("ws://localhost:8000/live-reload");
        socket.onmessage = function(msg) {
        if (msg.data === 'live-reload') {
          location.reload()
        }
      };
      console.log('Live reload enabled.');
    })();`;
}
