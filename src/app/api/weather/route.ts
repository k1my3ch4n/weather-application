import { NextRequest, NextResponse } from "next/server";
import { weatherServerApi } from "@shared/api/instance/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "좌표를 입력해주세요" }, { status: 400 });
  }

  try {
    const { data } = await weatherServerApi.get("/weather", {
      params: { lat, lon: lng },
    });

    const main = data?.main;
    const weather = data?.weather?.[0];

    if (!main || !weather) {
      return NextResponse.json(
        { error: "날씨 데이터를 불러올 수 없습니다" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      temp: main.temp,
      feelsLike: main.feels_like,
      humidity: main.humidity,
      description: weather.description,
    });
  } catch {
    return NextResponse.json(
      { error: "날씨 정보를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
