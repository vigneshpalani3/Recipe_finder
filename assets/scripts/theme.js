const themeBtn = document.querySelector('.theme-btns');

themeBtn.addEventListener('click',()=>{
  let themePreference = document.querySelector('html') ;

  if(themePreference.dataset.theme=='dark'){
    themePreference.setAttribute('data-theme','light');
    document.querySelector('.dark').classList.remove('on-state');
    document.querySelector('.light').classList.add('on-state');
  }else{
    themePreference.setAttribute('data-theme','dark');
    document.querySelector('.light').classList.remove('on-state');
    document.querySelector('.dark').classList.add('on-state');
  }
  localStorage.setItem('myTheme',themePreference.dataset.theme);
});

window.addEventListener('load',()=>{
  let myTheme = localStorage.getItem('myTheme') || 'light';
  document.querySelector('html').setAttribute('data-theme',myTheme);
  document.querySelector(`.${myTheme}`).classList.add('on-state');
});