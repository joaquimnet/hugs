var form = document.getElementById('hugForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var id = window.location.pathname.substr(5);
    console.log(id);
    document.getElementsByTagName('input')[0].style.backgroundColor = 'green';

    http('POST', '/api/hugs/claim/' + id, function () {
      window.location.reload();
    });
  });
}

function http(method, url, callback) {
  var request = new XMLHttpRequest();
  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4) {
      callback();
    }
  });
  request.open(method, url);
  request.send();
}
