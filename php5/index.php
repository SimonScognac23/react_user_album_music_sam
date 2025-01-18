<?php


// creazione dell'array di utenti
$users = [
    ['name' => 'Arthur', 'surname' => 'Morgan', 'gender' => 'M'], 
    ['name' => 'Dutch', 'surname' => 'van der Linde', 'gender' => 'M'], 
    ['name' => 'Sadie', 'surname' => 'Adler', 'gender' => 'F'], 
    ['name' => 'John', 'surname' => 'Marston', 'gender' => 'M'], 
];




// Ciclo che itera su ogni utente dell'array
foreach ($users as $user) {     // as = per ogni user fai qualcosa

    // Utilizziamo uno switch per determinare il saluto in base al gender
    switch ($user['gender']) {    
        case 'M':  // Se il genere è maschile ('M'), il titolo sarà "Sig."
            $salutation = 'Sig.';
            break;
        case 'F':  // Se il genere è femminile ('F'), il titolo sarà "Sig.ra"
            $salutation = 'Sig.ra';
            break;
        default:  // default viene usato se non viene rispettato nessuno dei due casi sopra elencati
            $salutation = ''; 
            break;
    }




    // Stampiamo direttamente il messaggio ciclando tramite l'utente, user rappresenta ogni singolo elemtneo all'interno dell array
    echo 'Buongiorno ' . $salutation . ' ' . $user['name'] . ' ' . $user['surname'] . "\n";  // \n aggiunge una nuova riga
}

?>
