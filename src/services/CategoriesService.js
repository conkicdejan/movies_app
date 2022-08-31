import HttpService from './HttpService';

class CategoriesService extends HttpService {
  get = async () => {
    const { data } = await this.client.get('/categories');
    return data;
  };
}

export default new CategoriesService();
