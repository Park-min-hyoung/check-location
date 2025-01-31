import { Bounce, toast } from "react-toastify";

function Toastify() {
  const notify = () =>
    toast("🦄 Wow so easy!", {
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
    });

  return (
    <>
      <button className="mb-8 w-44 bg-sky-500" onClick={notify}>
        Notify!
      </button>
    </>
  );
}

export default Toastify;
