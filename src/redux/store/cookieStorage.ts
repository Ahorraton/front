import Cookies from 'js-cookie';

interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const cookieStorage: Storage = {
  getItem: async (key: string) => {
    return Cookies.get(key) || null;
  },
  setItem: async (key: string, value: string) => {
    Cookies.set(key, value, { expires: 7 }); // Set cookie to expire in 7 days
  },
  removeItem: async (key: string) => {
    Cookies.remove(key);
  },
};

export default cookieStorage;
