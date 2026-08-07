# Cart & Checkout — variáveis Klaviyo

Os quatro emails (`05` → `08`) servem **dois flows diferentes** com o mesmo desenho. Só mudam o trigger e as variáveis do bloco de produtos. O bloco está marcado em cada ficheiro entre:

```html
<!-- PRODUTOS DO CARRINHO: variáveis Klaviyo -->
...
<!-- FIM PRODUTOS DO CARRINHO -->
```

Os produtos que lá estão (Sizzle, Drizzle) são **exemplo**. Em produção o array `cartItems` é substituído pelo loop Liquid.

## Trigger

| | Abandono de CARRINHO | Abandono de CHECKOUT |
| --- | --- | --- |
| Métrica | `Added to Cart` (Shopify / onsite tracking) | `Checkout Started` |
| Quem entra | Adicionou ao carrinho, não iniciou checkout | Iniciou checkout, não pagou |
| Email conhecido | Só se já identificado no site | Sim, vem do checkout |
| Filtro de saída | `Placed Order` desde o início do flow | `Placed Order` desde o início do flow |

## Variáveis do bloco de produtos

| Campo no email | Carrinho (`Added to Cart`) | Checkout (`Checkout Started`) |
| --- | --- | --- |
| Loop | `{% for item in event.extra.Items %}` | `{% for item in event.extra.line_items %}` |
| Nome | `item.name` | `item.product.title` |
| Quantidade | `item.quantity` | `item.quantity` |
| Preço da linha | `item.price` | `item.line_price` |
| Imagem | `item.image_url` | `item.product.images.first.src` |
| Link do produto | `item.url` | `item.product.url` |

## Variáveis fora do bloco

| Campo no email | Carrinho | Checkout |
| --- | --- | --- |
| Link do CTA | `event.extra.checkout_url` (se existir) ou `https://graza.co/cart` | `event.extra.checkout_url` |
| Total antes | `event.extra.total_price` | `event.extra.total_price` |
| Primeiro nome | `person.first_name` | `person.first_name` |

`checkout_url` **só existe no evento de checkout**. No flow de carrinho o botão vai para `/cart`.

## Por email

| Ficheiro | CTA aponta para | Oferta |
| --- | --- | --- |
| `05-cart-lembrete.html` | `/cart` (carrinho) · `checkout_url` (checkout) | nenhuma |
| `06-cart-prova-social.html` | idem | nenhuma |
| `07-cart-urgencia.html` | `/checkout` · `checkout_url` | nenhuma |
| `08-cart-desconto.html` | `/checkout` · `checkout_url` | `$5` fixos, código `CART5`, 24h |

No `08` os preços com desconto (`$13.84`, `$18.16`) e os totais (`$37` → `$32`) são exemplo. Em produção calcula-os no Klaviyo a partir de `event.extra.total_price` menos o valor do código, ou passa-os como propriedades do evento.

## Por preencher

- Prazo real de expiração do carrinho no `07` (agora `24` horas, editável nas props).
- Política de devolução / garantia no `06` — o selo está com placeholder e o email não deve sair sem isso.
- Código de desconto real do `08` — `CART5` é um nome provisório.
