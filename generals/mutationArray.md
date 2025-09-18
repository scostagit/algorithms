Great question! In JavaScript, some array methods return a **new array**, while others **modify the original array** in place. Here's a **clear table** to help you:

---

### 📊 JavaScript Array Methods – Mutating vs Non-Mutating

| Method            | Returns New Array?            | Mutates Original? | Description                                                    |
| ----------------- | ----------------------------- | ----------------- | -------------------------------------------------------------- |
| `map()`           | ✅ Yes                         | ❌ No              | Transforms each element and returns a new array                |
| `filter()`        | ✅ Yes                         | ❌ No              | Returns a new array with elements that pass a test             |
| `slice()`         | ✅ Yes                         | ❌ No              | Extracts a section of the array                                |
| `concat()`        | ✅ Yes                         | ❌ No              | Merges arrays and returns a new one                            |
| `flat()`          | ✅ Yes                         | ❌ No              | Flattens nested arrays                                         |
| `flatMap()`       | ✅ Yes                         | ❌ No              | Maps and flattens at one level                                 |
| `toSorted()` 🔄   | ✅ Yes                         | ❌ No              | Returns a sorted copy (ES2023+)                                |
| `toReversed()` 🔄 | ✅ Yes                         | ❌ No              | Returns a reversed copy (ES2023+)                              |
| `toSpliced()` 🔄  | ✅ Yes                         | ❌ No              | Like `splice()`, but non-mutating (ES2023+)                    |
| `splice()`        | ❌ No                          | ✅ Yes             | Adds/removes items at a position                               |
| `sort()`          | ❌ No                          | ✅ Yes             | Sorts array in place                                           |
| `reverse()`       | ❌ No                          | ✅ Yes             | Reverses array in place                                        |
| `push()`          | ❌ No (returns new length)     | ✅ Yes             | Adds item(s) to end of array                                   |
| `pop()`           | ❌ No (returns removed item)   | ✅ Yes             | Removes last item                                              |
| `shift()`         | ❌ No                          | ✅ Yes             | Removes first item                                             |
| `unshift()`       | ❌ No                          | ✅ Yes             | Adds item(s) to beginning                                      |
| `fill()`          | ❌ No                          | ✅ Yes             | Fills elements with a static value                             |
| `copyWithin()`    | ❌ No                          | ✅ Yes             | Copies part of array to another location                       |
| `forEach()`       | ❌ No                          | ✅/❌ Depends       | Executes function on each element, but doesn’t return anything |
| `reduce()`        | ❌ No (returns a single value) | ❌ No              | Reduces to a single value, does not mutate                     |

---

### 📝 Notes:

* ✅ **Returns New Array**: The method gives you a brand new array — original is untouched.
* ✅ **Mutates Original**: The method **changes** the existing array.
* 🔄 **New ES2023 methods**: Like `toSorted()`, `toReversed()` are non-mutating alternatives.

---

Let me know if you want a downloadable version of this or code examples for each!
