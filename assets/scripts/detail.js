
// get the id from url

const urlParam = new URLSearchParams(window.location.search);
const mealId = urlParam.get('id');
getMealDetail(mealId);


function getMealDetail(id){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(res=>res.json())
  .then(data=>renderDetail(data))
  .catch(()=>{
    alert('Something Went Wrong');
  });
}
  

function renderDetail(data){
  let ingredientHtml='';
  for(let i=1;i<30;i++){
    if(data.meals[0][`strIngredient${i}`]){
      let item=data.meals[0][`strIngredient${i}`];
      let scale=data.meals[0][`strMeasure${i}`];

      ingredientHtml+=
      `
      <div class="ingredient">
        <p>${item} -</p>
        <p>${scale}</p>
      </div>
      `;
    }else{
      break;
    }
  }

  let aboutHtml = 
  `
  <h3 class="subtitle-large">${data.meals[0].strMeal}</h3>
  <p class="subtitle-small"><b>Cuisine :</b> ${data.meals[0].strArea}</p>
  <p class="subtitle-small"><b>category :</b> ${data.meals[0].strCategory}</p>
  <p class="subtitle-small"><b>Tags :</b> ${data.meals[0].strTags}</p>
  <button class="saveBtn">Save</button>
  `;

  document.querySelector('.ingredients').innerHTML+=ingredientHtml;
  document.querySelector('.instruction').innerHTML+=`<p>${data.meals[0].strInstructions}</p>`;
  document.querySelector('.thumb').innerHTML=`<img src="${data.meals[0].strMealThumb}" alt="">`;
  document.querySelector('.basic-data').innerHTML=aboutHtml;

  addBtnEvent();
}

function addBtnEvent(){
  document.querySelector('.saveBtn').addEventListener('click',()=>{
    let savedRecipe = getRecipe();
    if(!savedRecipe.includes(mealId)){
      savedRecipe.push(mealId);
      setRecipe(savedRecipe);
      console.log(savedRecipe);
    }
  });
}

export function getRecipe(){
  return JSON.parse(localStorage.getItem('saved')) || [];
}

export function setRecipe(arr){
  localStorage.setItem('saved',JSON.stringify(arr));
}