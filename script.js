// ================= DATA & INIT =================
let likedProducts = JSON.parse(localStorage.getItem("likes")) || [];
let likesCount = JSON.parse(localStorage.getItem("likesCount")) || {};

const defaultProducts = [
    {id:1,name:"T-shirt Bleu",category:"vetements",size:"M",condition:"Très bon état avec étiquette",price:15,images:["2222.jpg","3333.webp","5555.webp"]},
    {id:2,name:"Chaussures Nike",category:"chaussures",size:"40",condition:"En bon état",price:50,images:["7777.webp","8888.webp","9999.avif"]},
    {id:3,name:"Sac à main",category:"accessoires",size:"-",condition:"État correct",price:25,images:["1010.jpg","1212.jpg","1313.jpg"]}
];

if(!localStorage.getItem("products")) localStorage.setItem("products",JSON.stringify(defaultProducts));
let productsData = JSON.parse(localStorage.getItem("products")) || [];

productsData.forEach(p=>{if(likesCount[p.id]===undefined) likesCount[p.id]=0;});
localStorage.setItem("likesCount",JSON.stringify(likesCount));

// ================= FUNCTIONS =================
function isLiked(id){return likedProducts.includes(id);}
function toggleLike(id,btn){
    const countEl=document.getElementById(`like-count-${id}`);
    if(isLiked(id)){likedProducts=likedProducts.filter(pid=>pid!==id);likesCount[id]=Math.max(0,likesCount[id]-1);btn.textContent="🤍";btn.classList.remove("active");}
    else{likedProducts.push(id);likesCount[id]++;btn.textContent="❤️";btn.classList.add("active");}
    localStorage.setItem("likes",JSON.stringify(likedProducts));
    localStorage.setItem("likesCount",JSON.stringify(likesCount));
    if(countEl) countEl.textContent=likesCount[id];
}
function openProduct(product){localStorage.setItem("product",JSON.stringify(product));window.location.href="produit.html";}

// ================= DISPLAY =================
function displayProducts(list){
    const container=document.getElementById("products");
    if(!container)return;
    container.innerHTML="";
    if(list.length===0){container.innerHTML="<p>Aucun article trouvé</p>";return;}
    list.forEach(product=>{
        const liked=isLiked(product.id);
        let sizeText="";
        if(product.category==="vetements")sizeText=`Taille : ${product.size}`;
        if(product.category==="chaussures")sizeText=`Pointure : ${product.size}`;
        const card=document.createElement("div");
        card.className="product-card";
        card.innerHTML=`
        <div class="like-box">
        <span class="like-btn ${liked?"active":""}">${liked?"❤️":"🤍"}</span>
        <span class="like-count" id="like-count-${product.id}">${likesCount[product.id]}</span>
        </div>
        <img src="${product.images[0]}" alt="${product.name}">
        <div class="info">
        <h4>${product.name}</h4>
        <p class="price">${product.price} €</p>
        ${sizeText?`<p>${sizeText}</p>`:""}
        <p class="condition">${product.condition}</p>
        </div>
        <button class="view-btn">Voir le produit</button>`;
        card.querySelector(".like-btn").onclick=e=>{e.stopPropagation();toggleLike(product.id,e.target);}
        card.querySelector(".view-btn").onclick=()=>openProduct(product);
        container.appendChild(card);
    });
}

// ================= FILTERS =================
function filterProducts(){
    const search=document.getElementById("search")?.value.toLowerCase()||"";
    const category=document.getElementById("category")?.value||"";
    const size=document.getElementById("size")?.value||"";
    const maxPrice=document.getElementById("max-price")?.value||"";
    const filtered=productsData.filter(p=>
        p.name.toLowerCase().includes(search)&&
        (!category||p.category===category)&&
        (!size||p.size===size)&&
        (!maxPrice||p.price<=maxPrice)
    );
    displayProducts(filtered);
}

// ================= EVENTS =================
document.getElementById("search")?.addEventListener("input",filterProducts);
document.getElementById("category")?.addEventListener("change",filterProducts);
document.getElementById("size")?.addEventListener("change",filterProducts);
document.getElementById("max-price")?.addEventListener("input",filterProducts);

// ================= INIT =================
displayProducts(productsData);
