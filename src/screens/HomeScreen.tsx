import { ScrollView, ActivityIndicator, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { SaldoCard } from '@/components/SaldoCard';
import { AcoesRapidas } from '@/components/AcoesRapidas';
import { GraficoGastos } from '@/components/GraficosGastos';
import { SecaoHeader, TransacaoItem } from '@/components/Transacao';
import { useAuth } from '../context/AuthContext';

interface DashboardData {
  resumo: {
    saldoTotal: number;
    totalReceitas: number;
    totalDespesas: number;
    mes: {
      receitas: number;
      despesas: number;
      saldo: number;
      percentualVariacao: number;
    };
  };
  grafico: {
    dias: { dia: string; data: string; total: number }[];
    totalPeriodo: number;
  };
  ultimasTransacoes: {
    id: string;
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    categoria: string;
    data: string;
  }[];
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function HomeScreen({ navigation }: any) {
  const { token, user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.log('Erro ao buscar dashboard:', err))
      .finally(() => setCarregando(false));
  }, [token]);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (!dashboard) return null;

  return (
    <Box className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          nome={user?.nome ?? ''}
          onNotificacaoPress={() => navigation.navigate('Notificacoes')}
        />

        <SaldoCard
          saldoTotal={dashboard.resumo.saldoTotal}
          percentualVariacao={dashboard.resumo.mes.percentualVariacao}
        />

        <AcoesRapidas
          onNovaTransacao={() => navigation.navigate('NovaTransacao')}
          onMetas={() => navigation.navigate('Metas')}
          onRelatorios={() => navigation.navigate('Relatorios')}
        />

        <GraficoGastos
          dias={dashboard.grafico.dias}
          totalPeriodo={dashboard.grafico.totalPeriodo}
        />

        <Box className="mb-6 mt-5">
          <SecaoHeader
            titulo="Transações Recentes"
            linkLabel="Ver tudo"
            onLinkPress={() => navigation.navigate('Extrato')}
          />

          {dashboard.ultimasTransacoes.map((transacao) => (
            <TransacaoItem
              key={transacao.id}
              descricao={transacao.descricao}
              data={transacao.data}
              valor={transacao.valor}
              tipo={transacao.tipo}
              categoria={transacao.categoria}
              onPress={() => navigation.navigate('DetalheTransacao', { id: transacao.id })}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
