# Dados de pagamento para testes

Dados que podem ser usados na etapa de pagamento da reserva no Lunar Pass.

## Cartões

| Número do cartão      | Bandeira         | Resultado esperado               |
| --------------------- | ---------------- | -------------------------------- |
| `4242 4242 4242 4242` | Visa             | Pagamento aprovado               |
| `5555 5555 5555 4444` | Mastercard       | Pagamento aprovado               |
| `3782 822463 10005`   | American Express | Pagamento aprovado               |
| `4000 0000 0000 0002` | Visa             | Pagamento negado pelo simulador. |
| `4000 0000 0000 0127` | Visa             | Dados do cartão incorretos.      |

Qualquer outro número com 13 a 16 dígitos é recusado com a mensagem **Dados do cartão incorretos.**

## Demais campos

| Campo             | Regra                                  | Exemplo              |
| ----------------- | -------------------------------------- | -------------------- |
| E-mail de contato | E-mail válido                          | `buzz@lunarpass.dev` |
| Nome no cartão    | De 3 a 80 caracteres                   | `Buzz Aldrin`        |
| Validade          | Formato `MM/AA`, mês entre `01` e `12` | `12/30`              |
| CVV               | 3 ou 4 dígitos                         | `123` ou `1234`      |