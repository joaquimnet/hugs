var form = document.getElementById('hugForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var message = document.getElementById('message').value;
  var name = document.getElementById('name').value;
  http('POST', '/api/hugs', JSON.stringify({ message: message, name: name }), function (hug) {
    window.location.replace('/hug/' + hug.id);
  });
});

function http(method, url, body, callback) {
  var request = new XMLHttpRequest();

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4) {
      callback(JSON.parse(request.responseText));
    }
  });
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(body);
}
