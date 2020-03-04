response.writeHead(302, {
  'Location': 'your/404/path.html'
  //add other headers here...
});
response.end();
