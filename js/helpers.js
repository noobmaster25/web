

const customFetch = async(url, options)=>{
    try {
        const response = await fetch(url, options);
       if(response.status == 401){
        window.alert("unauthenticated user")
        window.location.href = "/pages/login.html";
        }

       if(response.status < 200 || response.status > 299){
        throw new Error("Http error: "+response.status)
       }

       if(options.method != "DELETE"){
        const data = await response.json();
        return data;
       }
    } catch (error) {
        console.error(error);
    }
}
//definir una paleta de colores con opcion de opacidad
const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00', '#0038ff']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

const updateNavBarActive = (navBarElements)=>{
    const currentURL = window.location.href;
    const lastPartOfURL = currentURL.split("/").pop();

    for (const element of navBarElements) {
        const elementLink = element.querySelector("a").href;
        const lastPartOfElementLink = elementLink.split("/").pop();

        if (lastPartOfURL === lastPartOfElementLink) {
            element.children[0].classList.add("active");
        }
    }
}

const saveNumberPageAndSize = (numPage,size) =>{
    localStorage.setItem("page", numPage);
    localStorage.setItem("size",size);
}
const getNumberPageAndSize=()=>{
    const page = localStorage.getItem("page");
    const size = localStorage.getItem("size");
    return {page,size}
}

export {customFetch,getDataColors,updateNavBarActive,saveNumberPageAndSize,getNumberPageAndSize}