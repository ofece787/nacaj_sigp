let navBox = document.querySelector('.head-navigation')
let navActive = document.querySelector('.active')
let navButton = document.querySelector('.menu-button')

navButton.addEventListener('click', () => {
  if(navBox.clientWidth == 300) {
    navBox.style.width = '0px'
    navBox.style.padding = '0px'
  } else {   
    navBox.style.width = '300px'
    navBox.style.padding = '34px'
  }
})