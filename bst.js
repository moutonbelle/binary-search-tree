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

  levelOrderForEach(cb) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (this.root === null) return;
    cb(this.root);

    let q = [],
      i = 0;
    if (this.root.left !== null) q.push(this.root.left);
    if (this.root.right !== null) q.push(this.root.right);

    if (q.length > 0) {
      while (i < q.length) {
        cb(q[i]);
        if (q[i].left !== null) q.push(q[i].left);
        if (q[i].right !== null) q.push(q[i].right);
        i++;
      }
    }
  }

  levelOrderForEachRecursive(cb, q = [this.root]) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (q.length === 0 || q[0] === null) return;
    if (q[0].left !== null) q.push(q[0].left);
    if (q[0].right !== null) q.push(q[0].right);
    cb(q[0]);
    q.shift();
    this.levelOrderForEachRecursive(cb, q);
  }

  inOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (node === null) return;
    this.inOrderForEach(cb, node.left);
    cb(node);
    this.inOrderForEach(cb, node.right);
  }

  preOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (node === null) return;
    cb(node);
    this.preOrderForEach(cb, node.left);
    this.preOrderForEach(cb, node.right);
  }

  postOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (node === null) return;
    this.postOrderForEach(cb, node.left);
    this.postOrderForEach(cb, node.right);
    cb(node);
  }

  height(data) {
    let node = this.find(data);
    if (node === null) return null;
    return this.getHeight(node);
  }

  getHeight(node) {
    if (node.left === null && node.right === null) return 0;
    let leftHeight = 0,
      rightHeight = 0;
    if (node.left !== null) leftHeight = this.getHeight(node.left);
    if (node.right !== null) rightHeight = this.getHeight(node.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
}

class Node {
  constructor(data = 0) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
