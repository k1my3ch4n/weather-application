import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "주소를 입력해주세요" }, { status: 400 });
  }

  // todo : axios 인스턴스 분리
  const kakaoServerApi = axios.create({
    baseURL: "https://dapi.kakao.com/v2/local",
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
    },
  });

  try {
    const { data } = await kakaoServerApi.get("/search/address.json", {
      params: { query: address },
    });

    if (data.documents.length === 0) {
      return NextResponse.json(
        { error: "검색 결과가 없습니다" },
        { status: 404 }
      );
    }

    const { x, y, address_name } = data.documents[0];

    return NextResponse.json({
      lat: parseFloat(y),
      lng: parseFloat(x),
      addressName: address_name,
    });
  } catch {
    return NextResponse.json(
      { error: "주소 검색에 실패했습니다" },
      { status: 500 }
    );
  }
}
