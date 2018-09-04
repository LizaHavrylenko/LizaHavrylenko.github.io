const list = document.getElementById('list');
const buttonSortByDate = document.getElementById('buttonSortByDate');
const buttonSortByDateReverse = document.getElementById('buttonSortByDateReverse');
const buttonSortByTag = document.getElementById('buttonSortByTag');
const buttonBackTo10 = document.getElementById('buttonBackTo10');
const searchField = document.getElementById('search-input');
const tagList = document.getElementById('tags-list');
let tagsSelected = [];

let pageRender = (fetchedData) =>
{
  let deletePostRecordByTimestamp = (timeStamp) =>{
    
    fetchedData = fetchedData.filter(item => item.createdAt !== timeStamp);
    sortedPosts = sortPosts(fetchedData, sortBy);
  readyPosts = [...sortedPosts];
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
  }
  
  addTags(fetchedData);
  let sortedPosts;
  sortBy = localStorage.getItem('preferedSortType');
  sortedPosts = sortPosts(fetchedData, sortBy);
  readyPosts = [...sortedPosts];
  refreshPosts(readyPosts,deletePostRecordByTimestamp);

  document.onscroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      let postsDisplayed = list.children.length;
      readyPosts.slice(postsDisplayed+1 ,postsDisplayed+10).forEach(addPost);
    }
  }

buttonSortByDate.addEventListener('click',()=>{
  sortBy = 'byDate';
  localStorage.setItem('preferedSortType',sortBy);
  sortedPosts = sortPosts(fetchedData, sortBy);
  readyPosts = [...sortedPosts];
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
});
buttonSortByDateReverse.addEventListener('click',()=>{
  sortBy = 'byDateReverse';
  localStorage.setItem('preferedSortType',sortBy);
  sortedPosts = sortPosts(fetchedData, sortBy);
  readyPosts = [...sortedPosts];
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
});

buttonSortByTag.addEventListener('click',()=>{
  sortBy = 'byTag';
  [...tagList.children].forEach((tag) => {if (tag.firstChild.checked) tagsSelected.push(tag.firstChild.value);});
  //localStorage.setItem('preferedSortType',sortBy);
  sortedPosts = sortPosts(fetchedData, sortBy);
  readyPosts = [...sortedPosts];
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
});
buttonBackTo10.addEventListener('click',()=>{
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
});

searchField.addEventListener('keyup',()=>{
  readyPosts = instantSearch(searchField.value,sortedPosts);
  refreshPosts(readyPosts,deletePostRecordByTimestamp);
});


}


let instantSearch = (searchInput,dataArray) =>{
  let searchResult=[];

  for (var j=0; j<dataArray.length; j++) {
    if (dataArray[j].title.toLowerCase().includes(searchInput.toLowerCase()))
      searchResult.push(dataArray[j]);
  }
  return searchResult; 
}

let refreshPosts = (postArray,callback) =>{
  while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
  postArray.slice(0,10).forEach((elmt)=>addPost(elmt,callback));
  window.scrollTo(0, 0);
}

let sortPosts = (fetchedData, sortBy) =>{
  if ((sortBy==null)||(sortBy=='byDate')) {
    return sortWithCopy(fetchedData,  compareByDate);
  }
  else if (sortBy=='byDateReverse'){
      return sortWithCopy(fetchedData, compareByDateReverse);
    }
    else if (sortBy=='byTag'){
      return sortWithCopy(fetchedData, compareByTag);
    }
    else{
      console.log('Local storage already has selected token fith garbage values.');
    }
}

let addPost = (element,callback) => {

  const newsPost = document.createElement('div');
  list.appendChild(newsPost);
    const deletePost = document.createElement('a');
    deletePost.setAttribute('title', 'Remove this post');
    deletePost.setAttribute('href', '#');
    deletePost.setAttribute('id', element.createdAt);
    deletePost.setAttribute('class','cross-button');
    newsPost.appendChild(deletePost);  
    deletePost.addEventListener('click',(evnt)=>{callback(evnt.target.id);});
  const mainTitle = document.createElement('h4');
  mainTitle.innerHTML = element.title;
  newsPost.appendChild(mainTitle);
  const paragraph = document.createElement('p');
  paragraph.innerHTML = element.description;
  newsPost.appendChild(paragraph);
  const dateOfCreation = document.createElement('p');
   let timestamp = new Date(element.createdAt);
   dateOfCreation.innerHTML = timestamp.toUTCString();
   newsPost.appendChild(dateOfCreation);
  newsPost.appendChild(paragraph);
  const photo = document.createElement('img');
  photo.setAttribute('src', element.image);
  newsPost.appendChild(photo);
  const tagsOnPage = document.createElement('div');
  tagsOnPage.innerHTML = element.tags.join(', ');
  tagsOnPage.setAttribute('class', 'tag-names');
  newsPost.appendChild(tagsOnPage);
   
  }
  

let addTags = dataArray =>{
    const listOfTags = document.getElementById('tags-list');
    let arrayOfTags = [];
    dataArray.forEach(element =>{
      
     arrayOfTags = arrayOfTags.concat(element.tags.filter(tag => !arrayOfTags.includes(tag)));
       
    });
       
    
    arrayOfTags.forEach(tag =>{
       
      const tagContainer = document.createElement('div');
      listOfTags.appendChild(tagContainer);
    const separateTag = document.createElement('input');
      separateTag.setAttribute('type', 'checkbox');
      separateTag.setAttribute('value', tag);
      separateTag.setAttribute('id', tag);
      tagContainer.appendChild(separateTag);
      const label = document.createElement('label');
        label.setAttribute ('for', tag);
      label.innerHTML = tag;
       tagContainer.appendChild(label);
    });
  }
  
  

window.onload = () => {
 fetch('https://api.myjson.com/bins/152f9j' )
 .then(response =>{
      response.json().then((result)=>{pageRender(result.data);});
 })
 .catch(err => {
   console.log(err);
 });
}

let compareByDate = (elementA, elementB) => {
  return   new Date(elementB.createdAt) - new Date(elementA.createdAt);
} 
let compareByDateReverse = (elementA, elementB) => {
  return  new Date(elementA.createdAt) - new Date(elementB.createdAt);
}

let compareByTag = (elementA, elementB) => {
  let difference =  elementB.tags.filter(element => tagsSelected.includes(element)).length - elementA.tags.filter(element => tagsSelected.includes(element)).length;
  if (difference != 0){
    return difference;
  }
  else{
    return compareByDate(elementA,elementB);
  }
}


let sortWithCopy = (array, compareFunction) => {
  return [...array].sort(compareFunction);
}