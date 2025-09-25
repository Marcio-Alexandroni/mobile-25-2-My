import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { estilo } from "./estilo";

type Props = {
  onAdd: (descricao: string, valor: number) => void;
};

export default function RenderEntradaGasto({ onAdd }: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  function handleAdd() {
    const desc = descricao.trim();
    const normalizado = valor.replace(",", ".").trim();
    const valorNumber = Number(normalizado);

    if (!desc) return;
    if (!normalizado || isNaN(valorNumber) || valorNumber <= 0) return;

    onAdd(desc, valorNumber);
    setDescricao("");
    setValor("");
  }

  return (
    <View style={estilo.topSection}>
      <TextInput
        style={estilo.input}
        placeholder="Descrição do Gasto"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={estilo.input}
        placeholder="Valor (R$)"
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
      />
      <Pressable
        style={({ pressed }) => [estilo.button, pressed && estilo.buttonPressed]}
        onPress={handleAdd}
      >
        <Text style={estilo.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}
