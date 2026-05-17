const signupLogin = document.querySelector('.signup-login')
const signup = document.querySelector('.signup-button')
const login = document.querySelector('.login-button')

signup.addEventListener('click', () => {
  scrollElementLeft()
})
login.addEventListener('click', () => {
  scrollElementRight()
})

function scrollElementLeft() {
  signupLogin.scrollTo({
    left: -1000,
    behavior: "smooth"
  })

}
function scrollElementRight() {
  signupLogin.scrollTo({
    left: 1000,
    behavior: "smooth"
  })

}

