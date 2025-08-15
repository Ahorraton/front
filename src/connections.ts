const gatewayHost = process.env.GATEWAY_HOST || "gateway";
const gatewayPort = process.env.GATEWAY_PORT || "8000";

export const NEXT_PUBLIC_GATEWAY_URI = `http://${gatewayHost}:${gatewayPort}`;