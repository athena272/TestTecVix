import { useState, useEffect } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Bar, // Para as linhas de threshold
} from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";

import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { IFormatData } from "../../../../types/socketType";

const generateMockMemoryData = (): IFormatData[] => {
  const data: IFormatData[] = [];
  const now = new Date();
  let baseValue = 40 + Math.random() * 20; // Base entre 40-60%

  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    // Variação mais suave que CPU
    baseValue += (Math.random() - 0.5) * 5;
    baseValue = Math.max(0, Math.min(100, baseValue)); // Clamp 0-100

    data.push({
      time: time.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: parseFloat(baseValue.toFixed(2)),
    });
  }

  return data;
};

export const BottomGraphic = () => {
  const [chartData, setChartData] = useState<IFormatData[]>([]);
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { currentVMName: vmName } = useZGlobalVar();

  useEffect(() => {
    if (vmName) {
      setChartData(generateMockMemoryData());
    } else {
      setChartData([]);
    }
  }, [vmName]);

  const lastMemoryData =
    Number(chartData[chartData.length - 1]?.value.toFixed(2)) || 0;

  const valueColor = lastMemoryData < 80 ? theme[mode].ok : theme[mode].danger;

  // if (!chartData.length) return <EmptyFeedBack />;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: theme[mode].primary,
          fontSize: "12px",
          fontWeight: "500",
          marginLeft: "20px",
        }}
      >
        {`${t("graphics.memoryUsage")} - ${vmName}`}{" "}
        <span style={{ color: theme[mode].gray, fontWeight: "300" }}>
          {t("graphics.currentUse")}{" "}
          <span style={{ color: valueColor }}>{lastMemoryData}%</span>
        </span>
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // Margens ajustadas
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme[mode].gray} />
          <XAxis
            dataKey="time"
            label={{
              value: t("graphics.time"),
              position: "insideBottomRight",
              offset: -5,
              fill: theme[mode].dark, // Cor branca
              fontSize: 10,
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }} // Ticks do eixo X em branco e menores
          />
          <YAxis
            label={{
              value: t("graphics.memoryUsage"),
              angle: -90,
              position: "insideLeft",
              fill: theme[mode].dark,
              fontSize: 10,
              dy: 48,
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }}
            domain={[0, (dataMax: number) => (dataMax * 1.16).toFixed(1)]} // Adicionando margem acima do maior valor
          />
          <Tooltip
            formatter={(value) => parseFloat(value as string).toFixed(2)} // Formata para 2 casas decimais
          />
          <Legend />
          <ReferenceLine
            y={80} // Linha vermelha de threshold (uso crítico acima de 90%)
            stroke="red"
            strokeDasharray="3 3"
          />
          <Bar dataKey="value" fill="#413ea0" legendType="none" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff7300" // Cor verde => #4CAF50 | cor azul => #8884d8
            dot={false}
            isAnimationActive={false}
            legendType="none" // Remove a legenda
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
};
