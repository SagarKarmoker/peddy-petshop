// loading state
setTimeout(() => {
  fetchData();
}, 2000);

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );

    if (response.status === 200) {
      const { pets } = await response.json();
      // cards
      const cards = document.getElementById("cards");
      cards.innerHTML = "";

      const petCard = pets.map((pet) => {
        return `<div class="rounded-xl border p-6 space-y-2">
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
  } finally {
    console.log("Finally");
  }
};

async function getDetails(id) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );

    if (response.status) {
      const { petData } = await response.json();

      console.log(petData);
      // show modal
    }
  } catch (error) {
    console.error(error);
  }
}
