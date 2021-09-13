const input = document.getElementById('input')
const submitButton = document.getElementById('submit')
const star_rating = document.getElementById('star_rating')
const star_icons = document.getElementsByTagName('i')

const state = {
    review: {
        rating: 1,
        comment: ""
    },
    response: {
        success: '',
        error: '',
    }
}


const updateStarRating = (rating) => {
    const icons = Array.from(star_icons)
    icons.forEach((icon, index) => {
        if ((index + 1) <= rating) {
            icon.style.color = '#ffcd69'
        } else {
            icon.style.color = '#E0E0E0'
        }
    });
}
star_rating.addEventListener('click', (event) => {
    const rating = event.target.getAttribute("rating")
    updateStarRating(rating)
    state.review.rating = rating
})
submitButton.addEventListener('click', (event) => {
    state.review.comment = input.value

    fetch('http://localhost:3000/add_review', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            
          },
        body: JSON.stringify(state.review)
    })
        .then(res => {
            res.json()
            state.response.success = 'review added'
            document.location.href = '/'
        })
        .catch(error => {
            state.response.error = 'could not add review'
        })
})