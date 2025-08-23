import { useMemo } from "react";

/** 의자/테이블로부터 도면 크기를 추정(원본 픽셀 좌표 기준) */
export const useBBoxFromItems = (
  chairs = [],
  tables = [],
  fallback = { w: 1000, h: 700 }
) => {
  return useMemo(() => {
    const rects = [
      ...chairs.map((c) => ({
        x: c.x_position || 0,
        y: c.y_position || 0,
        w: c.width || 0,
        h: c.height || 0,
      })),
      ...tables.map((t) => ({
        x: t.x_position || 0,
        y: t.y_position || 0,
        w: t.width || 0,
        h: t.height || 0,
      })),
    ];
    if (!rects.length) return fallback;

    const w = Math.ceil(Math.max(...rects.map((r) => r.x + r.w)));
    const h = Math.ceil(Math.max(...rects.map((r) => r.y + r.h)));
    return { w, h };
  }, [chairs, tables]);
};

/** 모든 좌표/크기에 배율 적용 */
export const scaleItems = (items = [], s = 1) => {
  return items.map((it) => ({
    ...it,
    x_position: Math.round((it.x_position || 0) * s),
    y_position: Math.round((it.y_position || 0) * s),
    width: Math.round((it.width || 0) * s),
    height: Math.round((it.height || 0) * s),
  }));
};
