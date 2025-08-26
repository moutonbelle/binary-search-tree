export default class Tree {
  constructor(data) {
    if (data.length === 0) {
      this.root = null;
      return;
    }

    data.sort((a, b) => a - b);

    // Deduplicate sorted array
    let dataUnique = [],
      j = 0;
    dataUnique[0] = data[0];
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== dataUnique[j]) {
        j++;
        dataUnique[j] = data[i];
      }
    }

    this.root = this.buildTree(dataUnique);
  }

  buildTree(data, start = 0, end = data.length) {
    if (start >= end) return null;

    let mid = Math.floor((end - start) / 2) + start;
    let newNode = new Node(data[mid]);
    newNode.left = this.buildTree(data, start, mid);
    newNode.right = this.buildTree(data, mid + 1, end);
    return newNode;
  }

  insertRecurse(data, subtreeRoot) {
    if (data === subtreeRoot.data) return;
    else if (data < subtreeRoot.data) {
      if (subtreeRoot.left === null) subtreeRoot.left = new Node(data);
      else this.insertRecurse(data, subtreeRoot.left);
    } else if (data > subtreeRoot.data) {
      if (subtreeRoot.right === null) subtreeRoot.right = new Node(data);
      else this.insertRecurse(data, subtreeRoot.right);
    }
  }

  insert(data, ...rest) {
    if (this.root === null) this.root = new Node(data);
    else this.insertRecurse(data, this.root);
    rest.forEach((item) => this.insertRecurse(item, this.root));
    return this;
  }

  insertIterative(data) {
    if (this.root === null) this.root = new Node(data);
    let curr = this.root;
    while (1) {
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

  // Handle special case of root; if not root, explore subtrees recursively
  deleteItem(data) {
    if (this.root === null) return false;
    else if (data === this.root.data) return this.deleteRoot();
    else if (data < this.root.data)
      return this.deleteItemFromSubtree(data, this.root, "left");
    else if (data > this.root.data)
      return this.deleteItemFromSubtree(data, this.root, "right");
  }

  // Explore subtrees recursively
  deleteItemFromSubtree(data, parent, direction) {
    let target = parent[direction];
    if (target === null) return false;
    if (data === target.data) return this.deleteNode(parent, direction);
    if (data < target.data)
      return this.deleteItemFromSubtree(data, target, "left");
    if (data > target.data)
      return this.deleteItemFromSubtree(data, target, "right");
  }

  // Special handling for when node to be deleted is root (no parent)
  deleteRoot() {
    if (this.root.left === null && this.root.right === null) this.root = null;
    else if (this.root.left !== null && this.root.right === null)
      this.root = this.root.left;
    else if (this.root.left === null && this.root.right !== null)
      this.root = this.root.right;
    else if (this.root.left !== null && this.root.right !== null) {
      this.root.data = this.min(this.root);
    }
    return true;
  }

  // General case for deleting a node, specified by parent node and direction from parent
  deleteNode(parent, direction) {
    let target = parent[direction];
    if (target.left === null && target.right === null) parent[direction] = null;
    else if (target.left !== null && target.right === null)
      parent[direction] = target.left;
    else if (target.left === null && target.right !== null)
      parent[direction] = target.right;
    else if (target.left !== null && target.right !== null) {
      target.data = this.min(target);
    }
    return true;
  }

  // Find the minimum value from right subranch of tree, delete node containing it, return the value
  // (used to implement deletion of a node with two children, see deleteNode())
  min(target) {
    let parent = target;
    let direction = "right";
    let curr = parent[direction];

    while (curr.left) {
      parent = curr;
      direction = "left";
      curr = curr.left;
    }

    let data = curr.data;
    this.deleteNode(parent, direction);
    return data;
  }

  deleteItemIterative(data) {
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
    if (curr.left === null && curr.right === null) {
      if (curr === this.root) this.root = null;
      else prev[path] = null;
    } else if (curr.left !== null && curr.right === null) {
      if (curr === this.root) this.root = curr.left;
      else prev[path] = curr.left;
    } else if (curr.left === null && curr.right !== null) {
      if (curr === this.root) this.root = curr.right;
      else prev[path] = curr.right;
    } else {
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

  find(data, start = this.root) {
    let curr = start;
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

    let q = [this.root];

    for (let i = 0; i < q.length; i++) {
      cb(q[i]);
      if (q[i].left) q.push(q[i].left);
      if (q[i].right) q.push(q[i].right);
    }
  }

  levelOrderForEachRecursive(cb, q = [this.root]) {
    if (typeof cb !== "function")
      throw new Error("No callback function provided");
    if (q.length === 0 || q[0] === null) return;
    if (q[0].left !== null) q.push(q[0].left);
    if (q[0].right !== null) q.push(q[0].right);
    cb(q[0]);
    q.splice(0, 1);
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
    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
  }

  depth(data, curr = this.root) {
    if (curr === null) return null;
    else if (data === curr.data) return 0;
    else if (data < curr.data) {
      let leftDepth = this.depth(data, curr.left);
      return leftDepth === null ? null : leftDepth + 1;
    } else if (data > curr.data) {
      let rightDepth = this.depth(data, curr.right);
      return rightDepth === null ? null : rightDepth + 1;
    }
  }

  isBalanced(node = this.root) {
    let balanceHeight = (n) => {
      if (n === null) return 0;
      let leftHeight = balanceHeight(n.left);
      if (leftHeight === -1) return -1;
      let rightHeight = balanceHeight(n.right);
      if (rightHeight === -1) return -1;
      return Math.abs(leftHeight - rightHeight) > 1
        ? -1
        : Math.max(leftHeight, rightHeight) + 1;
    };
    return balanceHeight(node) === -1 ? false : true;
  }

  rebalance() {
    let data = [];
    this.inOrderForEach((item) => data.push(item.data));
    this.root = this.buildTree(data);
  }
}

class Node {
  constructor(data = 0) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
