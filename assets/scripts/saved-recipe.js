getRecipeData(JSON.parse(localStorage.getItem('saved')));

const recipes = document.querySelector('.saved-recipes-main');
recipes.innerHTML='';

function getRecipeData(savedIds){
  if(savedIds){
    savedIds.forEach(id=>{
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res=>res.json())
      .then(data=>{
        recipes.innerHTML+=renderRecipe(data);
        setClickEvent();
      })
      .catch(()=>{
        alert('Something Went Wrong');
      });
    });
  }
}

function renderRecipe(data){
  return  `
    <div class="recipe" data-id="${data.meals[0].idMeal}">
    <div class="thumb">
      <img src="${data.meals[0].strMealThumb}" alt="">
    </div>
    <p class="subtitle-small">${data.meals[0].strMeal}</p>
    </div>
    `;
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