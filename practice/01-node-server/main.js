fetch('https://picsum.photos/250').then(
    function(response) {
        console.log('It worked')
        console.log(response)
        return response.blob()
    }
).then(function(myBlob) {
    console.log(myBlob)
    let myObjectURL = URL.createObjectURL(myBlob)
    const image = document.createElement('img')
    image.src = myObjectURL
    document.body.appendChild(image)
}).catch(function(error) {
    console.log('There was an error' + error)
})

console.log('All done')