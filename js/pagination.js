import {getStoreToken, isAuthenticated} from "./Auth.js";
import {customFetch, saveNumberPageAndSize, updateNavBarActive} from "./helpers.js";


const urlBaseProducts = "http://localhost:8080/api/v0/products";
const tbody = document.querySelector(".content-products");
const divPagination = document.querySelector(".pagination");


const defaultSizepage = 7;

const updateAllTableAndPagination = (page)=>{
    tbody.innerHTML = "";
    getAllProducts(page, defaultSizepage);
    divPagination.innerHTML = "";
}

const generatePaginatedButton = (page, value, isActive) => {
    const button = document.createElement("li");
    button.textContent = value;
    button.addEventListener("click", () => updateAllTableAndPagination(page));
    if (isActive) button.classList.add("active");
    return button;
}

const createPagination = (totalPages, currentPage, isFirsh, isLast) => {
    const ul = document.createElement("ul");


    //generar button anterior '<' cuando la página actual sea distinta de la primera
    if (!isFirsh) {
        const buttonPrev = generatePaginatedButton(currentPage - 1, "<<", false);
        buttonPrev.classList.add("button-prev");
        ul.appendChild(buttonPrev);
    }

    //----- páginas comienzan en '0'

    //casos cubiertos
    //1234...100
    //1..51,52,53..100
    //1....98,99,100

    //generar página '1' por defecto cuando la página actual sea distinta de la primera
    if (currentPage != 0) {
        const buttonPage1 = generatePaginatedButton(0, 1, false);
        ul.appendChild(buttonPage1);
    }

    
    let homePage = Math.max(0, currentPage - 1);
    let finalPage = Math.min(totalPages, homePage + 3);

    
    const points = document.createElement("li")
    points.textContent = "...";

    //crear puntos suspensivos cuando sea mayor a 3 páginas(comienza en 0)
    //123...
    if (homePage > 1) {
        const point = document.createElement("li")
        point.textContent = "...";
        ul.appendChild(point);
    }

    
    if (currentPage + 1 == totalPages) homePage = homePage - 1;
    for (let index = homePage; index < finalPage; index++) {

        if (index == currentPage) {
            const button = generatePaginatedButton(index, (index + 1).toString(), true);
            ul.appendChild(button);
            continue;
        }
        if (index != 0) {
            const button = generatePaginatedButton(index, (index + 1).toString(), false);
            ul.appendChild(button);
        }

    }
    divPagination.appendChild(ul);

   
    //caso 123..55,56,57(...)100 crear segundos puntos suspensivos
    if (totalPages > 4 && finalPage < totalPages && finalPage != totalPages - 1) {
        ul.appendChild(points);
    }
    //agregar ultima pagina por defecto
    if (finalPage != totalPages) {
        const buttonFinal = generatePaginatedButton(totalPages - 1, totalPages.toString(), false);
        ul.appendChild(buttonFinal);
    }

    divPagination.appendChild(ul);

    //agregar button '>' si página actual es distinta a la última
    if (!isLast) {
        const buttonNext = generatePaginatedButton(currentPage + 1, ">>", false);

        buttonNext.classList.add("button-next")
        ul.appendChild(buttonNext);
    }

}

const createRowsProducts = (products) => {
    const productsFragment = document.createDocumentFragment();
    products.forEach(product => {
        const row = document.createElement("tr");

        const tdNombre = document.createElement("td");
        const tdPrecio = document.createElement("td");
        const tdStock = document.createElement("td");
        const tdCategoria = document.createElement("td");

        const {nombre,price,stock} = product;
        const { name } = product.category;

        tdNombre.textContent = nombre || "sin nombre";
        tdPrecio.textContent = "$ "+price;
        tdStock.textContent = stock || 0;
        tdCategoria.textContent = name;

        //agregando deta-label para usarlos en versión movil(ocultando thead)
        tdNombre.dataset.label = "nombre";
        tdPrecio.dataset.label = "precio";
        tdStock.dataset.label = "stock";
        tdCategoria.dataset.label = "categoria";

        row.appendChild(tdNombre);
        row.appendChild(tdPrecio);
        row.appendChild(tdStock);
        row.appendChild(tdCategoria);

        productsFragment.appendChild(row)
    });
    return productsFragment;
}

const getAllProducts = async(page, size) => {
    //construir url
    const urlProductsPagination = `${urlBaseProducts}?page=${page}&size=${size}`
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getStoreToken()
        }
    }
    const products = await customFetch(urlProductsPagination,options);

    //crear filas por cada producto en un fragmento
    const fragmentRowsProducts = createRowsProducts(products.content);
    tbody.appendChild(fragmentRowsProducts);


    const {totalPages,number,first,last} = products;
    //crear pagination
    createPagination(totalPages, number, first, last);

    saveNumberPageAndSize(page,size);
}



document.addEventListener("DOMContentLoaded", () => isAuthenticated()?loadInfo():window.location.href = "/pages/login.html");

const loadInfo = ()=>{
    //actualizar nav con opcion pestania actual
    const navBarElements = document.querySelectorAll(".nav-menu li");
    updateNavBarActive(navBarElements)

    //loader visible
    document.querySelector(".loader").style.display = "block";
    setTimeout(() => {
        getAllProducts(0, defaultSizepage);
        //oacultar loader
        document.querySelector(".loader").style.display = "none";
    }, 200)

}