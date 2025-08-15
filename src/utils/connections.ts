const gatewayHost = process.env.GATEWAY_HOST || "localhost";
const gatewayPort = process.env.GATEWAY_PORT || "8000";

export const DEV_GATEWAY_URI = `http://${gatewayHost}:${gatewayPort}`;