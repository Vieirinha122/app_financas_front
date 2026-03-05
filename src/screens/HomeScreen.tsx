import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box } from '../../components/ui/box';
import { Text } from '../../components/ui/text';
import { Center } from '../../components/ui/center';
import { ArrowLeft } from 'lucide-react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Box className="flex-1 bg-background-0">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-4">
        <ArrowLeft color="black" size={24} />
      </TouchableOpacity>

      <Center className="flex-1">
        <Box className="rounded-xl border border-outline-100 bg-white p-5 shadow-soft-1">
          <Text className="text-lg font-bold text-typography-200">Olá, bem-vindo!</Text>
        </Box>
      </Center>
    </Box>
  );
}
