$(document).ready(function() {
  $('#media').carousel({
    pause: true,
    interval: false,
  });
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBpuy4flU2csWxQXFDAYFt30RsufAnMPjA',
    authDomain: 'pelimotion.firebaseapp.com',
    databaseURL: 'https://pelimotion.firebaseio.com',
    projectId: 'pelimotion',
    storageBucket: 'pelimotion.appspot.com',
    messagingSenderId: '597429938830'
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

  // Función para guardar automáticamente
  function save(user) {
    var usuario = {
      uid: user.uid,
      username: user.displayName,
      usermail: user.email,
      userphoto: user.photoURL
    };
    firebase.database().ref('speakup/' + user.uid).set(usuario);
  };

  // Evento para el botón Inicia sesión
  $('#login').on('click', function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      save(result.user);
      // Guardando en el localstorage
      window.localStorage.setItem('name', result.user.displayName);
      var name = window.localStorage.getItem('name');
      // window.localStorage.setItem('photo', result.user.photoURL);
      // var img = window.localStorage.getItem('photo');

      window.localStorage.setItem('foto', result.user.photoURL);
      var photo = window.localStorage.getItem('foto');
      // window.location.href = 'views/speakup.html';
    });
  });

  var info;
  var picture;
  // function nueva(result) {
  //   save(result.user);
  //   info = $('#name').append('<h3>' + name + '</h3>');
  //   picture = $('#root').append("<img src='" + result.user.photoURL + "' />");
  //   console.log(result.user.displayName);
  // };
  var movieArrayData = Object.keys(movieData);
  console.log(movieArrayData);
  function apiCall(arr) {
    for (var i = 0; i < arr.length; i++) {
      console.log(arr);
      $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(arr[i]) + '&apikey=a498e26d').then(function(response) {
        console.log(response);
        var image = response.Poster;
        console.log(image);
        if (image !== 'N/A') {
          $('.images').append('<img src="' + image + '"></img>');
        }
      });
    }
  }
  $('#alegria').on('click', function() {
    apiCall(Object.values(movieData.alegria));
  });
  $('#aventura').on('click', function() {
    apiCall(Object.values(movieData.aventura));
  });
  $('#miedo').on('click', function() {
    apiCall(Object.values(movieData.miedo));
  });
  $('#reflexion').on('click', function() {
    apiCall(Object.values(movieData.reflexion));
  });
  $('#romance').on('click', function() {
    apiCall(Object.values(movieData.romance));
  });
});
