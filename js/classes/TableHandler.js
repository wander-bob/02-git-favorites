import * as elements from '../utils/elements.js';
import {displayError} from '../utils/errorHandler.js';
import {GithubUserData} from './GithubUserData.js';

export class FavoritesHandler{
  constructor(){
    this.load();
  };
  async addEntry(username){
    try{
      const entryAlreadyExists = this.entries.find(entry => entry.login === username);
      if(entryAlreadyExists){
        throw new Error('Essa conta já está na sua lista de favoritos.');
      }
      const userdata = await GithubUserData.search(username);
      if(userdata.login === undefined){
        throw new Error('Usuário não encontrado...');
      }
      this.entries = [userdata, ...this.entries];
      this.updateRows();
      this.save();
      
    }catch(error){
      displayError(error.message);
    };
  };
  deleteEntry(entry){
    const filteredEntries = this.entries.filter(user => entry !== user);
    this.entries = filteredEntries;
    this.updateRows();
    this.save();
  };
  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-cached:')) || [];
  };
  save(){
    localStorage.setItem('@github-cached:', JSON.stringify(this.entries));
  }
};

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