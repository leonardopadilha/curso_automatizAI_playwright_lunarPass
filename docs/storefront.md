# Storefront Lunar Pass: Especificação de Aceitação

## Objetivo de negócio

Permitir que viajantes busquem missões espaciais, escolham seus assentos na cabine, informem os dados dos passageiros, realizem o pagamento e recebam o ticket de confirmação da reserva.

**Ator:** Viajante.

## Como ler este documento

- Os cenários em Gherkin são a fonte de verdade dos requisitos e critérios de aceitação.
- Cada cenário é independente: traz as regras de negócio, as pré-condições, os dados e os resultados esperados no próprio texto.
- Tudo o que não está definido está na seção **Lacunas e decisões pendentes**, no final. Nada ali foi transformado em cenário.

---

## Funcionalidade: Busca de Missões

### Cenário: Buscar missões para todas as bases lunares disponíveis

*Regras de negócio:* existem 4 bases lunares disponíveis (Alpha, Orion, Aurora e Selene) e as missões são de ida e volta, com duração de 7 dias. Uma busca sem seleção de bases (ou com todas selecionadas) retorna missões para todas as bases.

**Dado** que o catálogo de missões da Lunar Pass está disponível  
**Quando** eu busco missões sem aplicar filtro de base lunar  
**Então** eu visualizo missões com destino a qualquer uma das quatro bases (Alpha, Orion, Aurora e Selene)  
**E** os resultados são ordenados pela data de partida mais próxima

### Cenário: Buscar missões filtrando por uma base específica

*Regras de negócio:* existem 4 bases lunares disponíveis (Alpha, Orion, Aurora e Selene) e as missões são de ida e volta, com duração de 7 dias.

**Dado** que o catálogo de missões da Lunar Pass está disponível  
**Quando** eu aplico o filtro pela Base Lunar Alpha  
**Então** a lista exibe apenas missões com destino à Base Lunar Alpha  
**E** o resumo indica quais filtros estão ativos e a quantidade de resultados

### Cenário: Lidar com ausência de missões para os filtros

*Regras de negócio:* existem 4 bases lunares disponíveis (Alpha, Orion, Aurora e Selene). A busca pode resultar em zero missões.

**Dado** que o catálogo de missões da Lunar Pass está disponível  
**E** que não existem missões vigentes para a Base Lunar Aurora  
**Quando** eu aplico o filtro por essa base  
**Então** eu sou avisado de que nenhuma missão atende aos filtros  
**E** visualizo um atalho para limpar a busca e ver todas as missões

### Cenário: Missão esgotada aparece nos resultados sem opção de reserva

*Regras de negócio:* missões totalmente ocupadas aparecem como "Esgotado" e não podem ser reservadas.

**Dado** que o catálogo de missões da Lunar Pass está disponível  
**E** que existe uma missão para a Base Lunar Selene sem assentos disponíveis  
**Quando** eu busco por essa base  
**Então** essa missão aparece nos resultados identificada como "Esgotado"  
**E** eu não tenho a opção de iniciar a reserva para ela

---

## Funcionalidade: Mapa de Assentos

### Cenário: Impedir o avanço sem seleção mínima de assentos

*Regras de negócio:* cada missão tem no máximo 4 assentos na cabine do foguete (A1, A2, B1 e B2). Os assentos têm três estados: disponível, selecionado e ocupado.

**Dado** que estou no mapa de assentos de uma missão com vagas  
**Quando** eu tento avançar para a etapa de passageiros sem escolher nenhum assento  
**Então** o sistema não permite o avanço  
**E** eu sou instruído a selecionar pelo menos um lugar na cabine

### Cenário: Avançar com seleção máxima de assentos permitida

*Regras de negócio:* cada missão tem no máximo 4 assentos na cabine do foguete (A1, A2, B1 e B2). Os assentos têm três estados: disponível, selecionado e ocupado.

**Dado** que estou no mapa de assentos de uma missão com vagas  
**Quando** eu seleciono todos os quatro assentos disponíveis (A1, A2, B1 e B2)  
**Então** o valor total é calculado para os quatro passageiros  
**E** eu consigo avançar para a identificação dos passageiros

### Cenário: Tentar selecionar assento já ocupado

*Regras de negócio:* os assentos têm três estados: disponível, selecionado e ocupado. Um assento ocupado bloqueia a reserva.

**Dado** que estou no mapa de assentos de uma missão com vagas  
**E** que o assento A1 já foi comprado em outra reserva  
**Quando** eu tento selecionar o assento A1  
**Então** a seleção não é efetuada  
**E** eu sou avisado de que o lugar está ocupado e preciso escolher outro

---

## Funcionalidade: Passageiros

*Regras de negócio comuns aos cenários desta funcionalidade:* o Nome do passageiro deve ter de 3 a 120 caracteres. O Passaporte deve ter de 5 a 30 caracteres e é salvo em letras maiúsculas (uppercase).

### Cenário: Aceitar nome com 3 caracteres e passaporte com 5 caracteres (mínimos válidos)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 3 caracteres e passaporte de 5 caracteres  
**Então** a validação retorna sucesso

### Cenário: Aceitar nome com 120 caracteres e passaporte com 30 caracteres (máximos válidos)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 120 caracteres e passaporte de 30 caracteres  
**Então** a validação retorna sucesso

### Cenário: Recusar nome com 2 caracteres (abaixo do limite mínimo)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 2 caracteres e passaporte de 15 caracteres  
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Nome é inválido e este ganha foco

### Cenário: Recusar nome com 121 caracteres (acima do limite máximo)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 121 caracteres e passaporte de 15 caracteres  
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Nome é inválido e este ganha foco

### Cenário: Recusar passaporte com 4 caracteres (abaixo do limite mínimo)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 30 caracteres e passaporte de 4 caracteres  
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Passaporte é inválido e este ganha foco

### Cenário: Recusar passaporte com 31 caracteres (acima do limite máximo)

*Regras de negócio:* Nome de 3 a 120 caracteres; Passaporte de 5 a 30 caracteres, salvo em uppercase.

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**Quando** eu preencho o formulário de passageiro com um nome de 30 caracteres e passaporte de 31 caracteres  
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Passaporte é inválido e este ganha foco

---

## Funcionalidade: Pagamento e Emissão do Ticket

### Cenário: Emissão de tickets com sucesso após pagamento aprovado

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**Quando** eu submeto um pagamento com um cartão de crédito válido
**Então** minha reserva é confirmada com um código de seis caracteres  
**E** é emitida uma passagem para cada passageiro associado aos assentos

### Cenário: Manter dados na tela quando o pagamento é recusado

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**Quando** eu submeto o pagamento utilizando um cartão sem saldo ou incorreto
**Então** o pagamento não é aprovado
**E** eu permaneço na tela de pagamento com meus dados preservados para corrigir o problema

### Cenário: Bloqueio da reserva por concorrência de assentos no momento do processamento

*Regras de negócio:* se outra pessoa comprar os assentos durante o fluxo, a reserva é bloqueada no momento do pagamento.

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**E** que os assentos da minha seleção foram confirmados por outra pessoa instantes antes  
**Quando** eu submeto o pagamento  
**Então** a minha reserva falha  
**E** eu sou avisado de que o assento acabou de ser ocupado e preciso escolher outro lugar

---

## Lacunas e decisões pendentes

Nenhum item abaixo foi resolvido ou transformado em cenário. Permanecem em aberto até decisão.

### Registradas na documentação de origem

| # | Pendência | Por que importa | Funcionalidade | Quem decide |
|---|---|---|---|---|
| P1 | O que acontece financeiramente no simulador se o pagamento for aprovado, mas a reserva falhar por conflito de assento? Haverá mensagem sobre estorno? | Define a experiência do viajante e a mensagem de erro correta. | Pagamento | Produto |
| P2 | Missões cuja data de partida já ocorreu continuam no catálogo? Se sim, é possível comprar passagem para o passado? Não há regra de negócio definida. | Evita reservas ilógicas caso não exista expiração automática. | Busca de Missões | Produto |
| P3 | Existe retenção temporária (lock) dos assentos enquanto o viajante preenche o checkout? A documentação de origem registrou a hipótese de que o assento fica livre para concorrência até o momento exato do pagamento. Essa hipótese não está validada e não é critério de aceitação. | Impacta a quantidade de cenários de concorrência e a arquitetura. | Assentos e Pagamento | Produto e DEV |
| P4 | Existe cancelamento de reservas prontas? Se existir, missões esgotadas poderiam reabrir vagas. O texto não cita essa jornada. | Define se é preciso tratar missões que voltam a ter lugares. | N/A | Produto |

### Identificadas durante a refatoração

| # | Lacuna | Detalhe |
|---|---|---|
| L1 | Busca com as quatro bases selecionadas | A regra de busca diz que selecionar todas as bases equivale a não selecionar nenhuma (a especificação de origem previa 0, 1 e 4 bases), mas só há cenários para nenhuma e para uma base. |
| L2 | Seleção de exatamente 1 assento | A especificação de origem previa 0, 1 e 4 assentos, mas só há cenários para 0 e 4. |
| L3 | Cartões de teste | Os números dos cartões de teste e o que cada um define não estão documentados. A especificação de origem previa o status "Negado", sem cenário correspondente. A frase "demais válidos dão erro de dados" não esclarece quais cartões entram nessa regra. |
| L4 | Textos das mensagens | O texto exato de cada aviso e mensagem de erro (ausência de missões, assento ocupado, validação de campo, pagamento recusado, concorrência) não está documentado. Os cenários descrevem apenas o sentido da mensagem. |
| L5 | Valores | O preço dos assentos e o valor total calculado não estão documentados. |
| L6 | Detalhes sem regra de negócio documentada | Estes itens aparecem somente nos cenários originais: ordenação por data de partida mais próxima, resumo de filtros ativos com quantidade de resultados, atalho para limpar a busca, código de reserva de seis caracteres, uma passagem por passageiro, aviso de cobrança simulada, dados preservados na tela de pagamento e foco no campo inválido. Foram mantidos como estavam e precisam de confirmação do Produto. |
| L7 | Nome e passaporte em maiúsculas | A regra de passaporte diz que ele é salvo em uppercase, mas não há cenário que o verifique nem dados concretos (nomes e passaportes) além do tamanho em caracteres. |
| L8 | Missões "vigentes" | O cenário de ausência de missões usa o termo "vigentes", cujo significado depende de P2. |