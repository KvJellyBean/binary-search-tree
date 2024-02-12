import Node from "./Node.js";

class Tree {
  constructor(array = []) {
    this.array = this.sortArray(array);
    this.root = this.buildTree(this.array);
  }

  // Sort and remove redundant value in the array
  sortArray(array) {
    return array
      .sort((a, b) => a - b)
      .filter((value, index) => array.indexOf(value) === index);
  }

  // Make the BST Tree structure
  buildTree(array, start = 0, end = array.length - 1) {
    // Base case
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  // Insert node to the leaf node
  insert(value, root = this.root) {
    // Base case
    if (root === null) root = new Node(value);

    // Traverse to near the value
    if (value > root.data) {
      root.right = this.insert(value, root.right);
    } else if (value < root.data) {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  // Delete node
  delete(value, root = this.root) {
    // Base case
    if (root === null) return root;

    // Traverse to near the value
    if (value > root.data) {
      root.right = this.delete(value, root.right);
      return root;
    } else if (value < root.data) {
      root.left = this.delete(value, root.left);
      return root;
    }

    // Case if the node that we want to delete has one/no child
    if (root.left === null) {
      const newRightNode = root.right;
      root = null;
      return newRightNode;
    } else if (root.right === null) {
      const newLeftNode = root.left;
      root = null;
      return newLeftNode;
    }
    // Case if the node that we want to delete has two children
    else {
      let successorParent = root;
      let successor = root.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }

      root.data = successor.data;
      successor = null;
      return root;
    }
  }

  // Find a value
  find(value, root = this.root) {
    // Base case
    if (root === null) return null;
    if (root.data === value) return root;

    if (value > root.data) {
      return this.find(value, root.right);
    }
    return this.find(value, root.left);
  }

  // Level order traversal
  levelOrder(root = this.root, queue = [], result = []) {
    // Base case
    if (root === null) return null;
    queue.push(root);

    while (queue.length) {
      let currentNode = queue[0];
      result.push(currentNode.data);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      queue.shift();
    }
    return result;
  }

  // Recursive levelOrder traversal
  // levelOrder(root = this.root, queue = [], result = []) {
  // Base case
  //   if (root === null) return null;
  //   result.push(root.data);

  //   if (root.left !== null) queue.push(root.left);
  //   if (root.right !== null) queue.push(root.right);

  //   while (queue.length) {
  //     let currentNode = queue[0];
  //     queue.shift();
  //     this.levelOrder(currentNode, queue, result);
  //   }
  //   return result;
  // }

  // Inorder traversal
  inOrder(root = this.root, result = []) {
    if (root === null) return;

    this.inOrder(root.left, result);
    result.push(root.data);
    this.inOrder(root.right, result);

    return result;
  }

  // Preorder traversal
  preOrder(root = this.root, result = []) {
    if (root === null) return;

    result.push(root.data);
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);

    return result;
  }

  // Postorder traversal
  postOrder(root = this.root, result = []) {
    if (root === null) return;

    this.postOrder(root.left, result);
    this.postOrder(root.right, result);
    result.push(root.data);

    return result;
  }

  // Count the height of tree from a `node` to leaf node
  height(node) {
    if (node === null) return -1;
    const leftBST = this.height(node.left);
    const rightBST = this.height(node.right);
    return Math.max(leftBST, rightBST) + 1;
  }

  // Count the depth of tree from root to the given node
  depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return 0;
    if (root == node) return depth;

    if (node.data < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  // Check balanced tree
  isBalance() {
    const counter = this.height(this.root.left) - this.height(this.root.right);
    return counter <= 1 && counter >= -1;
  }

  // Balance the tree
  rebalance() {
    this.root = this.buildTree(this.inOrder(this.root));
  }

  // Visualize the tree
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

export default Tree;
