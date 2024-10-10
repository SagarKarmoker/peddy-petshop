document.getElementById("sortbyprice").addEventListener("click", async () => {
    try {
        let response;
        const allBtns = document.querySelectorAll("#categories button");

        const category = Array.from(allBtns).find((btn) =>
            btn.classList.contains("bg-slate-200")
        );

        const baseUrl = "https://openapi.programming-hero.com/api/peddy/category";

        if (category && category.id === "cat") {
            response = await fetch(`${baseUrl}/cat`);
        } else if (category && category.id === "dog") {
            response = await fetch(`${baseUrl}/dog`);
        } else if (category && category.id === "bird") {
            response = await fetch(`${baseUrl}/bird`);
        } else if (category && category.id === "rabbit") {
            response = await fetch(`${baseUrl}/rabbit`);
        } else {
            response = await fetch(
                "https://openapi.programming-hero.com/api/peddy/pets"
            );
        }

        if (response.status === 200) {
            let pets;
            if (!category || !category.id) {
                const mypets = await response.json();
                console.log(mypets);
                pets = mypets.pets;
            } else {
                const { data } = await response.json();
                pets = data;
            }

            const sortedPetsByPrice = sortByPrice(pets);

            const cards = document.getElementById("cards");
            cards.innerHTML = "";

            const petCard = sortedPetsByPrice
                .filter((pet) => pet.price > 0)
                .map((pet) => {
                    return `<div class="rounded-xl border p-6 space-y-2">
            <img
              class="rounded-xl"
              src=${pet.image}
              alt=""
            />

            <p class="font-bold text-xl">${pet.pet_name}</p>
            <div><i class="fa-solid fa-bars"></i> Breed: ${pet.breed}</div>
            <div><i class="fa-regular fa-calendar"></i> Birth: ${new Date(
                        pet.date_of_birth
                    ).getFullYear()}</div>
            <div><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</div>
            <div><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price
                        }$</div>

            <hr class="my-4">

            <div class="grid grid-cols-3 w-full gap-2">
              <button id="like_${pet.petId
                        }" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
              <button class="btn text-[#0E7A81]">Adopt</button>
              <button id=details-${pet.petId} onclick="my_modal_${pet.petId
                        }.showModal()" class="btn text-[#0E7A81]">Details</button>
            </div>
          </div>
          
            <dialog id="my_modal_${pet.petId
                        }" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                <div>
                    <div class="rounded-lg">
                        <img class="object-cover w-full rounded-lg" src=${pet.image
                        } alt="" />
                    </div>
                    <p class="text-2xl font-bold mt-4">${pet.pet_name}</p>
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div><i class="fa-solid fa-bars"></i> Breed: ${pet.breed
                        }</div>
                        <div><i class="fa-regular fa-calendar"></i> Birth: ${new Date(
                            pet.date_of_birth
                        ).getFullYear()}</div>
                        <div><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender
                        }</div>
                        <div><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price
                        }$</div>
                        <div><i class="fa-solid fa-syringe"></i> Vaccinated status : ${pet.vaccinated_status
                        }</div>
                    </div>

                    <hr class="my-4">

                    <div class="mt-4"> 
                        <p><span class="font-bold">Details Information: </span> ${pet.pet_details
                        } </p>
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
});

const sortByPrice = (pets) => {
    return pets.sort((a, b) => a.price - b.price);
};
