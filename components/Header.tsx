import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Bell } from 'lucide-react-native';

interface HeaderProps {
  nome: string;
  fotoUrl?: string;
  onNotificacaoPress?: () => void;
}

// Cabeçalho reutilizável: foto + saudação + sino de notificação
export function Header({ nome, fotoUrl, onNotificacaoPress }: HeaderProps) {
  const primeiroNome = nome.split(' ')[0]; // "João Silva" → "João"

  return (
    <HStack className="items-center justify-between px-4 pb-2 pt-10">
      {/* Esquerda: foto + textos */}
      <HStack className="items-center gap-3">
        <Avatar size="md">
          {fotoUrl ? (
            <AvatarImage source={{ uri: fotoUrl }} />
          ) : (
            <AvatarFallbackText>{nome}</AvatarFallbackText>
          )}
        </Avatar>

        <VStack>
          <Text className="text-sm text-gray-500">Bem-vindo de volta,</Text>
          <Text className="text-lg font-bold text-gray-900">Olá, {primeiroNome}</Text>
        </VStack>
      </HStack>

      {/* Direita: botão sino */}
      <Pressable onPress={onNotificacaoPress} className="rounded-full bg-gray-100 p-3">
        <Bell size={20} color="#1a1a1a" />
      </Pressable>
    </HStack>
  );
}
