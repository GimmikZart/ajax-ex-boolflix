//
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene




$(document).ready(function(){

  var source = $("#script-lista-film").html();
  var template = Handlebars.compile(source);

  $("#filtro-utente").on("keyup",function() {

    eseguiRicerca();
  });// fine evento keyup

  $("#bottone").on("click",function() {

    eseguiRicerca();
  });// fine evento click

// FUNZIONI PRINCIPALI -----------------------------------------------------------

  // FUNZIONE PER CHIAMATE AJAX
  function eseguiRicerca() {

    $("#lista-film").html("");
    var filtroUtente = $("#filtro-utente").val();
    // chiamata AJAX per film
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
          api_key: 'ae4c927624a6458bc74bdd1b924c1cf1',
          language: 'it-IT',
          query: filtroUtente,
          page: 1
        }, // fine attributo data
      type: "GET",
      dataType: "json",
      success: function (data,stato) {

          aggiungiElementi(data.results, 0);

        }, // fine attributo success
      error: function (error) {
          funzioneErrore(error);
      },// fine attributo error
    }); // fine chiamata ajax per film


    // chiamata ajax per serie tv
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/tv',
      data: {
          api_key: 'ae4c927624a6458bc74bdd1b924c1cf1',
          language: 'it-IT',
          query: filtroUtente,
          page: 1
        }, // fine attributo data
      type: "GET",
      dataType: "json",
      success: function (data,stato) {

            aggiungiElementi(data.results, 1);

        }, // fine attributo success
      error: function (error) {
          funzioneErrore(error);
      },// fine attributo error
    }); // fine chiamata ajax per serie tv
  } // FINE FUNZIONE DI RICERCA


  // FUNZIONI SECONDARIE ---------------------------------------------------------------------------------------

  // funzione funzioneErrore
  function funzioneErrore(error){
    console.log("Error", error);
  }

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
      } // fine ciclo if

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
                    }; // fine variabile context
      // creo variabile da appendere
      var html = template(context);
      // appendo l'html
      $("#lista-film").append(html);
    } // fine ciclo for
  }//fine funzione aggiungiElementi


  // FUNZIONI TERZIARIE --------------------------------------------------------------------------------

  // funzione per generare le stelle di valutazione
  function generaStelle(voto){
    var stelleFinali = "";

    for (var i = 0; i < voto; i++ ){
      stelleFinali = stelleFinali + "<i class='fas fa-star'></i>";
    }
    for (var j = 0 ; j < 5 - voto ; j++){
      stelleFinali += "<i class='far fa-star'></i>";
    }
    return stelleFinali;
  } // fine funzione generaStelle



  //funzione per generare le bandierine lingua
  function generaBandiera(lingua){
    var bandiera = "";

    var arrayLingue = ["it" , "en" , "sp"];

    for (var i = 0; i < arrayLingue.length; i++){
      if (arrayLingue.includes(lingua)){
        bandiera = "<img src='img/" + lingua + ".png'>";
      } else {
        bandiera = lingua.toUpperCase();
      }
    }
    return bandiera;
  }// fine funzione generaBandiere


  // funzione per generare le copertine
  function generaCopertina(poster){

    var immagineFinale = "";

    if (poster != null){
      immagineFinale = "<img src='https://image.tmdb.org/t/p/w154" + poster + "'" + "alt='immagine non disponibile'>" ;
    } else {
      immagineFinale = '<img src="" alt="">';
    } // fine ciclo if
    return immagineFinale;
  }// fine funzione generaCopertina


}); // FINE DOCUMENT READY
