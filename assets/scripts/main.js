const filterBtns = document.querySelectorAll('.food-filter');

filterBtns.forEach(btn=>{
  btn.addEventListener('click',(event)=>{
    const btnName = event.target.textContent;
    window.location.href=`recipes.html?btnName=${encodeURIComponent(btnName)}`;
  });
});

const searchBox = document.querySelector('#foodInput');

document.querySelector('#indexSearch').addEventListener('click',()=>{
  window.location.href = `recipes.html?searchStr=${encodeURIComponent(searchBox.value)}`;
});