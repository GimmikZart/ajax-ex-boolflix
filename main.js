// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto


$(document).ready(function(){

  $("#bottone").on("click",function() {
    $("#lista-film").html("");
    var filtroUtente = $("#filtro-utente").val();
    console.log(filtroUtente);
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
          api_key: 'ae4c927624a6458bc74bdd1b924c1cf1',
          language: 'it-IT',
          query: filtroUtente,
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
            var source = $("#script-lista-film").html();
            var template = Handlebars.compile(source);
            var context = { titolo: titolo, titoloOriginale: titoloOriginale, lingua:lingua, voto: voto };
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
