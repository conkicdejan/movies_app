import axios from 'axios';
class OmdbService {
  constructor() {
    this.client = axios.create({
      baseURL: `http://www.omdbapi.com`,
    });
  }

  omdbKey = process.env.VUE_APP_OMDB_KEY;

  search = async (search) => {
    console.log(this.omdbKey);
    const { data } = await this.client.get(
      `?apikey=${this.omdbKey}&s=${search}`
    );
    return data;
  };
  get = async (imdbID) => {
    const { data } = await this.client.get(
      `?apikey=${this.omdbKey}&i=${imdbID}`
    );
    return data;
  };
}

export default new OmdbService();
