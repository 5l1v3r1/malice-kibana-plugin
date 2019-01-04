import chrome from 'ui/chrome';

const baseUrl = chrome.addBasePath('/api/malice');

export const createApiClient = httpClient => {
  return {
    async getDoc(id) {
      const url = `${baseUrl}/get/${id}`;
      const { data } = await httpClient.get(url);
      return data;
    },
    async search(query) {
      const url = `${baseUrl}/search/?query=${query}`;
      await httpClient.get(url);
    }
  };
};
