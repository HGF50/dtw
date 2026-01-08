const form=document.getElementById("publier-form");
const preview=document.getElementById("image-preview");

document.getElementById("images").addEventListener("change",function(){
    preview.innerHTML="";
    const files=this.files;
    for(let i=0;i<files.length;i++){
        const img=document.createElement("img");
        img.src=URL.createObjectURL(files[i]);
        preview.appendChild(img);
    }
});

form.addEventListener("submit",function(e){
    e.preventDefault();
    const files=document.getElementById("images").files;
    if(files.length<3){alert("Veuillez ajouter au moins 3 images");return;}
    const images=[];
    for(let i=0;i<files.length;i++){images.push(URL.createObjectURL(files[i]));}
    let products=JSON.parse(localStorage.getItem("products"))||[];
    const newProduct={
        id:Date.now(),
        name:document.getElementById("name").value,
        brand:document.getElementById("brand").value,
        category:document.getElementById("category").value,
        size:document.getElementById("size").value,
        condition:document.getElementById("condition").value,
        description:document.getElementById("description").value,
        price:Number(document.getElementById("price").value),
        images:images
    };
    products.push(newProduct);
    localStorage.setItem("products",JSON.stringify(products));
    alert("Article publié avec succès 🎉");
    window.location.href="index.html";
});
