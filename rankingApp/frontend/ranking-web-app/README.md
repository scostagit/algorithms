# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)







| Hook        | Use Case                      | Example in To-Do App           |
| ----------- | ----------------------------- | ------------------------------ |
| `useEffect` | Side effects (load/save, API) | Load tasks from localStorage   |
| `useMemo`   | Performance optimization      | Cache filtered/computed values |




To improve the performance of your React function components and avoid unnecessary **re-renders or recalculations**, `useMemo` and `useCallback` are powerful tools—but they solve **different problems**. Let’s break it down so you can choose and apply them correctly.

---

## 🔁 Why Your Component Might Be Re-rendering

React re-renders a component when:

* Its **state or props change**
* Its **parent component re-renders**, causing it to re-render too

If inside the component, you’re **creating new objects or functions on every render**, they’ll appear “changed” every time, even if the values are the same. This can lead to:

* Unnecessary child renders
* Re-running expensive calculations

---

## 🧠 `useMemo` — Memoize **Values**

Use `useMemo` to **memoize expensive computations** or avoid recalculating objects/arrays unless dependencies change.

### ✅ When to use:

* You have an expensive calculation
* You’re passing computed objects/arrays to children or hooks

### Example:

```js
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);
```

Without `useMemo`, this would re-run on every render even if `items` didn’t change.

---

## 🔗 `useCallback` — Memoize **Functions**

Use `useCallback` to **prevent re-creating functions** on every render.

### ✅ When to use:

* You pass a function to a child component
* You want referential equality for dependencies in `useEffect`, etc.

### Example:

```js
const handleClick = useCallback(() => {
  doSomething(item.id);
}, [item.id]);
```

Without `useCallback`, `handleClick` is a new function every render—even if `item.id` hasn't changed.

---

## 🔥 Example Putting It Together

```jsx
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const items = useMemo(() => {
    return generateItems(); // expensive function
  }, []);

  const handleItemClick = useCallback((id) => {
    console.log("Clicked", id);
  }, []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <ChildComponent items={items} onItemClick={handleItemClick} />
    </>
  );
};

const ChildComponent = React.memo(({ items, onItemClick }) => {
  console.log("Child rendered");
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>{item.name}</li>
      ))}
    </ul>
  );
});
```

In this example:

* `generateItems()` only runs once (due to `useMemo`)
* `handleItemClick` stays referentially stable (due to `useCallback`)
* `ChildComponent` is wrapped with `React.memo` to avoid re-renders unless `items` or `onItemClick` change

---

## 🧪 Bonus Tips

* Profile with React DevTools to see what’s causing re-renders
* Avoid overusing `useMemo`/`useCallback`—they add overhead. Use only where there's a measurable benefit
* Consider `React.memo()` for child components that don't need to re-render often

---

If you have a specific example/component you want help optimizing, I can walk through it directly.



Here are the **core concepts of React** that form the foundation of building applications with it:

---

### 1. **Components**

* React apps are built using **components**, which are reusable, self-contained pieces of UI.
* Types:

  * **Functional Components** (using hooks)
  * **Class Components** (older, less common now)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

---

### 2. **JSX (JavaScript XML)**

* A syntax extension that allows writing HTML-like code in JavaScript.
* JSX gets transpiled to `React.createElement()` calls.

```jsx
const element = <h1>Hello, world!</h1>;
```

---

### 3. **Props (Properties)**

* Props are inputs to components.
* They are **read-only** and passed **from parent to child**.

```jsx
<MyComponent title="Hello" />
```

---

### 4. **State**

* State is data managed **within a component** that can change over time.
* Functional components use the `useState` hook.

```jsx
const [count, setCount] = useState(0);
```

---

### 5. **Hooks**

* Functions that let functional components use React features like state and lifecycle.
* Common hooks:

  * `useState`
  * `useEffect`
  * `useContext`

---

### 6. **Lifecycle Methods (for Class Components) / Effects (for Functional Components)**

* Code that runs at specific points in a component's life.
* In functional components, you use `useEffect()` to run side effects (e.g., fetching data, subscribing).

```jsx
useEffect(() => {
  // Run on mount
  fetchData();
}, []); // Empty array means run once
```

---

### 7. **Virtual DOM**

* React maintains a lightweight **Virtual DOM** to efficiently update the UI.
* When state or props change, React:

  * Creates a new virtual DOM
  * Diffs it with the old one
  * Applies minimal updates to the real DOM

---

### 8. **Unidirectional Data Flow**

* Data flows **one way**: from parent → child.
* Child components can trigger callbacks to inform parents.

---

### 9. **Conditional Rendering**

* You can render different UI elements based on conditions.

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

---

### 10. **Lists and Keys**

* Used to render multiple items efficiently.
* Each item should have a **unique `key`**.

```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

### 11. **Context API**

* Allows you to **share state globally** (like theme or auth info) without passing props manually.

```jsx
const ThemeContext = React.createContext('light');
```

---

### 12. **React Router (for navigation)**

* Enables routing in single-page applications (SPAs).

```jsx
<Route path="/about" element={<About />} />
```

---
