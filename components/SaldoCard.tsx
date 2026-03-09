import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react-native';

interface SaldoCardProps {
  saldoTotal: number;
  percentualVariacao: number;
}

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Card verde principal com saldo total e variação do mês.
// O olhinho esconde/mostra o valor.
export function SaldoCard({ saldoTotal, percentualVariacao }: SaldoCardProps) {
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const positivo = percentualVariacao >= 0;

  return (
    <Box className="mx-4 mt-3 overflow-hidden rounded-3xl bg-green-600 p-5">
      {/* Círculo decorativo de fundo */}
      <Box className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-green-500 opacity-40" />

      {/* Linha: label + olhinho */}
      <HStack className="items-center justify-between">
        <Text className="text-sm text-white opacity-90">Saldo Total</Text>
        <Pressable onPress={() => setMostrarSaldo(!mostrarSaldo)}>
          {mostrarSaldo ? <Eye size={20} color="white" /> : <EyeOff size={20} color="white" />}
        </Pressable>
      </HStack>

      {/* Valor */}
      <Text className="mt-2 text-3xl font-bold text-white">
        {mostrarSaldo ? formatarMoeda(saldoTotal) : 'R$ ••••••'}
      </Text>

      {/* Badge percentual */}
      <HStack className="mt-3 items-center gap-2">
        <HStack className="items-center gap-1 rounded-full bg-white/20 px-2 py-1">
          {positivo ? (
            <TrendingUp size={12} color="white" />
          ) : (
            <TrendingDown size={12} color="white" />
          )}
          <Text className="text-xs font-semibold text-white">
            {positivo ? '+' : ''}
            {percentualVariacao}%
          </Text>
        </HStack>
        <Text className="text-xs text-white opacity-80">este mês</Text>
      </HStack>
    </Box>
  );
}
