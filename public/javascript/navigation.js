let navBox = document.querySelector('.head-navigation')
let navActive = document.querySelector('.active')
let navButton = document.querySelector('.menu-button')
let body = document.querySelector('body')
let eventButton = document.querySelector('.event-button')
let eventButtonClose = document.querySelector('.event-panel-close')
let eventos = document.querySelector('.eventos')


//Onload show or hide the side navigation bar due the window width
if(body.clientWidth >= 700) {
  navBox.style.width = '300px'
  navBox.style.padding = '34px'
} else {
  navBox.style.width = '0px'
  navBox.style.padding = '0px'
}

//On click show or hide the sidebar navigation
navButton.addEventListener('click', () => {
  if(navBox.clientWidth == 300) {
    navBox.style.width = '0px'
    navBox.style.padding = '0px'
  } else {   
    navBox.style.width = '300px'
    navBox.style.padding = '34px'
  }
})

eventButton.addEventListener('click', () => {
  if(eventos.clientWidth == 340) {
  } else {   
    eventos.style.width = '340px'
    eventos.style.padding = '14px'
    eventos.style.height = 'calc(100svh - 110px)'
  }
})

eventButtonClose.addEventListener('click', () => {
  eventos.style.width = '0px'
  eventos.style.height = '0px'
  eventos.style.padding = '0px'
})


