const images = [];

// fetch by category
const fetchCategoryBtn = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );

    if (response.status) {
      const { categories } = await response.json();

      const buttons = document.getElementById("categories");
      buttons.innerHTML = "";

      const allBtns = categories.map((category) => {
        return `<button id="${category.category.toLowerCase()}" 
                    onclick="fetchByCategory('${category.category}')"
                class="border-2 rounded-lg p-4 flex justify-center items-center gap-x-4">
                    <img src="${category.category_icon}" alt="${
          category.category
        }" class="w-10 h-10">
                    <span class="text-2xl font-bold">${category.category}</span>
                </button>`;
      });

      buttons.innerHTML = allBtns.join("");
    }
  } catch (error) {
    console.error(error);
  }
};

fetchCategoryBtn();

// fetch by category
const fetchByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );

    if (response.status) {
      const { data } = await response.json();
      const cards = document.getElementById("cards");
      cards.innerHTML = "";

      // chaning btn color
      const btn = document.getElementById(category.toString().toLowerCase());
      btn.classList.add("bg-slate-200");

      //  removing bg color from other btns
      const allBtns = document.querySelectorAll("#categories button");
      allBtns.forEach((button) => {
        if (button.id !== category.toString().toLowerCase()) {
          button.classList.remove("bg-slate-200");
        }
      });

      if (data.length === 0) {
        cards.innerHTML = `
            <div class="col-span-3 bg-slate-200 h-fit p-6 rounded-xl">
                <div class="flex flex-col justify-center items-center gap-y-6">   
                    <i class="fa-solid fa-magnifying-glass text-[250px] flex justify-center items-center" style="color: #74C0FC;"></i>
                    <div class="flex flex-col justify-center items-center text-center">
                    <p class="text-2xl font-bold">No Information Available</p>
                    <p class="mt-2 text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.</p>
                    </div>
                </div>
            </div>
        `;

        return;
      }

      const petCard = data.map((pet) => {
        return `
    <div class="rounded-xl border p-6 space-y-2">
      <img class="rounded-xl" src="${pet.image}" alt="" />

      <p class="font-bold text-xl">${pet.pet_name || "Not Found"}</p>
      <div><i class="fa-solid fa-bars"></i> Breed: ${
        pet.breed || "Not Found"
      }</div>
      <div><i class="fa-regular fa-calendar"></i> Birth: ${
        new Date(pet.date_of_birth).getFullYear() || "Not Found"
      }</div>
      <div><i class="fa-solid fa-mercury"></i> Gender: ${
        pet.gender || "Not Found"
      }</div>
      <div><i class="fa-solid fa-dollar-sign"></i> Price : ${
        pet.price || "Not Found"
      }$</div>

      <hr class="my-4">

      <div class="grid grid-cols-3 w-full gap-2">
        <button id="like_${pet.petId}" onclick="addImage('${
          pet.image
        }')" class="btn">
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button id="adopt_${pet.petId}" onclick="adopt(${
          pet.petId
        })" class="btn text-[#0E7A81]">Adopt</button>
        <button id="details_${pet.petId}" onclick="my_modal_${
          pet.petId
        }.showModal()" class="btn text-[#0E7A81]">Details</button>
      </div>
    </div>

    <dialog id="my_modal_${
      pet.petId
    }" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div>
          <div class="rounded-lg">
            <img class="object-cover w-full rounded-lg" src="${
              pet.image
            }" alt="" />
          </div>
          <p class="text-2xl font-bold mt-4">${pet.pet_name || "Not Found"}</p>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div><i class="fa-solid fa-bars"></i> Breed: ${
              pet.breed || "Not Found"
            }</div>
            <div><i class="fa-regular fa-calendar"></i> Birth: ${
              new Date(pet.date_of_birth).getFullYear() || "Not Found"
            }</div>
            <div><i class="fa-solid fa-mercury"></i> Gender: ${
              pet.gender || "Not Found"
            }</div>
            <div><i class="fa-solid fa-dollar-sign"></i> Price : ${
              pet.price || "Not Found"
            }$</div>
            <div><i class="fa-solid fa-syringe"></i> Vaccinated status: ${
              pet.vaccinated_status || "Not Found"
            }</div>
          </div>

          <hr class="my-4">

          <div class="mt-4">
            <p><span class="font-bold">Details Information: </span> ${
              pet.pet_details || "Not Found"
            }</p>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn w-full">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;
      });

      cards.innerHTML = petCard.join("");
    }
  } catch (error) {
    console.error(error);
  }
};

// function add images
const addImage = (image) => {
  images.push(image);

  const imageDiv = document.getElementById("likedimages");

  const imgElement = document.createElement("img");
  imgElement.src = image;
  imgElement.classList.add(
    "w-full",
    "h-fit",
    "rounded-2xl",
    "object-fit",
    "p-2"
  );

  imageDiv.appendChild(imgElement);
};

const adopt = async (petId) => {
  console.log(petId);
  let counter = 3;
  const adoptBtn = document.getElementById(`adopt_${petId}`);
  adoptBtn.innerHTML = `<span class="countdown font-mono">
      <span style="--value:${counter}"></span>
    </span>;`;

  const countdownInterval = setInterval(() => {
    counter--;
    if (counter === 0) {
      clearInterval(countdownInterval);
      adoptBtn.innerHTML = "Adopted";
      return;
    }
    adoptBtn.innerHTML = `<span class="countdown font-mono">
      <span style="--value:${counter}"></span>`
  }, 1000);
};
