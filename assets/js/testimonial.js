class Testimonial {
  image = "";
  quote = "";
  author = "";
  rating = 0;

  constructor(image, quote, author, rating) {
    this.image = image;
    this.quote = quote;
    this.author = author;
    this.rating = rating;
  }

  ratingRander() {
    this.ratingHtml = "";
    for (let i = 0; i < this.rating; i++) {
      this.ratingHtml += `<i class="fa-solid fa-star start"></i>`;
    }
  }

  render() {
    throw new Error(
      "You should use one of 'AuthorTestimonial' or 'CompanyTestimonial'"
    );
  }
}

class AuthorTestimonial extends Testimonial {
  render() {
    this.ratingRander();
    return `<div class="card">
            <img src="${this.image}" />
            <span class="rating">${this.ratingHtml}</span>
            <p class="quote">"${this.quote}"</p>
            <p class="author">-${this.author}</p>
        </div>`;
  }
}

class CompanyTestimonial extends Testimonial {
  render() {
    this.ratingRander();
    return `<div class="card">
        <img src="${this.image}" />
        <span class="rating">${this.ratingHtml}</span>
        <p class="quote">"${this.quote}"</p>
        <p class="author">-${this.author} company</p>
    </div>`;
  }
}

const testimonial1 = new AuthorTestimonial(
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Mantap sekali jasanya!",
  "Jimih Setiawan",
  1
);

const testimonial2 = new AuthorTestimonial(
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Keren kamu bro!",
  "Adika Wahyu Sulaiman",
  1
);

const testimonial3 = new CompanyTestimonial(
  "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Apasih bang!",
  "Almas Fadhillah",
  3
);

const testimonials = [testimonial1, testimonial2, testimonial3];

const filterTestimonial = (rating) => {
  const filteredTestimonial = testimonials.filter((testi) => {
    return testi.rating == rating;
  });

  if (!filteredTestimonial.length) {
    return (document.getElementById(
      "testimonials"
    ).innerHTML = `<h1 class="notfound">Data not found!</h1>`);
  }

  const testimonialHtml = filteredTestimonial.reduce((accumulator, testi) => {
    return accumulator + testi.render();
  }, "");
  document.getElementById("testimonials").innerHTML = testimonialHtml;
};

const allTestimonial = () => {
  const testimonialHtml = testimonials.reduce((accumulator, testi) => {
    return accumulator + testi.render();
  }, "");
  document.getElementById("testimonials").innerHTML = testimonialHtml;
};

allTestimonial();
