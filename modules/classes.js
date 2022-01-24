class Task {
    constructor(id, name, body, priority, priorityIndex, check = false) {
        this.id = id;
        this.name = name;
        this.body = body;
        this.priority = priority;
        this.priorityIndex = priorityIndex;
        this.check = check;
    }
}
class Account {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}
export {Task, Account};