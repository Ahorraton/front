import { DEV_GATEWAY_URI } from '@/connections';
import axios from 'axios';

// Configurar encabezados por defecto para todas las solicitudes

// Instancia para el microservicio de contenido
const gatewayService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_GATEWAY_URI || DEV_GATEWAY_URI}`,
});

//gatewayService.defaults.headers.common.clientToken = `${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;
gatewayService.defaults.headers.common['Content-Type'] = 'application/json';
gatewayService.defaults.headers.common.Accept = 'application/json';


export async function fetch_async(relative_url: string) {

  let data: any = null;
  try {
    const response = await gatewayService.get(relative_url);

    data = JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }

  return data;
}

export async function put_async(relative_url: string) {
  let resp: any = null;

  try {
    const response = await gatewayService.put(relative_url, null);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }

  return resp;
}

export async function post_async(url: string) {
  let resp: any = null;

  try {
    const response = await gatewayService.post(url, null);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }

  return resp;
}

export async function post_async_with_body(
  url: string,
  datos: {},
) {
  let resp: any = null;

  try {
    const response = await gatewayService.post(url, datos);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to post products: ${error} `);
  }

  return resp;
}

export async function delete_async(url: string) {
  let resp: any = null;

  try {
    const response = await gatewayService.delete(url);
    resp = response.data;
  } catch (error) {
    throw new Error(`Failed to delete users: ${error}`);
  }

  return resp;
}
