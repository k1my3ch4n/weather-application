import { NextRequest, NextResponse } from "next/server";
import { kakaoServerApi } from "@shared/api/instance/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "좌표를 입력해주세요" }, { status: 400 });
  }

  try {
    const { data } = await kakaoServerApi.get("/geo/coord2address.json", {
      params: {
        x: lng,
        y: lat,
      },
    });

    if (!data.documents || data.documents.length === 0) {
      return NextResponse.json(
        { error: "주소를 찾을 수 없습니다" },
        { status: 404 },
      );
    }

    const { address } = data.documents[0];

    const regionAddress =
      `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`.trim();

    return NextResponse.json({
      address: regionAddress,
    });
  } catch {
    return NextResponse.json(
      { error: "주소 변환에 실패했습니다" },
      { status: 500 },
    );
  }
}
