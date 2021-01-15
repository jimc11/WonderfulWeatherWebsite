const weatherForm = document.querySelector('form') // button
const search = document.querySelector('input') // field
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents page from loading again

    const location = search.value
    
    const url = '/weather?address='+location

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
            ', the temperature is ' + Math.round(data.forecast.temperature*(9/5)+32) + 
            'F and it feels like it is ' + Math.round(data.forecast.feelslike*(9/5)+32) + 'F.'
        }
    })
})

    console.log(location)
})