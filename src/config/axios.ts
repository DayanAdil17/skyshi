import instance from 'axios';

export const axios = instance.create({
  baseURL: 'https://todo.api.devcode.gethired.id/',
});
