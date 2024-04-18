let savedData = JSON.parse(localStorage.getItem('saved')) ;

getRecipeData(savedData);


function getRecipeData(savedIds){
  const recipes = document.querySelector('.saved-recipes-main');
  recipes.innerHTML='';
  
  if(savedIds && savedIds.length!=0){
    savedIds.forEach((id,index)=>{
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res=>res.json())
      .then(data=>{
        recipes.innerHTML+=renderRecipe(data,index);
        setOpenEvent();
        setDelEvent();
      })
      .catch(()=>{
        alert('Something Went Wrong');
      });
    });
  }else{
    recipes.innerHTML =`<p>You haven't saved any recipes yet</p>`;
  }
}

function renderRecipe(data,index){
  return  `
    <div class="recipe" data-id="${data.meals[0].idMeal}">
    <div class="thumb">
      <button class="delBtn" data-index="${index}">x<button>
      <img src="${data.meals[0].strMealThumb}" alt="">
    </div>
    <p class="subtitle-small">${data.meals[0].strMeal}</p>
    </div>
    `;
}

// store the selected item

function setOpenEvent(){
  document.querySelectorAll('.recipe').forEach(item=>{
    item.addEventListener('click',()=>{
      const mealId = item.dataset.id;
      window.location.href = `detail.html?id=${encodeURIComponent(mealId)}`;
    });
  });
}jjk

// set event for delete buttons

function setDelEvent(){
  document.querySelectorAll('.delBtn').forEach(btn=>{
    btn.addEventListener('click',(event)=>{
      event.stopPropagation();
      const items = document.querySelectorAll('.recipe');
      let index = btn.dataset.index;
      items[index].remove();
      savedData.splice(index,1);
      localStorage.setItem('saved',JSON.stringify(savedData));
      getRecipeData(savedData);
    });    
  });
}