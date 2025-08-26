export default class Tree {
  constructor(values) {
    this.root = this.buildTree(values);
  }

  buildTree(values) {
    values.sort((a, b) => a - b);
    console.log(values);

    // Deduplicate sorted array
    for (let i = 0; i < values.length; i++) {
      let j = i + 1;
      if (j < values.length && values[j] === values[i]) {
        let duplicates = 1;
        for (j += 1; j < values.length && values[j] === values[i]; j++)
          duplicates++;
        values.splice(i + 1, duplicates);
      }
    }

    console.log(values);
  }
}

class Node {
  constructor(value = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
