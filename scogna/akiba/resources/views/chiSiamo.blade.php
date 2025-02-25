<!doctype html>

<html lang="en">


  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>

  <body>



  <!--navbar start-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>  <!--uri della home-->
        </li>

        <li class="nav-item">
          <a class="nav-link active" href="/chi-siamo">Chi siamo</a> <!--uri di chi siamo-->
        </li>

        <li class="nav-item">
          <a class="nav-link active" href="/hideo-kojima">Hideo Kojima</a> <!--uri di hideo kojima-->
          
        </li>
      </ul>
    </div>
  </div>
</nav>
<!--navbar end-->



  <div class="container-fluid bg-body-secondary vh-100">
        <div class="row justify-content-center align-items-center">
           <div class="col-12">
               <h1 class="text-center py-5">

            Chi siamo 

                </h1>
            </div>
         </div>

         <div class="row">

        
        <div class="col-12">
          <ul>  <!-- Dentro ul avro bisogno dei list item, e i list item dovranno contenere gli elementi ciclati di $students e quindi farò il foreach -->

          @foreach ( $patriots as $patriot ) <!-- $student sarà la variabile d'appoggio che serve per ciclare l'array $students -->

<li> {{$patriot['name']}} {{$patriot['surname']}}  </li>  <!-- uso $student per arrivare al singolo studente, e scrivero [name] per vedere solo il nome -->

          @endforeach

          </ul>
        </div>
         <!-- la graffa è come se stesse facendo l' echo, e l'echo non puo stampare un dato complesso -->

         </div>
   </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
</html>