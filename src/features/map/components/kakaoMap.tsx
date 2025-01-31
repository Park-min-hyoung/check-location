import { useEffect, useState } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";

function KakaoMap() {
  const { kakao } = window;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(paths.home.getHref());
  };

  const notify = () =>
    toast("목적지를 선택하였습니다!", {
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
    });

  const mapClickHandler = (marker) => {
    if (!marker.position) return;

    localStorage.setItem("selectedLocation", JSON.stringify(marker.position));
    notify();
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    console.log("검색어:", keyword);
    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        map.addListener("click", mapClickHandler);
      }
    });
  }, [map, keyword]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") setKeyword(searchInputValue);
  };

  const clickMarker = (marker) => {
    mapClickHandler(marker);
    setInfo(marker);
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const checkAttendance = () => {
    const storedData = localStorage.getItem("selectedLocation");
    if (!storedData) {
      toast.error("저장된 위치 정보가 없습니다.");
      return;
    }

    const { lat: savedLat, lng: savedLng } = JSON.parse(storedData);

    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLng = position.coords.longitude;

      // 100m 이내에 위치해야 출석 체크 성공
      const realDistance = getDistance(
        currentLat,
        currentLng,
        savedLat,
        savedLng
      );
      const distance = Math.round(realDistance * 1000);

      if (distance > 100) {
        toast.error("출석 체크 실패! (현재 위치와 100m 이내에 있어야 합니다)");
        return;
      }

      toast.success("출석 체크 성공!");
    });
  };

  return (
    <>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: "100%",
          height: "350px"
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => clickMarker(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>

      <input
        onChange={(e) => setSearchInputValue(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
        value={searchInputValue}
        placeholder={"주소를 입력해주세요 ex)강남역 or 서울특별시 역삼동"}
      />
      <button onClick={() => setKeyword(searchInputValue)}>검색</button>

      <Button onClick={navigateToHome}>홈페이지로 이동</Button>

      <Button onClick={checkAttendance}>출석 체크</Button>
    </>
  );
}

export default KakaoMap;
