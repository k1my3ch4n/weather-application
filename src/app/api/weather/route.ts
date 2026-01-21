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
    const [weatherResponse, forecastResponse] = await Promise.all([
      weatherServerApi.get("/weather", { params: { lat, lon: lng } }),
      weatherServerApi.get("/forecast", { params: { lat, lon: lng } }),
    ]);

    const main = weatherResponse.data?.main;
    const weather = weatherResponse.data?.weather?.[0];

    if (!main || !weather) {
      return NextResponse.json(
        { error: "날씨 데이터를 불러올 수 없습니다" },
        { status: 400 },
      );
    }

    const today = new Date().toDateString();

    const todayForecasts =
      forecastResponse.data?.list?.filter((forecast: { dt: number }) => {
        const forecastDate = new Date(forecast.dt * 1000).toDateString();

        return forecastDate === today;
      }) || [];

    let tempMin = main.temp;
    let tempMax = main.temp;

    if (todayForecasts.length > 0) {
      const temps = todayForecasts.map(
        (forecast: { main: { temp: number } }) => forecast.main.temp,
      );

      tempMin = Math.min(...temps, main.temp);
      tempMax = Math.max(...temps, main.temp);
    }

    return NextResponse.json({
      temp: main.temp,
      feelsLike: main.feels_like,
      description: weather.description,
      icon: weather.icon,
      tempMin,
      tempMax,
    });
  } catch {
    return NextResponse.json(
      { error: "날씨 정보를 가져오는데 실패했습니다" },
      { status: 500 },
    );
  }
}
