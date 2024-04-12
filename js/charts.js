import { getStoreToken, isAuthenticated, removeStoreToken } from "./Auth.js";
import { customFetch, getDataColors, getNumberPageAndSize, updateNavBarActive } from "./helpers.js";

//configuraciones globales para los charts 
Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

const urlBase = "http://localhost:8080/api/v0/products";


//renderizar graficos
const printChart = ()=>{
    let {page, size} = getNumberPageAndSize();
    page = page || 0;
    size = size || 7;

    const options = {
        headers:{
            "Authorization":"Bearer "+getStoreToken()
        }
    }
    customFetch(`${urlBase}?page=${page}&size=${size}`,options).then(data => {
        renderDonaChart(data.content);
        renderRadarChart(data.content);
        renderLineChart(data.content);
    });

   

}

const renderDonaChart = (products) =>{
    //new Chart(id-canvas, obejto(type de grafico, data, opciones))



    const labelsCategory = [...new Set(products.map(product => product.category.name))];
    const dataProductByCategory = labelsCategory.map(category => products.filter(product => product.category.name == category).length);

    const data = {
        labels:labelsCategory,
        datasets:[{
            data: dataProductByCategory,
            borderColor:getDataColors(),
            backgroundColor:getDataColors(20)
        }]
    }

    // const options = {
    //     plugins:{
    //         legend:{position:"left"}
    //     }
    // }
    new Chart("donaChart",{type:"doughnut",data})
}

const renderRadarChart = (products)=>{

    const labelNames = products.map(product=>product.nombre)
    const dataPrice= products.map(product=>product.price);

    const data = {
        labels: labelNames,
        datasets:[{
            label:"category",
            data:dataPrice,
            borderColor:getDataColors()[0],
            background:getDataColors(20)[0]
        }]
    }
    const options = {
        plugins:{
            legend:{display:false}
        },
        scales:{
            r:{
                ticks:{display:false}
            }
        }
    }
    new Chart("radarChart",{type:"radar", data,options})
}


const renderLineChart = (products) =>{

    const labelsCategory = [...new Set(products.map(product=>product.category.name))];
    const dataProductByCategory = labelsCategory.map(category => products.filter(product => product.category.name == category).length);

    const data = {
        labels:labelsCategory,
        datasets:[{
            label:"categories",
            data:dataProductByCategory,
            borderColor:getDataColors()[1],
            backgroundColor:getDataColors(20)[1],
            fill:true,
            tension:0.2
        }]
    }
    //datasets configuracion por conjunto y como mostrara dicha informacion
    //options configuraciones globales del grafico
    const options = {
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }

    new Chart(lineaChart,{type:"line", data,options})
}
const navBarElements = document.querySelectorAll(".nav-menu li");
updateNavBarActive(navBarElements)

document.addEventListener("DOMContentLoaded", ()=>{
    isAuthenticated()?printChart():window.location.href = "/pages/login.html";
})
