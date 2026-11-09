# Documentação — Integração de Pagamento com Cartão

## 1. Endpoint

Método: `POST`

URL:

```
https://ffmzzmgbjvgmzttdebgu.supabase.co/functions/v1/stripe-payment
```

## 2. Cartões de Teste

| Número do cartão      | Bandeira         | Resultado esperado              |
| --------------------- | ---------------- | ------------------------------- |
| `4242 4242 4242 4242` | Visa             | Pagamento aprovado              |
| `5555 5555 5555 4444` | Mastercard       | Pagamento aprovado              |
| `3782 822463 10005`   | American Express | Pagamento aprovado              |
| `4000 0000 0000 0002` | Visa             | Pagamento negado pelo simulador |
| `4000 0000 0000 0127` | Visa             | Dados do cartão incorretos      |

## 3. Payload da Requisição

Content-Type: `application/json`

```
{
  "missionId": "LP-0127B",
  "seats": ["A2"],
  "contactEmail": "papito@teste.com",
  "cardName": "Fernando Papito",
  "cardNumber": "378282246310005",
  "expiry": "12/31",
  "cvv": "123",
  "totalPrice": 1000
}
```

## 4. Respostas Esperadas

### 4.1. Pagamento aprovado

```
{
  "status": "approved",
  "message": "Pagamento aprovado.",
  "brand": "American Express",
  "paymentId": "pi_3UX6sz14NoBxd29D08GIaxi1"
}
```

### 4.2. Pagamento negado

```
{
  "status": "declined",
  "message": "Pagamento negado pela operadora do cartão.",
  "brand": "Visa"
}
```

### 4.3. Dados do cartão incorretos

```
{
  "status": "incorrect_card_data",
  "message": "Dados do cartão incorretos.",
  "brand": "Visa"
}
```

## 5. Mapeamento dos Status

| Status                | Descrição                                  |
| --------------------- | ------------------------------------------ |
| `approved`            | Pagamento aprovado.                        |
| `declined`            | Pagamento negado pela operadora do cartão. |
| `incorrect_card_data` | Dados do cartão incorretos.                |

## 6. Observações

- Os números apresentados são cartões destinados a cenários de teste.
- O campo `status` identifica o resultado do processamento do pagamento.
- O campo `brand` identifica a bandeira do cartão.
- O campo `paymentId` é retornado no cenário de pagamento aprovado, conforme exemplo apresentado.