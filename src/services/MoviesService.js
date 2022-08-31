import HttpService from './HttpService';

class MoviesService extends HttpService {
  create = async (newMovie) => {
    const { data } = await this.client.post('/movies', newMovie);
    return data;
  };

  get = async () => {
    const { data } = await this.client.get('/movies');
    return data;
  };

  show = async (movie) => {
    const { data } = await this.client.get(`/movies/${movie}`);
    return data;
  };

  delete = async (movie) => {
    const { data } = await this.client.delete(`/movies/${movie}`);
    return data;
  };
}

export default new MoviesService();
