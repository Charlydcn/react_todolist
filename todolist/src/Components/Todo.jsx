// Importation des hooks nécessaires depuis React
import { useEffect, useState, useRef } from 'react';
// Importation du fichier CSS pour styliser le composant
import './CSS/Todo.css';
// Importation du composant TodoItems qui représente chaque tâche de la liste
import TodoItems from './TodoItems';

// Variable de comptage pour assigner un identifiant unique à chaque tâche
let count = 0;

// Définition du composant fonctionnel Todo
const Todo = () => {
    // useState pour gérer l'état des tâches (todos)
    const [todos, setTodos] = useState([]);
    // useRef pour accéder directement à l'élément input dans le DOM
    const inputRef = useRef(null);

    // Fonction pour ajouter une nouvelle tâche à la liste
    const add = () => {
        setTodos([
            ...todos, 
            {
                no: count++, // Ajout d'un identifiant unique à la tâche
                text: inputRef.current.value, // Utilisation de la valeur actuelle de l'input
                display: "",
            }
        ]);
        inputRef.current.value = ""; // Réinitialisation de l'input après ajout
        localStorage.setItem('todos_count', count) // Mise à jour du compteur dans localStorage
    }

    // Hook useEffect pour charger les tâches sauvegardées dans localStorage au montage du composant
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos') || '[]')); // Chargement des tâches
        count = parseInt(localStorage.getItem('todos_count') || '0'); // Mise à jour du compteur basé sur localStorage
    }, []); // Le tableau vide indique que cet effet ne s'exécute qu'au montage du composant

    // Hook useEffect pour sauvegarder l'état actuel des tâches dans localStorage à chaque modification de `todos`
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log(todos);
            localStorage.setItem('todos', JSON.stringify(todos)); // Sauvegarde des tâches dans localStorage
        }, 100);
        return () => clearTimeout(timeoutId); // Nettoyage en annulant le timeout si le composant est démonté avant son exécution
    }, [todos]); // Cet effet s'exécute à chaque modification de `todos`

    // JSX retourné par le composant, décrivant l'UI de la liste de tâches
    return (
        <div className='todo'>
            <div className="todo-header">
                To-Do List ({localStorage.getItem('todos_count')}) {/* Affichage du nombre de tâches */}
            </div>
            
            <div className="todo-add">
                <input
                    ref={inputRef} // Association de l'input avec le useRef
                    className='todo-input'
                    placeholder="Add your task"
                    type="text"
                />

                <div
                    onClick={add} // Appel de la fonction add lors du clic sur le bouton
                    className="todo-add-btn">
                    ADD
                </div>
                
            </div>

            <div className="todo-list">
                {todos.map((item, i) => ( // Génération des TodoItems pour chaque tâche
                    <TodoItems
                        key={i}
                        setTodos={setTodos}
                        no={item.no}
                        display={item.display}
                        text={item.text}/>
                ))}
            </div>
        </div>
    );
}

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default Todo;
