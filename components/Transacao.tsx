import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { ShoppingBag, ArrowDownCircle, Coffee } from 'lucide-react-native';

// ─── SecaoHeader ──────────────────────────────────────────────────────────────
// Título à esquerda + link à direita. Reutilizável em qualquer seção.

interface SecaoHeaderProps {
  titulo: string;
  linkLabel?: string;
  onLinkPress?: () => void;
}

export function SecaoHeader({ titulo, linkLabel, onLinkPress }: SecaoHeaderProps) {
  return (
    <HStack className="mb-3 items-center justify-between px-4">
      <Text className="text-lg font-bold text-gray-900">{titulo}</Text>
      {linkLabel && (
        <Pressable onPress={onLinkPress}>
          <Text className="text-sm font-medium text-green-600">{linkLabel}</Text>
        </Pressable>
      )}
    </HStack>
  );
}

// ─── TransacaoItem ────────────────────────────────────────────────────────────
// Linha de transação: [ícone] [descrição + data] [valor]
// Reutilizável na home, extrato, qualquer lista de transações.

interface TransacaoItemProps {
  descricao: string;
  data: string;
  valor: number;
  tipo: 'RECEITA' | 'DESPESA';
  categoria: string;
  onPress?: () => void;
}

// Escolhe ícone pela categoria — adicione mais conforme precisar
const iconeCategoria = (categoria: string) => {
  const cat = categoria.toLowerCase();
  if (cat.includes('café') || cat.includes('restaurante'))
    return <Coffee size={18} color="#16a34a" />;
  if (cat.includes('mercado') || cat.includes('alimentação'))
    return <ShoppingBag size={18} color="#ef4444" />;
  return <ArrowDownCircle size={18} color="#16a34a" />;
};

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function TransacaoItem({
  descricao,
  data,
  valor,
  tipo,
  categoria,
  onPress,
}: TransacaoItemProps) {
  const isReceita = tipo === 'RECEITA';

  return (
    <Pressable onPress={onPress}>
      <HStack className="items-center gap-3 px-4 py-3">
        {/* Círculo com ícone */}
        <Box className={`rounded-full p-3 ${isReceita ? 'bg-green-50' : 'bg-red-50'}`}>
          {iconeCategoria(categoria)}
        </Box>

        {/* Descrição + data — flex-1 faz ocupar o espaço disponível */}
        <VStack className="flex-1">
          <Text className="text-sm font-semibold text-gray-900">{descricao}</Text>
          <Text className="text-xs text-gray-400">{data}</Text>
        </VStack>

        {/* Valor alinhado à direita */}
        <Text className={`text-sm font-bold ${isReceita ? 'text-green-600' : 'text-gray-900'}`}>
          {isReceita ? '+ ' : '- '}
          {formatarMoeda(Math.abs(valor))}
        </Text>
      </HStack>
    </Pressable>
  );
}
