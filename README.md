# Muscu

Web app de musculation pour iPhone : séances A/B/C, chrono, charges et historique.
Elle s'installe sur l'écran d'accueil et fonctionne sans réseau.

## Contenu (8 fichiers, tous au même niveau)

- `index.html` : l'app (programme, écrans et logique)
- `manifest.webmanifest`, `sw.js` : installation sur l'écran d'accueil et fonctionnement hors ligne
- `plaque-bold.woff` : police d'affichage (licence en bas de ce fichier)
- `icon-180.png`, `icon-192.png`, `icon-512.png` : icône de l'app
- `README.md` : ce guide

## Mettre l'app en ligne depuis l'iPhone (GitHub Pages, gratuit)

1. Dans l'app Claude, ouvre `muscu-app.zip`, touche **Partager** puis **Enregistrer dans Fichiers**. Dans l'app Fichiers, touche le zip : il se décompresse en un dossier `muscu`.
2. Ouvre **github.com dans Safari**, pas dans l'app GitHub. Dans le menu de la page (bouton **aA** ou **•••**), choisis **Demander le site pour ordinateur**.
3. Crée le dépôt si ce n'est pas fait : **+ → New repository**, nom `muscu`, **Public** (obligatoire pour GitHub Pages gratuit ; le dépôt ne contient jamais tes données), puis **Create repository**.
4. Dans le dépôt : **Add file → Upload files** (sur un dépôt vide : lien **uploading an existing file**). Touche **choose your files**, puis **Choisir des fichiers**. Ouvre le dossier `muscu`, touche **Sélectionner**, sélectionne les 8 fichiers, puis **Ouvrir**. Termine avec **Commit changes**.
5. **Settings → Pages**. Dans « Build and deployment », choisis **Deploy from a branch**, la branche **main**, le dossier **/ (root)**, puis **Save**.
6. Après une ou deux minutes, l'adresse s'affiche en haut de la page Pages : `https://<ton-identifiant>.github.io/muscu/`.

Depuis un ordinateur, c'est plus simple : glisse les 8 fichiers sur la page **Upload files**, puis fais l'étape 5.

## Installer sur l'iPhone

1. Ouvre l'adresse de l'app dans **Safari**.
2. Touche **Partager**, puis **Sur l'écran d'accueil**. Laisse activée l'ouverture en app web, puis touche **Ajouter**.
3. Lance l'app une première fois avec du réseau. Elle se met en cache et marche ensuite hors ligne.

## Photos des exercices

Chaque exercice affiche une photo indicative : une vignette dans la liste, et dans la fiche de validation les positions de départ et d'arrivée qui alternent pour montrer le mouvement. Elles viennent de la base libre [free-exercise-db](https://github.com/yuhonas/free-exercise-db) : l'app les télécharge au premier lancement avec du réseau, puis les garde pour l'usage hors ligne. La machine de ta salle peut différer de celle de la photo ; quand la photo montre une variante (haltères, poulie…), c'est indiqué sous l'image.

Pour changer la photo d'un exercice : tableau `PHOTOS` en haut du script, dans `index.html`.

## À savoir

- **Tes données restent sur le téléphone**, dans l'app. Si tu supprimes l'icône, elles sont effacées. Exporte-les de temps en temps : **Historique → Sauvegarde → Exporter**, puis « Enregistrer dans Fichiers ». **Importer** permet de les restaurer.
- **Mise à jour** : remplace les fichiers modifiés sur GitHub (pour la v1.1 : `index.html` et `sw.js`). L'app charge la nouvelle version en arrière-plan et l'affiche au lancement suivant. Si la police ou les icônes changent, change aussi la valeur `CACHE` en haut de `sw.js`.
- **Modifier le programme** : tableau `PROGRAM` en haut du script, dans `index.html`. Ne change pas les `id` des exercices : ce sont eux qui relient l'historique aux exercices.

## Licence de la police

`plaque-bold.woff` est un sous-ensemble renommé de TeX Gyre Heros Cn Bold, distribué selon la GUST Font License, reproduite ci-dessous.

```
% This is a preliminary version (2006-09-30), barring acceptance from
% the LaTeX Project Team and other feedback, of the GUST Font License.
% (GUST is the Polish TeX Users Group, http://www.gust.org.pl)
%
% For the most recent version of this license see
% http://www.gust.org.pl/fonts/licenses/GUST-FONT-LICENSE.txt
% or
% http://tug.org/fonts/licenses/GUST-FONT-LICENSE.txt
%
% This work may be distributed and/or modified under the conditions
% of the LaTeX Project Public License, either version 1.3c of this
% license or (at your option) any later version.
% 
% Please also observe the following clause:
% 1) it is requested, but not legally required, that derived works be
%    distributed only after changing the names of the fonts comprising this
%    work and given in an accompanying "manifest", and that the
%    files comprising the Work, as listed in the manifest, also be given
%    new names. Any exceptions to this request are also given in the
%    manifest.
%    
%    We recommend the manifest be given in a separate file named
%    MANIFEST-<fontid>.txt, where <fontid> is some unique identification
%    of the font family. If a separate "readme" file accompanies the Work, 
%    we recommend a name of the form README-<fontid>.txt.
%
% The latest version of the LaTeX Project Public License is in
% http://www.latex-project.org/lppl.txt and version 1.3c or later
% is part of all distributions of LaTeX version 2006/05/20 or later.
```
