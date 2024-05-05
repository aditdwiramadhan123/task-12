// make class and method
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
      this.ratingRander();
      return `<div class="card">
                    <img src="${this.image}" />
                    <span class="rating">${this.ratingHtml}</span>
                    <p class="quote">"${this.quote}"</p>
                    <p class="author">-${this.author}</p>
                </div>`;
    }
  }
  
  // make promise with ajax
  
  function getData(url) {
    let data = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        resolve(JSON.parse(xhr.responseText));
      };
      xhr.onerror = () => {
        reject("Network error!");
      };
      xhr.send();
    });
    return data;
  }
  
  // make function to call promise
  const renderAllData = async () => {
    try {
      const data = await getData("https://api.npoint.io/a314bf0c883bc3f6dd13");
      console.log(data);
  
      let testimonials = data.map((testimonial) => {
        return new Testimonial(
          testimonial.image,
          testimonial.content,
          testimonial.author,
          testimonial.rating
        );
      });
  
      const testimonialHtml = testimonials.reduce((accumulator, testi) => {
        return accumulator + testi.render();
      }, "");
      document.getElementById("testimonials").innerHTML = testimonialHtml;
      console.log("berhasil di render")
    } catch (error) {
      console.log(error);
    }
  };
  const renderFilteredData = async (rating) => {
    try {
      const data = await getData("https://api.npoint.io/a314bf0c883bc3f6dd13");
      console.log(data);
  
      let testimonials = data.map((testimonial) => {
        return new Testimonial(
          testimonial.image,
          testimonial.content,
          testimonial.author,
          testimonial.rating
        );
      }); 
  
      const filteredTestimonial = testimonials.filter((testi) => {
        return testi.rating == rating;
      });
  
      if (!filteredTestimonial.length) {
        return (document.getElementById(
          "testimonials"
        ).innerHTML = `<h1 class="notfound">Data not found!</h1>`);
      }
  
      const testimonialHtml = filteredTestimonial.reduce(
        (accumulator, testi) => {
          return accumulator + testi.render();
        },
        ""
      );
      document.getElementById("testimonials").innerHTML = testimonialHtml;
    } catch (error) {
      console.log(error);
    }
  };
  
//   call function
  renderAllData();
  