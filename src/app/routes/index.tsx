import Todos from "@/features/todos/components/todos.tsx";
import { Outlet } from "react-router";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <>
      <Todos />
      <Outlet />
    </>
  );
};

export default AppRoot;
