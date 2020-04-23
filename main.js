//
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene




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

          // la lista sono film

          aggiungiElementi(data.results, 0);

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

          // la lista sono serie tv

            aggiungiElementi(data.results, 1);

        }, // fine attributo success
      error: function (error) {
          console.log("Error ${error}");
      },// fine attributo error
    });
  });

  // tipologiaElemento : indica la tipologia degli elementi presenti in listaFilm
  // se vale 0 -> è un FILM
  // se vale 1 -> è una SERIE TV

// FUNZIONI GENERALI

// funzione per appendere nuovi elementi serie o film
  function aggiungiElementi(listaElementi, tipologiaElemento) {

    for (var i = 0 ; i < listaElementi.length ; i++ ){

      var elemento = listaElementi[i];

      var titolo = "";
      var titoloOriginale = "";
      var tipoElemento = "";

      if (tipologiaElemento === 0) {
        titolo = elemento.title;
        titoloOriginale = elemento.original_title;
        tipoElemento = "FILM";
      } else {
        titolo = elemento.name;
        titoloOriginale = elemento.original_name;
        tipoElemento = "SERIE TV";
      }

      var linguaOriginale = elemento.original_language;
      var voto = elemento.vote_average;

      //sezione poster
      var copertina = elemento.poster_path;
      // sezione stelle
      var votoApprossimato = Math.ceil(voto / 2);

      // abbino i contesti
      var context = {
                      copertina: generaCopertina(copertina),
                      titolo: titolo,
                      titoloOriginale: titoloOriginale,
                      lingua: generaBandiera(linguaOriginale),
                      voto: voto,
                      tipo: tipoElemento,
                      stelle: generaStelle(votoApprossimato),
                    };
      // creo variabile da appendere
      var html = template(context);
      // appendo l'html
      $("#lista-film").append(html);
    } // fine ciclo for
  }//fine funzione

// ----------------------------------------------------------------------------------------------

  // funzione per generare le stelle di valutazione

  function generaStelle(voto){
    var stelleFinali = "";

    for (var i = 0; i < voto; i++ ){
      stelleFinali = stelleFinali + "<i class='fas fa-star'></i>";
    }
    for (var i = 0 ; i < 5 - voto ; i++){
      stelleFinali += "<i class='far fa-star'></i>";
    }
    return stelleFinali;
  }

// -------------------------------------------------------------------------------------------------

  //funzione per generare le bandierine lingua

  function generaBandiera(lingua){
    var bandiera = "";

    var arrayLingue = ["it" , "en" , "sp"];

    for (var i = 0; i < arrayLingue.length; i++){
      if (arrayLingue.includes(lingua)){
        bandiera = "<img src='img/" + lingua + ".png'>";
        console.log(arrayLingue[i]);
      } else {
        bandiera = lingua.toUpperCase();
        console.log(arrayLingue[i]);
      }

      console.log(bandiera);
    }


    return bandiera;
  }

  // funzione per generare le copertine

  function generaCopertina(poster){
    var immagineFinale = "<img src='https://image.tmdb.org/t/p/w154" + poster + "'" + "alt='immagine non disponibile'>" ;
    return immagineFinale;
  }

});






// FUNZIONI GENERALI

// function cercaElemento(a,b){
//   var listaFilm = data.results;
//   for (i = 0 ; i < listaFilm.length ; i++ ){
//     var titolo = a;
//     var titoloOriginale = b;
//     var lingua = listaFilm[i].original_language;
//     var voto = listaFilm[i].vote_average;
//     var context = { titolo: titolo,
//                         titoloOriginale: titoloOriginale,
//                         lingua:lingua,
//                         voto: voto,
//                         tipo: "Film"
//                       };
//     var html = template(context);
//
//     $("#lista-film").append(html);
//   } // fine ciclo for
// }


// FUNZIONI GENERALI
