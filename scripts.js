const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  if (input.value.trim() === '') return

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
    editando: false
  })

  input.value = ''

  mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''
  
    minhaListaDeItens.forEach((item, posicao) => {
      if (item.editando) {
        novaLi += `
          <li class="list-group-item">
              <input type="text" class="form-control" value="${item.tarefa}" onblur="salvarEdicao(${posicao}, this.value)" onkeypress="salvarEdicaoEnter(event, ${posicao}, this.value)">
          </li>
        `
      } else {
        novaLi += `
          <li class="list-group-item d-flex justify-content-between align-items-center ${item.concluida ? 'done' : ''}">
              <div>
                  <button class="btn btn-sm btn-custom" onclick="concluirTarefa(${posicao})">${item.concluida ? 'Concluído' : 'Concluído'}</button>
                  <span class="ml-2 ${item.concluida ? 'text-muted' : ''}">${item.tarefa}</span>
              </div>
              <div>
                  <button class="btn btn-sm btn-custom mr-2" onclick="editarTarefa(${posicao})">Editar</button>
                  <button class="btn btn-sm btn-custom" onclick="deletarItem(${posicao})">Limpar</button>
              </div>
          </li>
        `
      }
    })
  
    listaCompleta.innerHTML = novaLi
  
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
  }

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)

  mostrarTarefas()
}

function editarTarefa(posicao) {
  minhaListaDeItens[posicao].editando = true

  mostrarTarefas()
}

function salvarEdicao(posicao, novoValor) {
  minhaListaDeItens[posicao].tarefa = novoValor
  minhaListaDeItens[posicao].editando = false

  mostrarTarefas()
}

function salvarEdicaoEnter(event, posicao, novoValor) {
  if (event.key === "Enter") {
    salvarEdicao(posicao, novoValor)
  }
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)
