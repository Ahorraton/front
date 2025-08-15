const gatewayHost = process.env.GATEWAY_HOST || "gateway";
const gatewayPort = process.env.GATEWAY_PORT || "8000";

export const GATEWAY_URI = `http://${gatewayHost}:${gatewayPort}`;