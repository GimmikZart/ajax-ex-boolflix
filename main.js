




$(document).ready(function(){
  var source = $("#script-lista-film").html();
  var template = Handlebars.compile(source);

  $("#bottone").on("click",function() {
    $("#lista-film").html("");
    var filtroUtente = $("#filtro-utente").val();
    // CHIAMATA AJAX PER FILM
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
          api_key: 'ae4c927624a6458bc74bdd1b924c1cf1',
          language: 'it-IT',
          query: filtroUtente,
          page: 1
        },
      type: "GET",
      dataType: "json",
      success: function (data,stato) {
          var listaFilm = data.results;
          for (i = 0 ; i < listaFilm.length ; i++ ){
            var titolo = listaFilm[i].title;
            var titoloOriginale = listaFilm[i].original_title;
            var lingua = listaFilm[i].original_language;
            var voto = listaFilm[i].vote_average;
            var context = { titolo: titolo,
                                titoloOriginale: titoloOriginale,
                                lingua:lingua,
                                voto: voto,
                                tipo: "Film"
                              };
            var html = template(context);

            $("#lista-film").append(html);
          } // fine ciclo for
        }, // fine attributo success
      error: function (error) {
          console.log("Error ${error}");
      },// fine attributo error
    });

    // CHIAMATA AJAX PER SERIE
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/tv',
      data: {
          api_key: 'ae4c927624a6458bc74bdd1b924c1cf1',
          language: 'it-IT',
          query: filtroUtente,
          page: 1
        },
      type: "GET",
      dataType: "json",
      success: function (data,stato) {
          var listaFilm = data.results;
          for (i = 0 ; i < listaFilm.length ; i++ ){
            var titolo = listaFilm[i].name;
            var titoloOriginale = listaFilm[i].original_name;
            var lingua = listaFilm[i].original_language;
            var voto = listaFilm[i].vote_average;
            var context = {
                            titolo: titolo,
                            titoloOriginale: titoloOriginale,
                            lingua:lingua,
                            voto: voto,
                            tipo: "serie TV"
                          };
            var html = template(context);

            $("#lista-film").append(html);
          } // fine ciclo for
        }, // fine attributo success
      error: function (error) {
          console.log("Error ${error}");
      },// fine attributo error
    });
  });
});
