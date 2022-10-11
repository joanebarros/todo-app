/**
 * métodos de recuperação de elementos HTML
 */
// recupera elementos HTML a partir do nome da tag
// const todoForm = document.getElementsByTagName('form')[0]
const todoForm = document.getElementById('todo-form')
const todos = []

/**
 * addEventListener serve para ouvir eventos de elementos
 * HTML sempre que foram emitidos
 */

todoForm.addEventListener('submit', function(evento) {
  /**
   * cancela o comportamento padrão de um formulário
   * que seria o recarregamento da página tentando fazer seu envio
   */
  evento.preventDefault()
  /**
   * cancela a propagação do evento que foi emitido para os elementos pai,
   * evitando que outros eventos sejam emitidos
   */
  evento.stopPropagation()
  /**
   * querySelector recupera o primeiro elemento que atenda
   * a um seletor css informado
   */
  const todoInput = document.querySelector('#todo')
  /**
   * a propriedade value é uma propriedade que representa o atributo value
   * dos elementos de formulário do HTML, para acessarmos o valor que está dentro
   * deles
   */
  todos.push(todoInput.value)
  todoInput.value = ''
  renderizarTodos()
})

function renderizarTodos() {
  const todosListSection = document.querySelector('#todos-list')
  todosListSection.innerHTML = ''
  
  for (let tarefa /* 'Beber água' */ of todos) {
    /**
     * createElement é o método responsável por gerar novos elementos
     * HTML dentro do Javascript a partir do nome das tags
     */
    const divCard = document.createElement('div')
    divCard.classList.add('card', 'bg-warning')

    const divCardBody = document.createElement('div')
    divCardBody.classList.add('card-body', 'd-flex', 'align-items-center')

    const pTodoText = document.createElement('p')
    pTodoText.classList.add('todo-text', 'flex-grow-1', 'text-truncate')
    /**
     * innerText é a propriedade que informa qual o conteúdo de texto que está dentro de um
     * elemento HTML
     */
    pTodoText.innerText = tarefa

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('btn', 'delete-todo')
    /**
     * arrow functions SEMPRE são anônimas
     */
    btnDelete.addEventListener('click', () => {
      /**
       * descobrir o índice do elemento dentro do array
       */
      /**
       * indexOf informa em qual índice se encontra um determinado valor dentro
       * do seu array
       * se ele não achar o valor dentro do array, ele retorna -1
       */
      const index = todos.indexOf(tarefa)
      /**
       * splice serve para excluir um determinado valor do seu array a partir do seu índice
       */
      todos.splice(index, 1)
      renderizarTodos()
    })

    const spanIcon = document.createElement('span')
    spanIcon.classList.add('material-symbols-outlined')
    spanIcon.innerText = 'delete'

    /**
     * appendChild serve para colocar um novo elemento HTML dentro de outro
     */
    btnDelete.appendChild(spanIcon)
    /** 
     * append serve para colocar um ou mais elementos HTML dentro de outro
    */
    divCardBody.append(pTodoText, btnDelete)
    divCard.appendChild(divCardBody)
    todosListSection.appendChild(divCard)
  }
}