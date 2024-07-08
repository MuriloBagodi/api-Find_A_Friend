# App

FindAFriend API

Será desenvolvido uma api para ajudar pessoas a encontrar um pet e adota-lo

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG
- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção

## RNs (Regras de negocio) - Deve sempre estrar atrelado aos requisitos funcionais

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não funcionais) - Requisitos no qual complementam a logica e o correto uso do app, evitar brechas

- [x] A senha da ORG precisa estar criptografada
- [x] A aplicação precisa ser desenvolvida com TypeScript
- [x] A aplicação precisa ser desenvolvida com NodeJs
- [x] Os dados da aplicação precisão estar persistidos em um banco PgSql
- [ ] Todas as listas de dados devem estar paginadas com 20 items por pagina
- [ ] Usuario deve ser identificado por um JWT (Jason web token)
