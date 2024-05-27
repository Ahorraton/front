import axios from 'axios';

// Configurar encabezados por defecto para todas las solicitudes

// Instancia para el microservicio de contenido
const contentService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/content`,
});


contentService.defaults.headers.common.clientToken = `${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;
contentService.defaults.headers.common['Content-Type'] = 'application/json';
contentService.defaults.headers.common.Accept = 'application/json';


// Instancia para el microservicio de identidad (usuarios)
const identityService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/identity`,
  });

identityService.defaults.headers.common.clientToken = `${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;
identityService.defaults.headers.common['Content-Type'] = 'application/json';
identityService.defaults.headers.common.Accept = 'application/json';

export const client = {
    product: contentService,
    identity: identityService,
};

export async function fetch_async(url: string, service: string) {
  const cliente = service === 'product' ? client.product : client.identity;

  let data: any = null;
  try {
    const response = await cliente.get(url);

    data = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }

  return data;
}

export async function put_async(url: string, service: string) {
  let resp: any = null;

  const cliente = service === 'product' ? client.product : client.identity;

  try {
    const response = await cliente.put(url, null);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }

  return resp;
}

export async function post_async(url: string, service: string) {
  let resp: any = null;

  const cliente = service === 'product' ? client.product : client.identity;

  try {
    const response = await cliente.post(url, null);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }

  return resp;
}

export async function post_async_with_body(
  url: string,
  datos: {},
  service: string,
) {
  let resp: any = null;

  const cliente = service === 'product' ? client.product : client.identity;

  try {
    const response = await cliente.post(url, datos);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to post users: ${error} `);
  }

  return resp;
}

export async function delete_async(url: string, service: string) {
  let resp: any = null;

  const cliente = service === 'product' ? client.product : client.identity;

  try {
    const response = await cliente.delete(url);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to delete users: ${error}`);
  }

  return resp;
}
