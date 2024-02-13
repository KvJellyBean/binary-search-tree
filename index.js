import Tree from "./Tree.js";

function createArray(length) {
  let array = [];
  for (let index = 0; index < length; index++) {
    array[index] = Math.floor(Math.random() * 100);
  }
  return array;
}

const myBST = new Tree(createArray(15));

console.log(myBST.isBalance());

console.log(myBST.levelOrder());
console.log(myBST.preOrder());
console.log(myBST.postOrder());
console.log(myBST.inOrder());

myBST.insert(101);
myBST.insert(102);
myBST.insert(103);

console.log(myBST.isBalance());

console.log(myBST.rebalance());

console.log(myBST.isBalance());

console.log(myBST.levelOrder());
console.log(myBST.preOrder());
console.log(myBST.postOrder());
console.log(myBST.inOrder());
