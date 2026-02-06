# 🌐 Links para Visualização do Site

## ✅ Sim! Links Disponíveis

### Site Público
**https://joaobaptistaads-del.github.io/vixion/**

Recursos:
- Landing page moderna e responsiva
- Cardápio com 4 categorias (Entradas, Pratos Principais, Sobremesas, Bebidas)
- Formulário de reservas com validação
- Informações de contato e localização
- Links para redes sociais

### Painel Administrativo
**https://joaobaptistaads-del.github.io/vixion/admin-login.html**

Credenciais de Acesso:
- **Usuário**: `admin`
- **Senha**: `admin123`

Funcionalidades:
- Dashboard com estatísticas em tempo real
- Gráficos de vendas (hoje, 7 dias, 30 dias, 90 dias)
- Gerenciamento de pedidos (adicionar, editar, excluir)
- Gerenciamento de reservas (confirmar, cancelar)
- Gerenciamento de cardápio (CRUD completo)
- Configurações (logo, imagens, redes sociais, informações)

## 📋 Como Ativar os Links (GitHub Pages)

Para que os links funcionem, você precisa ativar o GitHub Pages:

1. Vá para o repositório: https://github.com/joaobaptistaads-del/vixion
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte):
   - Branch: selecione `copilot/replicate-project-design`
   - Folder: selecione `/ (root)`
5. Clique em **Save** (Salvar)
6. Aguarde 2-3 minutos

Pronto! O site estará disponível nos links acima. 🎉

## 🖥️ Visualizar Localmente (Sem GitHub Pages)

Se quiser ver o site imediatamente sem configurar GitHub Pages:

### Opção 1: Python (mais fácil)
```bash
# Clone o repositório
git clone https://github.com/joaobaptistaads-del/vixion.git
cd vixion

# Mude para o branch correto
git checkout copilot/replicate-project-design

# Inicie o servidor
python3 -m http.server 8000

# Abra no navegador:
# http://localhost:8000 (site público)
# http://localhost:8000/admin-login.html (painel admin)
```

### Opção 2: Node.js
```bash
npx http-server -p 8000
```

### Opção 3: PHP
```bash
php -S localhost:8000
```

### Opção 4: Abrir Diretamente
Você também pode simplesmente abrir os arquivos HTML no navegador:
- Abra `index.html` para o site público
- Abra `admin-login.html` para o painel admin

## 📱 Compatibilidade

O site funciona em:
- ✅ Chrome (última versão)
- ✅ Firefox (última versão)
- ✅ Safari (última versão)
- ✅ Edge (última versão)
- ✅ Dispositivos móveis (responsivo)

## 🎯 Recursos Implementados

### Site Público
- ✅ Design moderno e elegante
- ✅ Totalmente responsivo
- ✅ Menu de navegação suave
- ✅ Seção Hero com chamada para ação
- ✅ Seção Sobre
- ✅ Cardápio completo
- ✅ Formulário de reservas
- ✅ Seção de contato

### Painel Administrativo
- ✅ Sistema de autenticação
- ✅ Dashboard com métricas em tempo real
- ✅ Gráficos de vendas interativos
- ✅ Gerenciamento completo de pedidos
- ✅ Gerenciamento completo de reservas
- ✅ Gerenciamento completo do cardápio
- ✅ Configurações do restaurante
- ✅ Controle de logo e imagens
- ✅ Gerenciamento de redes sociais
- ✅ Cálculos automáticos de vendas
- ✅ Relatórios de vendas (múltiplos períodos)

## 📚 Documentação

Para mais informações, consulte:
- [README.md](README.md) - Documentação completa do projeto
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guia detalhado de implantação

## ❓ Dúvidas?

Se tiver alguma dúvida sobre como visualizar ou usar o site, consulte a documentação ou abra uma issue no GitHub.

---

**Desenvolvido com HTML, CSS e JavaScript puro (sem frameworks)** 🚀
