import HttpService from './HttpService';

class CommentsService extends HttpService {
  create = async (movieId, content) => {
    const { data } = await this.client.post('/comments', {
      movie_id: movieId,
      content: content,
    });
    return data;
  };
}
export default new CommentsService();
