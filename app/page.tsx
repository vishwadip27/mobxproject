// import Counter from "./components/counter/page";
// import Practice from "./components/practice/page";
import Practice from "./components/practice/page";
import Todo from "./components/TodoList/page";

export default function Home() {
  return (
    <>
      <div>
        <Todo />
        {/* <Counter /> */}
        <Practice />
      </div>
    </>
  );
}
