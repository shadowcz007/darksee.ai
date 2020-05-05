class MyRegex {
    static getInstance(...arg) {
        if (!MyRegex.instance) MyRegex.instance = new MyRegex(arg);
        return MyRegex.instance;
    }
    constructor() {
        console.log('运行一次')
    }

    matchOne(pattern, text) {
        if (!pattern) return true;
        if (!text) return false;
        return pattern === "." || text === pattern;
    }

    match(pattern, text) {
        if (!pattern) return true;
        else if (!text && pattern === "$") return true;
        else if (pattern[1] === "?") {
            return this.matchQuestion(pattern, text);
        } else if (pattern[1] === "*") {
            return this.matchStar(pattern, text);
        } else if (pattern[0] === "(") {
            return this.matchGroup(pattern, text);
        } else {
            return this.matchOne(pattern[0], text[0]) && this.match(pattern.slice(1), text.slice(1));
        }
    }

    search(pattern, text) {
        if (pattern[0] === "^") {
            return this.match(pattern.slice(1), text);
        } else {
            return this.match(".*" + pattern, text);
        }
    }

    matchQuestion(pattern, text) {
        return (
            (this.matchOne(pattern[0], text[0]) && this.match(pattern.slice(2), text.slice(1))) ||
            this.match(pattern.slice(2), text)
        );
    }
    matchStar(pattern, text) {
        return (
            (this.matchOne(pattern[0], text[0]) && this.match(pattern, text.slice(1))) ||
            this.match(pattern.slice(2), text)
        );
    }
    matchGroup(pattern, text) {
        const groupEnd = pattern.indexOf(")");
        const groupPattern = pattern.slice(1, groupEnd);
        if (pattern[groupEnd + 1] === "?") {
            const remainderPattern = pattern.slice(groupEnd + 2); // +2 needed to slice off the ')?'
            return (
                (this.match(groupPattern, text.slice(0, groupPattern.length)) &&
                    this.match(remainderPattern, text.slice(groupPattern.length))) ||
                this.match(remainderPattern, text)
            );
        } else if (pattern[groupEnd + 1] === "*") {
            const remainderPattern = pattern.slice(groupEnd + 2); // +2 needed to slice off the ')*'
            return (
                (this.match(groupPattern, text.slice(0, groupPattern.length)) &&
                    this.match(pattern, text.slice(groupPattern.length))) ||
                this.match(remainderPattern, text)
            );
        } else {
            const remainderPattern = pattern.slice(groupEnd + 1); // +1 needed to slice off the ')'
            return (
                this.match(groupPattern, text.slice(0, groupPattern.length)) &&
                this.match(remainderPattern, text.slice(groupPattern.length))
            );
        }
    }
}