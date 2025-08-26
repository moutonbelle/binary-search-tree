import Tree from "./bst.js";

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

function rands(n) {
  let result = [];
  for (let i = 0; i < 100; i++) result.push(Math.floor(Math.random() * 800));
  return result;
}

let bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(bst.root);

let nst = new Tree([]);

nst.insert(7, 6, 9, 12, 15);
prettyPrint(nst.root);

// console.log("BALANCED? ", bst.isBalanced());

// let output = "";
// bst.levelOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("LEVEL: ", output);

// output = "";
// bst.preOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("PRE: ", output);

// output = "";
// bst.inOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("IN: ", output);

// output = "";
// bst.postOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("POST: ", output);

// bst.insert(805);
// bst.insert(870);
// bst.insert(990);
// bst.insert(991);

// prettyPrint(bst.root);
// console.log("BALANCED? ", bst.isBalanced());

// bst.rebalance();

// prettyPrint(bst.root);
// console.log("BALANCED? ", bst.isBalanced());

// output = "";
// bst.levelOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("LEVEL: ", output);

// output = "";
// bst.preOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("PRE: ", output);

// output = "";
// bst.inOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("IN: ", output);

// output = "";
// bst.postOrderForEach((item) => {
//   output += item.data + " ";
// });
// console.log("POST: ", output);
