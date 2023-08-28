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
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  console.log(data.data);
};

const handleSearch = () => {
  const inputValue = getId("searchInput").value;
  console.log(inputValue);
};

loadAllData();

const getId = (id) => {
  return document.getElementById(id);
};
