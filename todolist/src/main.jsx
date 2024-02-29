// Importation du module React pour utiliser JSX et autres fonctionnalités React
import React from 'react';
// Importation de ReactDOM pour interagir avec le DOM
import ReactDOM from 'react-dom/client';
// Importation du composant App, qui est le composant racine de l'application
import App from './App.jsx';
// Importation du fichier CSS principal de l'application pour appliquer des styles globaux
import './index.css';

// Création d'une racine ReactDOM. `document.getElementById('root')` obtient l'élément du DOM où votre app sera montée.
// Cette approche est spécifique à React 18 et ultérieur, où le nouveau client ReactDOM est utilisé.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application React dans l'élément 'root' du DOM.
// `<React.StrictMode>` est un utilitaire qui active des vérifications et des avertissements supplémentaires pour ses enfants.
// Cela aide à identifier des problèmes potentiels dans une application, comme l'utilisation de méthodes de cycle de vie dépréciées.
root.render(
  <React.StrictMode>
    <App /> {/* Le composant App est rendu ici. */}
  </React.StrictMode>,
);
