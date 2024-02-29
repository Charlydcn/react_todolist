// Importation des styles CSS spécifiques à ce composant pour le styliser.
import './CSS/TodoItems.css';
// Importation des images qui seront utilisées comme icônes dans l'interface utilisateur.
import tick from './Assets/tick.svg';
import notTick from './Assets/not_tick.svg';
import cross from './Assets/cross.svg';

// Déclaration du composant TodoItems avec ses props : numéro, affichage, texte, et la fonction setTodos pour mettre à jour l'état.
const TodoItems = ({no, display, text, setTodos}) => {

    // Fonction deleteTodo qui supprime l'élément courant de la liste de tâches.
    const deleteTodo = (no) => {
        let data = JSON.parse(localStorage.getItem('todos')); // Chargement des tâches depuis localStorage.
        data = data.filter((todo) => todo.no !== no); // Filtrage des tâches pour enlever celle supprimée.
        setTodos(data); // Mise à jour de l'état des tâches avec la nouvelle liste.
    }

    // Fonction toggle qui modifie l'état de l'élément courant pour indiquer s'il est terminé ou non.
    const toggle = (no) => {
        let data = JSON.parse(localStorage.getItem('todos')); // Chargement des tâches depuis localStorage.
        for (let i = 0; i < data.length; i++) {
            if (data[i].no === no) { // Recherche de la tâche spécifique.
                if (data[i].display === "") {
                    data[i].display = "line-through"; // Marquage de la tâche comme terminée.
                } else {
                    data[i].display = ""; // Retour à l'état non terminé si déjà marquée.
                }
                break;
            }
        }
        setTodos(data); // Mise à jour de l'état avec les modifications.
    }

    // Rendu du composant avec JSX.
    return (
        <div className='todoitems'>
            {/* Container de l'élément de la tâche avec gestion du clic pour marquer comme terminée/non terminée. */}
            <div
                className={`todoitems-container ${display}`}
                onClick={() => {
                    toggle(no);
                }}>

                {/* Image indiquant si la tâche est marquée comme terminée ou non. */}
                <img
                    className='fa-solid'
                    src={display === "" ? notTick : tick}
                    alt="" />

                {/* Texte de la tâche. */}
                <div className="todoitems-text">{text}</div>
            </div>
            {/* Icône pour supprimer la tâche, avec gestion du clic pour appeler deleteTodo. */}
            <img
                onClick={() => {deleteTodo(no)}}
                className='fa-solid todoitems-cross-icon'
                src={cross}
                alt="" />
        </div>
    );
}

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application.
export default TodoItems;
