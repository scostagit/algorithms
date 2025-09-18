# 15 LeetCode Patterns

## 1  Prefix Sum

![](./images/prefixsum.png)

![](./images/prefixsum2.png)

you don't need a second array, you can use the input array:


![](./images/prefixsum3.png)

### Where to use?
Query sum of element in a subarray

### Exercises

 303. Range Sum Query - Immutable
 525. Contiguous Array
 560. Subarray Sum Equals K

## 2 Two Pointers

![](./images/two-pointers.png)

you can use two variable moving "i" to right and "j" to left, and both variable will meet at the middle


![](./images/two-pointers2.png)


![](./images/two-pointers3.png)


### Exercises

 167. Two Sum II - input Array is Sorted
 15.  3Sum
 11.  Container With Most Water


## 3 Sliding Window

![](./images/Sliding-window.png)

![](./images/Sliding-window1.png)


![](./images/Sliding-window2.png)

Try to change the time complixity from O(n*k) to O(n) substracting the item

### Exercises

 643. Maximum Average Subarray I
 3. Longest Substring without repeating
 73. Minimum windows Substring


## 4 Fast and Slow Pontiners

![](./images/fastPointer.png)

### How does it work?
It works moving two pointers at different speeds

![](./images/fastPointer2.png)

### Where to use?

![](./images/fastPointer1.png)


### Exercises

 141. Linked List Cycle
 202. Happy Number
 287. Find the duplicate Number


## 5 Linked List in - place Reversal

![](./images/linkedlist-reversal.png)

### How does it work

use 3 pointer:
 - current
 - previous
 - next


![](./images/linkedlist-reversal1.png)

![](./images/linkedlist-reversal2.png)

### Exercises

 24. Swap Nodes in Paris
 206. Reverse Linked List
 92. Reverse Linked List II



## 6 Monotonic Stack 

![](./images/monotonic.png)

this pattern uses a stack to find:
  - the next greater
  - the next smaller

  Forca bruta  O(n^2)
  ![](./images/monotonic1.png)

better O(n)
 start the stack with -1
 ```javascript

 var stack = [-1, -1, -1, -1, -1];

 ```

  so verify each elemnet great then -1 and pop it in the stack:

    ![](./images/monotonic2.png)

### Exercises

 496. Next Greater Element I
 739. Daily Temperatures
 84. Larget Rectangle in Histogram

## 7 Top "K" Elements 

![](./images/topK.png)   


this pattern helps to find the elments:
 - 'K' Largest
 - 'K' Smallest
 - 'K' Most Frequent

to find the smellest number in array, we can loop all item,
but we can improve like heapsort, using a binary tree:

![](./images/topK1.png)   

we reduce the the time complixity to (N log k)

![](./images/topK2.png)   

To find:
 - K LARGEST  -> min-heap
 - K SMALLEST -> max-hep

There is another pattern similar  to this one called QuickSelect, take a look it later



### Exercises

 215. Kth Largest Elment in an Aray
 347. Top K Frequent Elements
 373. Find K Pair with smsllest Sums

## 8  Overlapping Intervals
 
 ![](./images/overlaping.png)
 
 This pattern is great for solving problems where
   - Interval 
   - Ranges that may overlap

### Merging Intervals

 ![](./images/overlaping1.png)

### Interval Insersection

  ![](./images/overlaping2.png)

  ### Insert Interval 

  ![](./images/overlaping3.png)

  
  ### Find Minimum Meeting Rooms

  ![](./images/overlaping4.png)

  ### Example: 

 ![](./images/overlaping5.png)

### Exercises

 56. Merge Intervals
 57. Insert Interval
 435. Non-overlapping intervals

## 9 Modified Binary Search



 ![](./images/modifiedBinarySearch.png)

 ![](./images/modifiedBinarySearch1.png)

### Usage
- SEARHING IN A NEARLY SORTED ARRAY
- SEARHING IN A ROTATED SORTED ARRAY
- SEARHING IN A LIST WITN UNKNOW LENGTH
- SEARHING IN AN ARRAY WITH DUPLICATES
- FINDING THE FIRST OR LAST OCCURRENCE OF AN ELEMENT
- FINDIN THE SQUASRE ROOT OF A NUMBER
- FINDING A PEAK ELEMENT

### EXAMPLE

 ![](./images/modifiedBinarySearch2.png)

### Exercises

 33. Search in rotated Sorted Array
 153. Find Minmum in Rotated Sorted Array
 240. Search a 2D Matrix II

## 10 Binary Tree Traversal


 ![](./images/binarytreetranversal.png)

 ### 4 Ways to transversal a binary 
 
 ![](./images/binarytreetranversal1.png)


 - PreOrder : root -> left -> right
 - InOrder: left -> root -> right
 - PosOrder: left -> right -> root
 - LevelOrder: level by level

 ### Level by level 

 ![](./images/binarytreetranversal2.png)

how to solve: 

![](./images/binarytreetranversal3.png)

### Exercises

257. Binary Tree Path
230. Kth Smallest Element in a BST
124. Binary Tree Maximum Path Sum
107. Binary Tree level Order Traversall II

## 11 Depth-First Search (DFS)

![](./images/dfs.png)

### Usage

- FIND A PATH BETWEEN TWO NODES

![](./images/dfs1.png)

- CHECKING IF A GRAPH CONTAINS A CYCLE

![](./images/dfs2.png)

- FIND A TOPOLOGICAL ORDER IN A DIRECTED ACYCLIC GRAPH (DAG)

![](./images/dfs3.png)

- COUNTIN NUMBER OF CONNECTFD COMPONENTS IN A GRAPH

![](./images/dfs4png.png)

You solve DFS using stack and recursion

![](./images/dfs5.png)

 #### STEPS

 1. Choose a start point
 2. Check the visited nodes to avoid infite cycle
 3. Execute the necessary operaton in the current node
 4. viste the neighbors

 ### Exercises

133. Clone Graph
113. Path Sum II
210. Course Scheule II

## 12 Breadth-First Search (BFS)

![](./images/bfs.png)

### Usage

- BFS EXPLORES NODES LEVEL BY LEVEL IN A TREE OR GRAPH

### GOOD FOR

 - FINDING THE SHORTES PATH BETWEEN TWO NODES

![](./images/bfs1.png)

- PRITING ALL NODESD OF A TREE LEVEL BY LEVEL

![](./images/bfs2.png)

- FIDING ALL CONNECTEFD COMPONENTS IN GRAPH

![](./images/bfs3.png)

- FINDING THE SHORTEST  TRANSFORMATION SEQUENCE FROM ONE WORK TO OTHER

![](./images/bfs4.png)

### BFS IS QUEUEU BASED

![](./images/bfs5.png)

***lOGIC***
1 - Added an initial node into the queue
2 - set up visited mapper to make visited nodes
3 - Looping while the queue is not empty
4 - rmeove a item and process it
5 - repeat the step for neighbor nodes


 ### Exercises

102. Binary tree Level Order Traversal
994. Rotting Oranges
127. Word Ladder


## 13 Matrix Traversal

![](./images/matrix.png)

### GRAPH > MATRIC

![](./images/matrix1.png)

![](./images/matrix2.png)

***YOU CAN USE BST OR DFS TO SOLVE IT***

### Usage

- FINDING THE SHORTEST PATH IN A GRID

![](./images/matrix3.png)

 - NUMBER OF ISLAND

![](./images/matrix4.png)


 ### Exercises

733. Flood Fill
200. Number of Island
130. Surrounded Regions

## 14 Backtrackng

![](./images/back.png)

- EXPLORING ALL POTENTIAL SOLUTION PATHS AND BACKTRACKING
THE PATHS THAT DO NOT LEAT TO A VALIDQ SOLUTION

## Usage

![](./images/back1.png)

![](./images/back2.png)

- FIND ALL POSIBLE PATHS FROM START TO END IN A GRAPH OR A MAZE: 

![](./images/back3.png)

- GENERATE ALL VALID PARENTHESES OF A GIVEN LENGTH

![](./images/back4.png)

- GENERATE ALL POSSIBLE SUBSETS

![](./images/back5.png)


 ### Exercises

46. Permutations
78. Subsets
51. N-Queens

## 15 Dynamic Programming

![](./images/dynamic.png)

### Usage

- SOLVING OPTIMAZATION PROBLEMS BY BREAKING THEM DOWN INTO SMALLLER SUB-PROBLEMS AND STORING THEIR SOLUTIONS TO AVOID REPETITIVE WORK

- OVERLAPPING SUBPROBLEMS

- OPTIMAL SUBSTRUCTURE

- MAXIMIZE OR MINIMIZE A CERTAIN VALUE

- COUNT NUMBER OF WAYS

### EXAMPLE WHEREE TO USE

 - FIBONACCI 

 ![](./images/dynamic1.png)

- O/1 KNAPSACK

 ![](./images/dynamic2.png)

- LONGEST COMMON SUBSEQUENCE

 ![](./images/dynamic3.png)

- LONGST INCREASING SUBSEQUENCE (LIS)

 ![](./images/dynamic4.png)

- SUBSET SUM

 ![](./images/dynamic5.png)

 - MATRIX CHAIN MULTIPLICATION 

  ![](./images/dynamic6.png)#

### Exercises

70. Clibing Stairs
322. Coin Change
1143. Longest Common Subsequence
300. Longest Increasingh subsequence
416. Partition Equal Subset Sum
312. Burst Balloons

[- 15 Leet Code Pattern](https://blog.algomaster.io/p/15-leetcode-patterns)

[- 20 Daynamic programming](https://blog.algomaster.io/p/20-patterns-to-master-dynamic-programming)

[- Author GitHub](https://github.com/ashishps1)