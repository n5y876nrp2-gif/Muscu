# Muscu

Web app de musculation pour iPhone : séances A/B/C, chrono, charges et historique.
Elle s'installe sur l'écran d'accueil et fonctionne sans réseau.

## Contenu

- `index.html` : l'app (programme, écrans et logique, tout en un fichier)
- `manifest.webmanifest`, `sw.js` : installation sur l'écran d'accueil et fonctionnement hors ligne
- `fonts/` : police d'affichage (TeX Gyre Heros Cn Bold, licence GUST, sous-ensemble renommé « Plaque »)
- `icons/` : icône de l'app

## Mettre l'app en ligne (GitHub Pages, gratuit)

1. Sur github.com, crée un dépôt nommé `muscu`, en **Public** (obligatoire pour GitHub Pages gratuit). Il ne contiendra que l'app et le programme, jamais tes données.
2. Dans le dépôt : **Add file → Upload files**, puis glisse tout le contenu de ce dossier (les fichiers et les dossiers `fonts` et `icons`). Valide avec **Commit changes**.
3. **Settings → Pages**. Dans « Build and deployment », choisis la source **Deploy from a branch**, la branche **main** et le dossier **/ (root)**, puis **Save**.
4. Après une ou deux minutes, l'adresse de l'app s'affiche en haut de la page : `https://<ton-identifiant>.github.io/muscu/`.

## Installer sur l'iPhone

1. Ouvre l'adresse dans **Safari**.
2. Touche **Partager**, puis **Sur l'écran d'accueil**. Laisse activée l'ouverture en app web, puis touche **Ajouter**.
3. Lance l'app une première fois avec du réseau. Elle se met en cache et marche ensuite hors ligne.

## À savoir

- **Tes données restent sur le téléphone**, dans l'app. Si tu supprimes l'icône, elles sont effacées. Exporte-les de temps en temps : **Historique → Sauvegarde → Exporter**, puis « Enregistrer dans Fichiers ». **Importer** permet de les restaurer.
- **Mise à jour** : remplace les fichiers sur GitHub. L'app charge la nouvelle version en arrière-plan et l'affiche au lancement suivant. Si la police ou les icônes changent, change aussi la valeur `CACHE` en haut de `sw.js`.
- **Modifier le programme** : tableau `PROGRAM` en haut du script, dans `index.html`. Ne change pas les `id` des exercices : ce sont eux qui relient l'historique aux exercices.
