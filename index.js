const loadAllData = async () => {
  const spiner = document.getElementById("spiner");
  const spinContaier = document.getElementById("spinContaier");
  spiner.style.display = "block";
  try {
    await new Promise((resolve) => setTimeout(resolve));
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    if (!res.ok) {
      throw new Error("Not featching data Nework erro");
    }
    const data = await res.json();
    const alldata = data.data;
    displayData(alldata);
  } catch (error) {
    console.log(error.message);
  } finally {
    spiner.style.display = "none";
    spinContaier.style.display = "none";
  }
};

const displayData = (data) => {
  const cardContainer = document.getElementById("cardContainer");
  data.tools.map((product) => {
    let i = 1;
    const div = document.createElement("div");
    div.innerHTML = `    
<div class="card glass">
  <figure><img class="h-56 rounded-lg" src="${
    product?.image || "image not found"
  }" alt="${product?.name || "Product Name"}"/></figure>
  <div class="card-body">
    <h2 class="card-title text-md">Features</h2>
    <ol class="mb-3">
    <li>${i++}. ${product.features[0]}</li>
    <li>${i++}. ${product.features[1]}</li>
    <li>${i++}. ${product.features[2]}</li>
    </ol>
    <hr>
    <div class="card-actions justify-between mt-5">
      <div class="space-y-2">
      <h1 class="font-bold text-md">'${product.name}'</h1>
      <p><span><i class="fa-solid fa-calendar-days mr-2"></i></span>${
        product.published_in
      }</p>
      </div>
      <button  onclick="handelModal('${
        product.id
      }')" class="btn hover:btn-error rounded-full bg-transparent"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>
</div>
    
    `;
    cardContainer.appendChild(div);
  });
};

const handelModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const singleData = data.data;
  handelShowmodal(singleData);
};

let previousDiv = null; // To keep track of the previously added div

const handelShowmodal = (data) => {
  my_modal_1.showModal();
  const modalbody = getId("modalbody");
  if (previousDiv) {
    modalbody.removeChild(previousDiv);
  }
  const div = document.createElement("div");
  div.innerHTML = `
  
 <div class="card card-side bg-base-100 z-10 flex gap-2 flex-col-reverse lg:flex-row">
 <div class="card-body flex-1 space-y-5 bg-[#EB57570D] border border-red-200 rounded-md">
   <h2 class="card-title">${data.description}</h2>
  <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div class="text-center bg-white p-5 rounded-md">
        <h1 class="text-[#03A30A] font-bold">${
          data.pricing[0].price.split("/")[0]
        }/ </h1>
        <h2 class="text-[#03A30A] font-bold">${
          data.pricing[0].price.split("/")[1]
        } </h1>
        <p class="text-[#03A30A] font-bold"text-[#03A30A]>${
          data.pricing[0].plan
        }</p>
      </div>

       <div class="text-center  bg-white p-5 rounded-md">
        <h1 class="text-[#F28927] font-bold">${
          data.pricing[1].price.split("/")[0]
        }/ </h1>
        <h2 class="text-[#F28927] font-bold">${
          data.pricing[1].price.split("/")[1]
        } </h1>
        <p class="text-[#F28927] font-bold"text-[#03A30A]>${
          data.pricing[1].plan
        }</p>
      </div>

      <div class="text-center  bg-white p-5 rounded-md ">
        <h1 class="text-[#EB5757] font-bold">${data.pricing[2].price.slice(
          0,
          10
        )} </h1>
        <p class="text-[#EB5757] font-bold"text-[#03A30A]>${
          data.pricing[2].plan
        }</p>
      </div>
  </div>

  <div class="flex flex-col sm:flex-row justify-between">
    
  <div class="space-x-8">
   <h1 class="text-xl font-bold mb-3">Features</h1>
    <ul class="list-disc text-left">
      <li>${data.features["1"].feature_name}</li>
      <li>${data.features["2"].feature_name}</li>
      <li>${data.features["3"].feature_name}</li>
    </ul>
  </div>

  <div class="space-x-5">
   <h1 class="text-xl mb-3 font-bold">Integrations</h1>
    <ul class="list-disc">
      <li>${data.integrations[0]}</li>
      <li>${data.integrations[1]}</li>
      <li>${data.integrations[2]}</li>
     
    </ul>
  </div>
  
  </div>
 </div>
 <div class="flex-1 border border-gray-300a p-6 shadow-sm rounded-md">
  <figure><img  src="${data.image_link[0]}"alt=${data.tool_name}/></figure>
  <div class="mt-5 space-y-3">
  <h1 class="font-bold text-center text-md">${
    data.input_output_examples[0].input
  }</h1> 
   <p class="text-center text-xs">${data.input_output_examples[0].output}</p>
  </div>
 </div>
</div>
  `;
  modalbody.appendChild(div);
  previousDiv = div;

  console.log(data.integrations[0]);
};

loadAllData();

const getId = (id) => {
  return document.getElementById(id);
};
