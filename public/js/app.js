const weatherForm = document.querySelector('form') // button
const search = document.querySelector('input') // field
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents page from loading again

    const location = search.value
    const url = 'http://localhost:3000/weather?address='+location


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
    response.json().then((data)=>{
        if(data.error)
            messageOne.textContent = data.error
        else
        {
            messageOne.textContent = ''
            messageTwo.textContent = 'For ' + data.location + 
            ', the temperature is ' + data.forecast.temperature + 
            'C and it feels like it is ' + data.forecast.feelslike + 'C.'
        }
    })
})

    console.log(location)
})