function init() {

const posts = document.querySelectorAll('.item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')
        }
            else {
                entry.target.classList.remove('active')
            }
        
    })
},
   { threshold: 0.5
   });

  for (let i = 0; i < posts.length; i++) {
   const elements = posts[i];

    observer.observe(elements);

  }
}


init();