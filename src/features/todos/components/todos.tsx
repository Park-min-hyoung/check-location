import { Button } from "@/components/ui/button/button";
import ToastifyButton from "@/components/ui/toastify/toastify";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { paths } from "@/config/paths";
import { getTodos } from "../api/todos";

function Todos() {
  // Queries
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const navigate = useNavigate();

  const navigateToMap = () => {
    navigate(paths.map.getHref());
  };

  return (
    <>
      <div className="text-3xl">Tailwind 적용 텍스트</div>
      <div className="mb-8 text-xl font-bold text-lime-600 underline">
        it goes Work!!
      </div>

      <div className="text-3xl">
        서버 데이터 리스트(React Query로 서버 상태 관리, MSW 기반 응답데이터
        사용)
      </div>
      <div className="mb-8">
        <ul>{data?.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
      </div>

      <div className="text-3xl">Shadcn Button</div>
      <Button className="mb-8">Click me</Button>

      <div className="text-3xl">Toastify Button</div>
      <ToastifyButton />

      <div className="text-3xl">카카오 지도 보기</div>
      <Button onClick={navigateToMap}>지도 보기</Button>
    </>
  );
}

export default Todos;
