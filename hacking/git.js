class Commit {
    constructor(id, message) {
        this.id = id;
        // Assume that 'this' has a 'change' property too.
        this.message = message;

    }
}


class Git {
    constructor(name) {
        this.name = name || "my-repo";
        // Repo name
        this.lastCommitId = -1;
        //keep track of the commit ids 
    }
    commit() {
        return new Commit(++this.lastCommitId, message);
    }
}





var repo = new Git();
// Actual command:
// > git init