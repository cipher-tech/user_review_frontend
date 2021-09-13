const allReviews = document.getElementById('allReviews');
const avgRating = document.getElementById('averageRating');
const starRating = document.getElementById('avgStarRating');

const state = {
    allReviews: [],
    response: {
        success: '',
        error: '',
    }
}

const getAverageRating = () => {
    const totalRating = state.allReviews.reduce((counter, value) => {
        return counter + value.rating 
    }, 0)
    const averageRating = totalRating / state.allReviews.length
    avgRating.innerHTML = averageRating.toFixed(1)
    starRating.innerHTML = displayStars(Math.floor(averageRating))
    
}

const displayStars = (number) => {
    let stars = ""
    for (let i = 0; i < 5; i++) {
        if ((i + 1) <= number) {
            stars += `<i class="fas fa-star star_yellow"></i>`
        } else {
            stars += `<i class="fas fa-star star_ash"></i>`
        }
    }
    return stars
}

const generateHtml = () => {
    const { allReviews: reviewData } = state
    reviewData.forEach((review, index) => {
        allReviews.innerHTML +=
            `<div class="review-single">
            <p class="rating-overview_rating_star">
                <span>
                    ${displayStars(Math.floor(review.rating))}
                </span>
            </p>

            <p class="review-single__info">
                <span> ${Math.floor(review.rating)}, </span> ${review.comment}
            </p>
        </div> 
        `

    })
}
const fetchAllReviews = () => {
    fetch('http://localhost:3000/get_reviews', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.review)
    })
        .then(async (res) => {
            state.allReviews = await res.json()
            generateHtml()
            getAverageRating()
        })
        .catch(error => {
            state.response.error = 'could not get reviews'
        })
}

fetchAllReviews()
