Concepts
========

Proof of concepts (Expect ugly code :D )

Some quick and dirty code to try some ideas.

Vanilla is a code editor tailored to my needs and workflow.
It's purely written in HTML,JS and CSS using nodewebkit.

TODO
====
* Menu contextuel pour créer/supprimer/renommer fichier
* Synchronisation des fichiers via api watch
* Frise de navigation

* File watcher
 => FileSelected(Path)
 => FileClosed(Path)
 <= FileModified(Path)
 Gère en interne un cache des dates de modification
 Interragi indirectement avec fs.watchFile
 Complètement autonome
 
* File explorer control
 => ExplorerLoaded(Tree)
 
 <= FileSelected(path)
 <= FolderSelected(path)

 

1. Les controllers angular doivent être le plus light possible
2. communication controller <-> domaine ? Directe ou via bus ?