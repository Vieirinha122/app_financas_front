import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, ActivityIndicator } from 'react-native';

import { Mail, Lock, Fingerprint, EyeIcon, EyeOffIcon } from 'lucide-react-native';

import { Center } from '../../../components/ui/center';
import { Box } from '../../../components/ui/box';
import { Heading } from '../../../components/ui/heading';
import { Text } from '../../../components/ui/text';
import { VStack } from '../../../components/ui/vstack';
import { HStack } from '../../../components/ui/hstack';
import { Button, ButtonText, ButtonIcon } from '../../../components/ui/button';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../service/authService';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    }

    setIsLoading(true);
    try {
      const { token, user } = await loginUser({ email, senha: password });
      await signIn(token, user);
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBiometricLogin() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !enrolled) {
        return Alert.alert('Erro', 'Biometria não disponível ou não cadastrada.');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Entrar no Finança Pessoal',
        fallbackLabel: 'Usar senha',
      });

      if (result.success) {
        // Biometria só funciona se o usuário já fez login antes (token salvo no SecureStore)
        // O AuthContext já cuida de restaurar a sessão salva automaticamente no boot
        navigation.replace('Home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#f8faf9]">
      <Center className="flex-1 p-6">
        <VStack space="xl" className="w-full max-w-md items-center">
          {/* LOGO SEÇÃO */}
          <VStack className="mb-4 items-center">
            <Box className="rounded-[24px] bg-[#e1f0e4] p-5 shadow-sm">
              <Box className="h-10 w-12 items-center justify-center rounded-lg bg-[#00a624]">
                <Text className="text-xl text-white">💰</Text>
              </Box>
            </Box>

            <Heading size="3xl" className="mt-4 font-bold text-[#0a1629]">
              Finança Pessoal
            </Heading>

            <Text className="mt-1 text-lg text-typography-500">
              Gerencie seu dinheiro com inteligência
            </Text>
          </VStack>

          {/* CARD BRANCO */}
          <Box className="w-full rounded-[32px] border border-outline-50 bg-white p-8 shadow-soft-2">
            <VStack space="xl">
              <Heading size="xl" className="text-center text-[#0a1629]">
                Acesse sua conta
              </Heading>

              {/* EMAIL */}
              <VStack space="xs">
                <Text className="ml-1 font-medium text-typography-100">E-mail</Text>
                <Input size="xl" className="h-14 rounded-xl border-outline-200 bg-gray-50/50">
                  <InputSlot className="pl-4">
                    <InputIcon as={Mail} className="text-[#00a624]" />
                  </InputSlot>
                  <InputField
                    className="text-black"
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              </VStack>

              {/* SENHA */}
              <VStack space="xs">
                <HStack className="justify-between px-1">
                  <Text className="font-medium text-typography-100">Senha</Text>
                  <Text className="text-sm font-semibold text-[#00a624]">Esqueceu a senha?</Text>
                </HStack>
                <Input size="xl" className="h-14 rounded-xl border-outline-200 bg-gray-50/50">
                  <InputSlot className="pl-4">
                    <InputIcon as={Lock} className="text-[#00a624]" />
                  </InputSlot>
                  <InputField
                    className="text-black"
                    placeholder="sua senha"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <InputSlot className="pr-4" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon
                      as={showPassword ? EyeIcon : EyeOffIcon}
                      className="text-typography-400"
                    />
                  </InputSlot>
                </Input>
              </VStack>

              {/* BOTAO ENTRAR */}
              <Button
                size="xl"
                className="mt-2 h-14 rounded-xl bg-[#12a125] active:bg-[#0e8a1f]"
                onPress={handleLogin}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ButtonText className="font-bold text-white">Entrar</ButtonText>
                )}
              </Button>

              {/* DIVISOR */}
              <HStack className="my-2 items-center">
                <Box className="h-[1px] flex-1 bg-outline-100" />
                <Text className="mx-4 text-xs font-bold text-typography-400">OU USE BIOMETRIA</Text>
                <Box className="h-[1px] flex-1 bg-outline-100" />
              </HStack>

              {/* BIOMETRIA */}
              <Button
                variant="outline"
                size="xl"
                className="h-14 rounded-xl border-outline-200 active:bg-gray-50"
                onPress={handleBiometricLogin}>
                <ButtonIcon as={Fingerprint} className="mr-2 text-[#12a125]" />
                <ButtonText className="text-[#0a1629]">Entrar com Biometria</ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* FOOTER */}
          <HStack className="mt-4">
            <Text className="text-typography-500">Não tem uma conta?</Text>
            <Text
              className="ml-2 font-bold text-[#12a125]"
              onPress={() => navigation.navigate('Register')}>
              Criar conta
            </Text>
          </HStack>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
