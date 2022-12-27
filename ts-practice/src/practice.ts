class Queue<T> {
  list: T[] = [];
  get length(): number {
    return this.list.length;
  }
  enqueue(item: T): void {
    this.list.push(item);
  }
  dequeue(): T | undefined {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
