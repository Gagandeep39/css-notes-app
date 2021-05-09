const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) notes.forEach((note) => addNote(note));

addBtn.addEventListener('click', () => addNote());

function addNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <div class="tools">
      <button class="edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textarea = note.querySelector('textarea');

  textarea.value = text;
  // Display content using markdown libary inside 'main' class div
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    // Remove from localStorage
    updateLocalStorage();
  });

  // Shows text area and hides text box
  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  });

  textarea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);

    // Update data in localstorage
    updateLocalStorage();
  });

  document.body.appendChild(note);
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((text) => notes.push(text.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}
