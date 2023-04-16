const accordion = document.querySelectorAll('.accordion');

accordion.forEach(section => {
    const panel = section.querySelector('.panel');

    section.addEventListener('click', () => {
        // Toggle active class on the clicked section
        section.classList.toggle('active');

        // Toggle height of panel between 0 and its full height
        if (section.classList.contains('active')) {
            panel.style.height = panel.scrollHeight + 'px';
        } else {
            panel.style.height = 0;
        }
    });
});
