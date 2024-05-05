const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onload = () => {
  return(JSON.parse(xhr.responseText));
};
xhr.onerror = () => {
  return("Network error!");
};
xhr.send();

console
