import Tree from "./bst.js";

let bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(bst.root);

console.log(bst.isBalanced());
bst.insert(321);
bst.insert(320);
bst.insert(319);

prettyPrint(bst.root);
console.log(bst.isBalanced());

bst.rebalance();
prettyPrint(bst.root);
console.log(bst.isBalanced());
