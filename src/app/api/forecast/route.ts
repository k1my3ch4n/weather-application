import { NextRequest, NextResponse } from "next/server";
import { weatherServerApi } from "@shared/api/instance/server";

interface ForecastItemType {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "좌표를 입력해주세요" }, { status: 400 });
  }

  try {
    const { data } = await weatherServerApi.get("/forecast", {
      params: { lat, lon: lng },
    });

    if (!data?.list || !Array.isArray(data.list)) {
      return NextResponse.json(
        { error: "날씨 데이터를 불러올 수 없습니다." },
        { status: 502 },
      );
    }

    const now = new Date();

    const forecasts = data.list.filter(({ dt_txt }: { dt_txt: string }) => {
      const forecastTime = new Date(dt_txt);
      return forecastTime >= now;
    });

    const hourlyTemps = forecasts.map(
      ({ dt_txt, main, weather }: ForecastItemType, index: number) => {
        const date = new Date(dt_txt);
        const hour = date.getHours();
        const dateStr = `${date.getMonth() + 1}월 ${date.getDate()}일`;

        const showDate = index === 0 || hour === 0;

        return {
          time: `${hour}시`,
          date: showDate ? dateStr : null,
          temp: main.temp,
          description: weather[0]?.description || "",
          icon: weather[0]?.icon || "",
        };
      },
    );

    return NextResponse.json({
      hourlyTemps,
    });
  } catch {
    return NextResponse.json(
      { error: "날씨 정보를 가져오는데 실패했습니다" },
      { status: 500 },
    );
  }
}
