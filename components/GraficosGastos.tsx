import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { useWindowDimensions } from 'react-native';
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';

interface DiaDados {
  dia: string; // "S", "T", "Q"...
  data: string; // "05/03/2026"
  total: number;
}

interface GraficoGastosProps {
  dias: DiaDados[];
  totalPeriodo: number;
}

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function GraficoGastos({ dias, totalPeriodo }: GraficoGastosProps) {
  const { width } = useWindowDimensions();
  const maiorValor = Math.max(...dias.map((d) => d.total));

  // victory-native espera { x, y } — x é o label, y é o valor
  const dadosGrafico = dias.map((d, i) => ({
    x: d.dia,
    y: d.total,
    // barra mais escura no dia com maior gasto
    fill: d.total === maiorValor && maiorValor > 0 ? '#16a34a' : '#bbf7d0',
  }));

  return (
    <Box className="mx-4 mt-5 rounded-3xl bg-white p-4 shadow-sm">
      {/* Cabeçalho */}
      <HStack className="mb-2 items-center justify-between">
        <Text className="text-base font-bold text-gray-900">Gastos (7 dias)</Text>
        <Text className="text-sm font-semibold text-green-600">
          {formatarMoeda(totalPeriodo)} total
        </Text>
      </HStack>

      {/* Gráfico */}
      <VictoryChart
        width={width - 64} // largura do card menos o padding
        height={180}
        domainPadding={{ x: 20 }}
        padding={{ top: 10, bottom: 30, left: 10, right: 10 }}>
        {/* Eixo X com os labels dos dias */}
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fontSize: 11, fill: '#9ca3af' },
          }}
        />

        {/* Barras */}
        <VictoryBar
          data={dadosGrafico}
          cornerRadius={{ top: 6 }}
          style={{
            data: {
              fill: ({ datum }) => datum.fill, // cor individual por barra
            },
          }}
          animate={{ duration: 400, onLoad: { duration: 400 } }}
        />
      </VictoryChart>
    </Box>
  );
}
