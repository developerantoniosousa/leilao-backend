import server from './app';

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.API_URL}`);
});
