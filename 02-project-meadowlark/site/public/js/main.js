document.querySelectorAll('img').forEach(image => {
    image.addEventListener('mouseenter', (event) => {
        const target = event.currentTarget;
        target.classList.add('expand');
    })
    image.addEventListener('mouseleave', (event) => {
        const target = event.currentTarget;
        target.classList.remove('expand');
    })
})