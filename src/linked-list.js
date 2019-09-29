const Node = require('./node');

class LinkedList {

    constructor() {
        this.length = 0;
        this._head = new Node();
        this._tail = new Node();
    }

    append(data) {
        if (this.length == 0) {
            this.length += 1;
            this[data] = new Node(data);
            this[data].prev = null;
            this[data].next = null;
            this[data].position = 0;
            return this;
        } else {
            for (var prop in this) {
                var tempProp = prop;
                if (tempProp == 'length')
                    tempProp = data;
                if (this[prop].next == null && data != Number(tempProp)) {
                    this[data] = new Node(data);
                    this[prop].next = this[data];
                    this[data].prev = this[prop];
                    this[data].next = null;
                    this[data].position = this.length;
                    this.length += 1;
                    return this;
                    ;
                }
            }
        }
        return this;
    }

    head() {
        if (this.length != 0) {
            for (var prop in this) {
                if (this[prop].position == 0) {
                    return this[prop].data;
                }
            }
        }
        return null;
    }

    tail() {
        if (this.length != 0) {
            for (var prop in this) {
                if (this[prop].next == null) {
                    return this[prop].data;
                }
            }
        }
        return null;
    }

    at(index) {
        for (var prop in this) {
            if (this[prop].position == index)
                return this[prop].data;
        }
        return null;
    }

    insertAt(index, data) {
        if (this.length - 1 >= index && index >= 0) {
            for (var prop in this) {
                if (this[prop].position >= index) {
                    this[prop].position += 1;
                }
            }
            this[data] = new Node(data);
            this[data].position = index;

            if (index == 0) {
                this[data].prev = null;
                this[data].next = this.getObject(index + 1);
                this.getObject(1).prev = this[data];
                this.length += 1;
                return this;
            }

            if (index == this.length - 1) {
                this.getObject(index + 1).prev = this[data];
                this[data].next = this.getObject(index + 1);
                this[data].prev = this.getObject(index - 1);
                this.length += 1;
                return this;
            }

            this[data].next = this.getObject(index + 1);
            this[data].prev = this.getObject(index - 1);
            this.getObject(index + 1).prev = this[data];
            this.length += 1;
        } else {
            return this.append(data);
        }
        return this;
    }

    isEmpty() {
        if (this.length == 0)
            return true;
        return false;
    }

    clear() {

        for (var prop in this) {
            delete this[prop];
        }
        this.length = 0;
        return this;

    }

    deleteAt(index) {
        if (index <= this.length - 1 && index >= 0) {
            delete this[this.getObject(index).data];
            for (var i = index + 1; i <= this.length - 1; i++) {
                this.getObject(i).position -= 1;
            }
            if (index == 0) {
                if (this.length != 1)
                    this.getObject(index).prev = null;
            } else if (index == this.length - 1) {
                if (this.length != 1)
                    this.getObject(index).next = null;
            } else {
                this.getObject(index).prev = this.getObject(index - 1);
                this.getObject(index - 1).next = this.getObject(index);
            }
            this.length -= 1;
        }
        return this;
    }

    reverse() {
        for (var i = 0; i < this.length / 2; i++) {
            if (this.length % 2 != 0) {
                var value = this.getObject(i);
                var buf = value.next;
                value.next = value.prev;
                value.prev = buf;
            }

            var start = this.getObject(i);

            var end = this.getObject(this.length - i - 1);

            var bufPos = start.position;
            start.position = end.position;
            end.position = bufPos;
            ;

            var bufRef = start.next;
            start.next = start.prev;
            start.prev = bufRef;

            bufRef = end.next;
            end.next = end.prev;
            end.prev = bufRef;
        }
        return this;
    }

    indexOf(data) {
        for (var prop in this) {
            if (this[prop].data === data)
                return this[prop].position;
        }
        return -1;
    }

    getObject(index) {
        for (var prop in this) {
            if (this[prop].position == index) {
                return this[prop];
            }
        }
    }
}

module.exports = {
    LinkedList
};
