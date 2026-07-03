# ✅ Checklist - Tarefa 07: Pintura das Faces

## Estrutura de Dados

- [x] Adicionar vetor normal em cada face
- [x] Adicionar atributo de visibilidade (`visible`) em cada face
- [x] Adicionar atributo para armazenar a profundidade média (`zMedio`) de cada face
- [x] Garantir que cada face possua sua cor armazenada

---

# Cálculos Geométricos

## Atualização dos Objetos

- [x] Aplicar escalonamento
- [x] Aplicar rotação
- [x] Aplicar translação

## Vetor Normal

- [x] Calcular o vetor normal de cada face
- [x] Armazenar o vetor normal na estrutura da face

## Profundidade

- [x] Calcular o Z médio de cada face
- [x] Armazenar o Z médio na estrutura da face

---

# Remoção de Faces Ocultas

- [x] Determinar quais faces são visíveis utilizando o vetor normal
- [x] Atualizar o atributo de visibilidade de cada face

---

# Rotina de Desenho

## Organização das Faces

- [x] Criar uma lista contendo todas as faces visíveis de todos os objetos
- [x] Ordenar as faces pelo Z médio (menor → maior)

## Algoritmo do Pintor

- [ ] Desenhar as faces da mais distante para a mais próxima
- [ ] Utilizar a ordem determinada pelo Algoritmo do Pintor

## Pintura

- [ ] Pintar cada face utilizando sua cor
- [ ] Utilizar o algoritmo de preenchimento por linha de varredura implementado anteriormente

---

# Funcionalidades Existentes

## Projeções

- [ ] Manter projeção paralela
- [ ] Manter projeção em perspectiva (caso implementada anteriormente)
- [ ] Permitir alternância entre as projeções

## Transformações

- [ ] Manter rotação do objeto
- [ ] Manter escalonamento do objeto
- [ ] Manter translação do objeto

---

# Restrições do Trabalho

- [ ] Não utilizar WebGL
- [ ] Não utilizar WebGPU
- [ ] Não utilizar funções prontas de projeção 3D
- [ ] Utilizar apenas as rotinas desenvolvidas nos trabalhos anteriores

---

# Testes

- [ ] Testar cálculo correto das normais
- [ ] Testar identificação de faces visíveis
- [ ] Testar ordenação por profundidade
- [ ] Testar funcionamento do Algoritmo do Pintor
- [ ] Testar preenchimento correto das faces
- [ ] Testar objetos rotacionados
- [ ] Testar objetos escalonados
- [ ] Testar objetos transladados
- [ ] Testar diferentes projeções

---

# Entrega

- [ ] Incluir código-fonte completo
- [ ] Incluir arquivo(s) dos objetos 3D utilizados nos testes
- [ ] Garantir execução em Ubuntu 24.04+
- [ ] Compactar em `.zip` ou `.tgz`
---

**Nota:** A redação e a formatação deste documento contaram com o auxílio da ferramenta de Inteligência Artificial ChatGPT. O conteúdo final foi revisado e aprovado pelo autor.
