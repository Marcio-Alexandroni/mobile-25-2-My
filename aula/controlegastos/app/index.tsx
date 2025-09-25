import { View, Text, Pressable, TextInput, StatusBar, FlatList, Image, Modal } from "react-native";
import { useMemo, useState, useEffect } from "react";
import { estilo } from "./estilo";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderItemGasto from "./RenderItemGasto";
import ListaGasto from "./ListaGasto";
import ListaGastoDragDrop from "./ListaGastoDragDrop";
import RenderEntradaGasto from "./RenderEntradaGasto";

export default function Index() {
  type Gasto = { id: number; descricao: string; valor: number };

  const [gasto, addGasto] = useState<Gasto[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  const total = useMemo(
    () => gasto.reduce((acc, g) => acc + (Number(g.valor) || 0), 0),
    [gasto]
  );

  // Exibe o modal quando ultrapassar 1000
  useEffect(() => {
    if (total > 1000) setModalVisivel(true);
  }, [total]);

  function addGastoHandler(descricao: string, valor: number) {
    const gastosAtuais = [...gasto];
    const novoGasto: Gasto = { id: Date.now(), descricao, valor };
    gastosAtuais.push(novoGasto);
    addGasto(gastosAtuais);
  }

  function removerGastoLista(index: number) {
    const gastosAtuais = [...gasto];
    gastosAtuais.splice(index, 1);
    addGasto(gastosAtuais);
  }

  // onPress da linha (opcional): não precisamos mais editar o input do topo
  function atualizarGasto(_g: Gasto) {
    // noop – mantido para compatibilidade com ListaGasto
  }

  const formatBRL = (n: number) =>
    (isNaN(n) ? 0 : n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={estilo.container}>

        {/* Entrada (descrição + valor + botão) */}
        <RenderEntradaGasto onAdd={addGastoHandler} />

        {/* Campo Total (somente leitura) */}
        <View style={{ marginTop: 6 }}>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Total</Text>
          <TextInput
            style={[estilo.input, { backgroundColor: "#eee" }]}
            editable={false}
            value={formatBRL(total)}
          />
        </View>

        {/* Lista de gastos */}
        <ListaGasto gasto={gasto} onPress={atualizarGasto} onLongPress={removerGastoLista} />

        {/* Modal quando total > 1000 */}
        <Modal
          visible={modalVisivel}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={{
            flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", padding: 24
          }}>
            <View style={{
              width: "100%", borderRadius: 12, backgroundColor: "#fff", padding: 20, gap: 12
            }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Atenção</Text>
              <Text style={{ fontSize: 16 }}>
                O total de gastos ultrapassou R$ 1.000,00 ({formatBRL(total)}).
              </Text>
              <Pressable
                style={({ pressed }) => [
                  estilo.button,
                  pressed && estilo.buttonPressed,
                  { width: "100%" }
                ]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={estilo.buttonText}>OK, entendi</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}
