import axios from 'axios';

class OmdbService {
  constructor() {
    this.client = axios.create({
      baseURL: `http://www.omdbapi.com`,
    });
  }

  myApiKey = '45afb0bf';
  search = async (search) => {
    const { data } = await this.client.get(`?apikey=${this.myApiKey}&s=${search}`);
    return data;
  };
  get = async (imdbID) => {
    const { data } = await this.client.get(`?apikey=${this.myApiKey}&i=${imdbID}`);
    return data;
  };
}

export default new OmdbService();
