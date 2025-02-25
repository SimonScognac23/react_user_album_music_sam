<?php

// web.php quà dentro andremo ad inserire tutte le richieste possibili che l'utente può fare sul nostro sito web
// Questo file è detto file di routing, dobbiamo pensare a questo file come se fosse un vigile urbano




//-------------------- PAGINA WELCOME  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


use Illuminate\Support\Facades\Route;

// funzione che restituisce la pagina di welcome

Route::get('/', function () {  // qui sono dentro la funzione che mi restituisce la vista di welcome

$title = 'Snaaakee!!';  //questo $title dovra arrivare dentro la pagina di welcome, e per far  cio si passa all interno della funzione scritta nella riga successiva

    return view('welcome' , ['titolo'=> $title] ); //la funzione view puo accettare 2 parametri il primo è la vista e il secondo sono i dati sotto forma di array, questo array sarà di tipo chiave-valore

});// nell array avro una chiave , la chiave è il nome della variabile che sarà disponibile sulla lista, mentre il valore è il contenuto ossia $title














//-------------------------- PAGINA CHI SIAMO ------------------------------------------------------------------------------------------------------------------------------------------------------


// Partendo dalla classe Route prendiamo il metodo get (per visualizzare una risorsa), la richiesta get deve partire quando l'utente digita l'uri
// 
Route::get('/chi-siamo' , function(){ // Qui dentro scriviamo quello che vogliamo, purche 'chi-siamo' sia parlante, perchè sarà quello che l'utente vedrà


    $arrayPatriots = [   // creo un array di patriots

        ['name'=>'The', 'surname'=>'Boss',],  // creo un array dentro un array, array chiave-valore
        ['name'=> 'Big', 'surname'=> 'Boss',],
        ['name'=> 'Major', 'surname'=>'Zero',],
        ['name'=>'Big', 'surname'=>'Mama',],

    ];


    return view('chiSiamo' , ['patriots'=>$arrayPatriots]);  // view--> metodo di Laravel che si occupa di dare le viste, view va a vedere in pratica i files dentro views
// il dato che effettivamente voglio passare sarà $arrayStudents

});   // a partire dalla classe rote prendiamo il metodo get(per visualizzare una risorsa)











//------------------------------ PAGINA HIDEO KOJIMA ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// funzione che restituisce la pagina di hideo kojima

Route::get('/hideo-kojima', function () {  
    return view('hideoKojima'); 
});
