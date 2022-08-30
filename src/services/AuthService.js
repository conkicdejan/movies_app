import HttpService from './HttpService';

class AuthService extends HttpService {
  register = async (newUser) => {
    const { data } = await this.client.post('/auth/register', newUser);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post('/auth/login', credentials);
    return data;
  };

  logout = async () => {
    const { data } = await this.client.post('/auth/logout');
    return data;
  };

  getActiveUser = async () => {
    const { data } = await this.client.get('/auth/me');
    return data;
  };
}

export default new AuthService();