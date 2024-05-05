// function to counting time duration
const countDuration = (startDate, endDate) => {
    let startDatePart = startDate.split("/");
    let endDatePart = endDate.split("/");
  
    let formatStartDate =
      startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0];
    let formatEndDate =
      endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0];
  
    let newStartDate = new Date(formatStartDate);
    let newEndDate = new Date(formatEndDate);
  
    let timeDifferent = newEndDate - newStartDate;
    let differentDay = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
    let differentMonth = Math.floor(differentDay / 30);
    let differentYear = Math.floor(differentMonth / 12);
  
    let monthString = newStartDate.toLocaleString("en-US", { month: "long" });
    let day = newStartDate.getDate();
    let year = newStartDate.getFullYear();
    startDate = monthString + " " + day + ", " + year;
  
    monthString = newEndDate.toLocaleString("en-US", { month: "long" });
    day = newEndDate.getDate();
    year = newEndDate.getFullYear();
    endDate = monthString + " " + day + ", " + year;
  
    let timeDuration;
    if (differentYear >= 1) {
      if (differentYear == 1) {
        timeDuration = `${differentYear} year`;
      } else {
        timeDuration = `${differentYear} years`;
      }
    } else if (differentMonth >= 1) {
      if (differentMonth == 1) {
        timeDuration = `${differentMonth} month`;
      } else {
        timeDuration = `${differentMonth} months`;
      }
    } else if (differentDay >= 0) {
      if (differentDay <= 1) {
        timeDuration = `${differentDay} day`;
      } else {
        timeDuration = `${differentDay} days`;
      }
    }
  
    return timeDuration;
  }

module.exports = countDuration