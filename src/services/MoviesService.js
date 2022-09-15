import HttpService from './HttpService';

class MoviesService extends HttpService {
  create = async (newMovie) => {
    const { data } = await this.client.post('/movies', newMovie, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  };

  get = async (params) => {
    let composedParams = [];
    for (const param in params) {
      if (params[param]) {
        composedParams.push(`${param}=${params[param]}`);
      }
    }
    const { data } = await this.client.get(
      `/movies?${composedParams.join('&')}`
    );
    return data;
  };

  getTopMovies = async () => {
    const { data } = await this.client.get('/movies/topmovies');
    return data;
  };

  getRelatedMovies = async (category) => {
    const { data } = await this.client.get('/movies/relatedmovies', {
      params: category,
    });
    return data;
  };

  show = async ({ id, page }) => {
    const { data } = await this.client.get(`/movies/${id}/?page=${page}`);
    return data;
  };

  delete = async (movie) => {
    const { data } = await this.client.delete(`/movies/${movie}`);
    return data;
  };

  update = async (movie, update) => {
    const { data } = await this.client.put(`/movies/${movie}`, update);
    return data;
  };
}

export default new MoviesService();
