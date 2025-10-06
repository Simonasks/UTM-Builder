import Pusher from "pusher-js";

let client: Pusher | null = null;

export function getPusherClient() {
  if (!client) {
    client = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "demo", {
      cluster: "mt1",
      enabledTransports: ["ws", "wss"],
    });
  }
  return client;
}
