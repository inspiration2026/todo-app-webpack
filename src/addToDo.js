import {DOM} from "./DOM.js";

export const list = [];
export class toDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }
    
    static addToDo (title, description, dueDate, priority) {
        const newToDo = new toDoItem(title, description, dueDate, priority);
        list.push (newToDo);
        // need to remove dispaly from here later !
        // DOM.displayItem(newToDo);
        return newToDo;
    }
    static removeToDo (id) {
        list.splice(id, 1);
    }

}