import * as elements from '../utils/elements.js';
import { FavoritesHandler } from "./UserHandler.js"; './TableHandler.js';

export class CreateTable extends FavoritesHandler{
  constructor(){
    super();
    this.addRow();
    this.updateRows();
  };
  addRow(){
    elements.addItemButton.addEventListener('click', ()=>{
      const {value} = elements.searchInput;
      this.addEntry(value);
      elements.searchInput.value = "";
    });
  };
  updateRows(){
    this.clearRows();
    if(this.entries.length === 0){
      console.log(this.entries.length)
      elements.root.querySelector('main .empty').classList.toggle('hide');
    }else{
      elements.root.querySelector('main .empty').classList.add('hide');
    }
    this.entries.forEach((entry) => {
      const tr = document.createElement('tr');
      const tbody = document.querySelector('tbody');
      tr.innerHTML = this.setTd(entry);
      tr.querySelector('.remove').addEventListener('click', (event)=>{
        const confirmRemove = confirm('Tem certeza que quer remover?');
        if(confirmRemove){
          this.deleteEntry(entry);
        }
      })
      tbody.append(tr);
    });
  };
  setTd (user){
    const tdModel = `<td class="user">
    <img src="https://github.com/${user.login}.png" alt="Imagem de ${user.name}">
    <a href="https://github.com/${user.login}" target="_blank">
      <p>${user.name}</p>
      <span>/${user.login}</span>
    </a>
  </td>
  <td class="repositories">${user.repositories}</td>
  <td class="followers">${user.followers}</td>
  <td><button class="remove">Remover</button></td>`;
  return tdModel;
  };
  clearRows(){
    elements.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove();
    });
  }
};