(function() {
  $(init);
  function init() {
    var searchBtn = $('#searchBtn');
    var titleFld = $('#title');
    searchBtn.click(searchMovie);
    function searchMovie() {
      var titleText = titleFld.val();
      var url = 'http://www.omdbapi.com/?apikey=a498e26d&s=' + titleText;
      console.log(url);
      $.ajax({
        url: url,
        success: renderMovies,
        error: renderError,
      });
    }
    function renderMovies(response) {
      console.log(response);
      var movies = response.Search;
      console.log(movies);
      var resultsUl = $('#results');
      resultsUl.empty();
      for (var i in movies) {
        var movie = movies[i];
        var title = movie.Title;
        var poster = movie.Poster;
        var year = movie.Year;
        var codigo = movie.imdbID;
        console.log([title, year, poster]);
        var liMovie = $('<li class="list-group-item"></li>');
        var posterImg = $('<img src = "' + poster + '"width="50px"/>');
        liMovie.append(posterImg);
        liMovie.append(title);
        liMovie.click(renderDetails);
        resultsUl.append(liMovie);
      

      }
      function renderDetails() {
        console.log(codigo);
        $('#results').text(' ');
        $('.images').text(' ');
        $.getJSON('http://www.omdbapi.com/?apikey=a498e26d&i=' + codigo).then(function(response) {
          console.log(response);
          var image = response.Poster;
          var year = response.Year;
          var director = response.Director;
          var resumen = response.Plot;
          console.log(image);
          $('.images').append('<span> Año de estreno: ' + year + '</span>')
          $('.images').append('<span> Director: ' + director + '</span>')
          $('.images').append('<p> Trama: ' + resumen + '</p>')
          if (image !== 'N/A') {
            $('.images').append('<img src="' + image + '"></img>');
            $('.details').show();
          }
        });
      }
    }
    function renderError(error) {
      console.log(error);
    }
  }
})();
