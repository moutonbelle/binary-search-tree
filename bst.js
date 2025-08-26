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

  deleteItem(data) {
    // Find the item, keeping a trailing pointer
    let curr = this.root;
    let prev = curr;
    let path = "";
    while (curr !== null) {
      if (curr.data === data) break;
      else if (data < curr.data) {
        prev = curr;
        path = "left";
        curr = curr.left;
      } else if (data > curr.data) {
        prev = curr;
        path = "right";
        curr = curr.right;
      }
    }

    // If we didn't find it return false
    if (curr === null) return false;

    // We found it, so now delete it
    if (curr.left === null && curr.right === null) prev[path] = null;
    else if (curr.left !== null && curr.right === null) prev[path] = curr.left;
    else if (curr.left === null && curr.right !== null) prev[path] = curr.right;
    else {
      // Node to delete has two children; find maximum of left branch
      let max = curr.left;
      let prevMax = curr;
      let maxPath = "left";
      while (max.right !== null) {
        prevMax = max;
        max = max.right;
        maxPath = "right";
      }

      // Replace node to be deleted with maximum of left branch
      curr.data = max.data;

      // Delete max of left branch, now that data has been moved
      prevMax[maxPath] = max.left;
    }
  }

  find(data) {
    let curr = this.root;
    while (curr !== null) {
      if (curr.data === data) return curr;
      if (data < curr.data) curr = curr.left;
      else if (data > curr.data) curr = curr.right;
    }
    return null;
  }
}

class Node {
  constructor(data = 0) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
