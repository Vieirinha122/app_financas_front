import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Plus, Target, BarChart2 } from 'lucide-react-native';

// Um botão de ação: caixinha verde clara com ícone + label embaixo
function AcaoItem({
  icone,
  label,
  onPress,
}: {
  icone: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <Box className="mb-2 rounded-2xl bg-green-50 p-4">{icone}</Box>
      <Text className="text-center text-xs text-gray-600">{label}</Text>
    </Pressable>
  );
}

interface AcoesRapidasProps {
  onNovaTransacao: () => void;
  onMetas: () => void;
  onRelatorios: () => void;
}

// Faixa com 3 atalhos rápidos distribuídos na linha
export function AcoesRapidas({ onNovaTransacao, onMetas, onRelatorios }: AcoesRapidasProps) {
  return (
    <HStack className="mt-5 justify-around px-4">
      <AcaoItem
        icone={<Plus size={22} color="#16a34a" />}
        label="Nova Transação"
        onPress={onNovaTransacao}
      />
      <AcaoItem icone={<Target size={22} color="#16a34a" />} label="Metas" onPress={onMetas} />
      <AcaoItem
        icone={<BarChart2 size={22} color="#16a34a" />}
        label="Relatórios"
        onPress={onRelatorios}
      />
    </HStack>
  );
}
