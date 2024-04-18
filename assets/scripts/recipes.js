// Get category name from url and search string

const urlParam = new URLSearchParams(window.location.search);
const selectedCat = urlParam.get('btnName');
const searchstring = urlParam.get('searchStr');

if(searchstring){
  getRecipeByName(searchstring);
}
else if(selectedCat){
  getRecipeByCat(selectedCat);
}

// get recipes based on search

function getRecipeByName(name){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  .then(res=>res.json())
  .then(data=>renderRecipe(data.meals))
  .catch(()=>{
    alert('Something Went Wrong');
  });
}


// Get Recipes based on categories

function getRecipeByCat(category){
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then(res=>res.json())
  .then(data=>{
    renderRecipe(data.meals);
  })
}

function renderRecipe(data){
  html ='';
  (data).forEach(element => {
    html+=
    `
    <div class="recipe" data-id="${element.idMeal}">
    <div class="thumb">
      <img src="${element.strMealThumb}" alt="">
    </div>
    <p class="subtitle-small">${element.strMeal}</p>
    </div>
    `;
  });
  document.querySelector('.category-title').innerText = localStorage.getItem('selectedCat');
  document.querySelector('.recipes-main').innerHTML = html;
  setClickEvent();
}

// store the seected item

function setClickEvent(){
  document.querySelectorAll('.recipe').forEach(item=>{
    item.addEventListener('click',()=>{
      const mealId = item.dataset.id;
      window.location.href = `detail.html?id=${encodeURIComponent(mealId)}`;
    });
  });
}