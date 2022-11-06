import { ListNode } from "./classes";

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`

export const run = async (): Promise<boolean> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')
  return true
}

/**
 * Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
 * '.' Matches any single character.​​​​
 * '*' Matches zero or more of the preceding element.
 * The matching should cover the entire input string (not partial).
 * https://leetcode.com/problems/regular-expression-matching/
 */
function isMatch(s: string, p: string): boolean {
  const sLen = s.length
  const pLen = p.length
  const dp = Array.from({ length: sLen + 1 }, () => Array.from({ length: pLen + 1 }, () => false))
  dp[0][0] = true
  for (let i = 0; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2] || (i > 0 && (s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[i - 1][j])
      } else {
        dp[i][j] = i > 0 && dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.')
      }
    }
  }
  return dp[sLen][pLen]
};
/**
 * 
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * https://leetcode.com/problems/merge-k-sorted-lists/
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
      if (!l1) {
        return l2
      }
      if (!l2) {
        return l1
      }
      if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
      } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
      }
    }

  if (lists.length === 0) {
    return null
  }

  let mergedList = lists[0]

  for (let i = 1; i < lists.length; i++) {
    mergedList = mergeTwoLists(mergedList, lists[i])
  }

  return mergedList

};

/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself. 
 * https://leetcode.com/problems/add-two-numbers/
 * */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let carry = 0
  let head = new ListNode()
  let current = head
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry
    carry = Math.floor(sum / 10)
    current.next = new ListNode(sum % 10)
    current = current.next
    l1 = l1?.next ?? null
    l2 = l2?.next ?? null
  }
  return head.next
};
/**

 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 * Return the max sliding window.
 * # Complexity
  - Time complexity: O(n)
  - Space complexity: O(n)
 * https://leetcode.com/problems/sliding-window-maximum/
 */

 function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = []
  const queue: number[] = []
  for (let i = 0; i < nums.length; i++) {
    while (queue.length && nums[queue[queue.length - 1]] < nums[i]) {
      queue.pop()
    }
    queue.push(i)
    if (queue[0] === i - k) {
      queue.shift()
    }
    if (i >= k - 1) {
      result.push(nums[queue[0]])
    }
  }
  return result
};

/**
 * 240. Search a 2D Matrix II
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
*/
function searchMatrix(matrix: number[][], target: number): boolean {
  let row = 0
  let col = matrix[0].length - 1
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true
    } else if (matrix[row][col] > target) {
      col--
    } else {
      row++
    }
  }
  return false
}

/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window 
 * substring
 * of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 * The testcases will be generated such that the answer is unique.
 * https://leetcode.com/problems/minimum-window-substring/
 */
function minWindow(s: string, t: string): string {
  const map = new Map()
  for (const char of t) {
    map.set(char, (map.get(char) ?? 0) + 1)
  }
  let start = 0
  let end = 0
  let minStart = 0
  let minLen = Infinity
  let counter = map.size
  while (end < s.length) {
    const char = s[end]
    if (map.has(char)) {
      map.set(char, map.get(char) - 1)
      if (map.get(char) === 0) {
        counter--
      }
    }
    end++
    while (counter === 0) {
      const tempChar = s[start]
      if (map.has(tempChar)) {
        map.set(tempChar, map.get(tempChar) + 1)
        if (map.get(tempChar) > 0) {
          counter++
        }
      }
      if (end - start < minLen) {
        minLen = end - start
        minStart = start
      }
      start++
    }
  }
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen)
};