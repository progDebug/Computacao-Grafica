# Checklist de Implementação

## 1. Estrutura de Dados para Objetos 3D

- [x] Incluir lista de faces no objeto 3D.
- [x] Armazenar lista ordenada (sentido anti-horário) dos índices dos vértices de cada face.
- [x] Armazenar cor RGB da face com valores no intervalo `[0,1]`.
- [x] Adicionar campo `zMedio` (`float`) para cada face.
- [x] Armazenar valores de rotação nos eixos X, Y e Z.
- [x] Armazenar valores de escala nos eixos X, Y e Z.
- [x] Armazenar valores de translação nos eixos X, Y e Z.
- [x] Implementar função para adicionar uma face ao objeto.
- [x] Implementar função para exibir o conteúdo completo do objeto no `console.log`.
- [x] Implementar função para criar uma cópia de um objeto.
- [x] Garantir que a estrutura de dados suporte todas as informações do arquivo de entrada.

---

## 2. Leitura do Arquivo de Entrada

- [x] Implementar leitura automática do arquivo no início da execução.
- [x] Utilizar o arquivo `figure.dat` como entrada.
- [x] Ler um ou mais objetos 3D presentes no arquivo.
- [x] Criar objetos utilizando a estrutura definida no Item 1.
- [x] Armazenar os objetos carregados em uma lista.

---

## 3. Manipulação de Múltiplos Objetos 3D

### ~~a) Lista Circular~~

- [x] Manter uma lista circular de objetos 3D carregados do arquivo.

### ~~b) Exibição~~

- [x] Exibir todos os objetos 3D presentes na lista.

### ~~c) Seleção de Objetos~~

- [x] Permitir avançar a seleção com a tecla `TAB`.
- [x] Permitir retornar a seleção com `SHIFT + TAB`.
- [x] Destacar visualmente o objeto selecionado.
- [x] Exibir o objeto selecionado com cor diferente dos demais.
- [x] Utilizar linhas vermelhas para indicar o objeto selecionado.

### ~~d) Transformações~~

- [x] Aplicar translação apenas ao objeto selecionado.
- [x] Aplicar escalonamento apenas ao objeto selecionado.
- [x] Aplicar rotação apenas ao objeto selecionado.

---

## Status Geral

- [x] Estrutura de dados concluída.
- [x] Leitura do arquivo implementada.
- [x] Suporte a múltiplos objetos concluído.
- [x] Sistema de seleção implementado.
- [x] Sistema de destaque visual implementado.
- [x] Manipulação individual dos objetos implementada.