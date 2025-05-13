import Link from "next/link";
import Counter from "./Counter/Counter";
import UsersList from "./Fetch/UsersList";
import { Todo } from "./Todo/Todo";

export default function Home() {
  return (
    <div>
      <Link href={'CartPage'}>Корзина</Link>
      <Counter/>
      <UsersList/>
      <Todo/>
    </div>
  );
}
