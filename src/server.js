import server from './app';

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${process.env.API_URL}`);
});
