export default class Tree {
  constructor(data) {
    data.sort((a, b) => a - b);

    // Deduplicate sorted array
    for (let i = 0; i < data.length; i++) {
      let j = i + 1;
      if (j < data.length && data[j] === data[i]) {
        let duplicates = 1;
        for (j += 1; j < data.length && data[j] === data[i]; j++) duplicates++;
        data.splice(i + 1, duplicates);
      }
    }

    this.root = this.buildTree(data);
  }

  buildTree(data) {
    if (data.length === 0) return null;
    if (data.length === 1) return new Node(data[0]);

    let mid = Math.floor(data.length / 2);
    let newNode = new Node(data[mid]);
    newNode.left = this.buildTree(data.slice(0, mid));
    newNode.right = this.buildTree(data.slice(mid + 1, data.length));
    return newNode;
  }

  insert(data) {
    if (this.root === null) {
      this.root = new Node(data);
      return;
    }

    let curr = this.root;
    while (curr !== null) {
      if (data === curr.data) return;
      if (data < curr.data) {
        if (curr.left !== null) curr = curr.left;
        else {
          curr.left = new Node(data);
          return;
        }
      }
      if (data > curr.data) {
        if (curr.right !== null) curr = curr.right;
        else {
          curr.right = new Node(data);
          return;
        }
      }
    }
  }
}

class Node {
  constructor(data = 0) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
