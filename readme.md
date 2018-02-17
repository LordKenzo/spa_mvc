# Dipendenze NPM

```
npm i express --save
npm i -D happypack webpack ts-loader typescript clean-webpack-plugin lit-html
```

# Idea generale

Il framework è composto da un container, l'`App Container`, che racchiude le nostre pagine che carichiamo.
Quindi abbiamo bisogno di una classe **App** che conterrà i metodi che supportano la visualizzazione e la de-visualizzazione delle nostre **Pagine**. Quindi dovrà conoscere le Pagine che la compongono.

La classe **Pagina** è composta da oggetti componenti che sono il cuore visivo e comportamentale della nostra applicazione. Una pagina dovrà conoscere pertanto i suoi componenti, caricarli (o "distruggerli"?). Una pagina può "vivere" anche se non è quella attualmente visualizzata? Una pagina dovrà sottostare a criteri di sicurezza?

Quando clicco su un link (normale/hashed) cosa succede? Un link deve essere mappato con una pagina che dovrà essere una pagina valida dell'App, solo a questo punto il **Router** avviserà la mia App per il caricamento. Ho quindi bisogno di una classe **Router** che mappa un collegamento con una pagina, verificare se è appartenente alla App e, in caso affermativo, "avvisare" per la visualizzazione, altrimenti visualizza un messaggio di errore.

# La classe App

La classe **App** estenderà la classe **HTMLElement**.

La classe accetta una stringa che identifica l'elemento HTML tramite l'id.