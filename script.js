var Airtable = require("airtable");
var base = new Airtable({
    apiKey: "keykJEcHevRtZms70",
}).base("appBX0t11OlpZc3GV");

// create empty array to use later for filters
let typeFilter = [];

// find the parent container element to which we will append each record
let container = document.querySelector(".content-container");

base("project2")
    .select({
        maxRecords: 50,
        view: "Grid view",
    })
    .eachPage(
        function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function (record, index) {
                // console.log('record', record.fields);
                record.fields.Type.forEach((Type) => {
                    if (!typeFilter.includes(Type)) typeFilter.push(Type);
                });

                // create div element for each record
                let airtableItem = document.createElement("div");
                // add a class to the record element
                airtableItem.classList.add("airtable-item");
                // this will be used to filter items
                airtableItem.setAttribute("data-type", record.fields.Type);
                airtableItem.setAttribute("data-shape", record.fields.Shape);
                airtableItem.setAttribute("data-feel", record.fields.Feel);
                airtableItem.setAttribute("data-material", record.fields.Material);
                airtableItem.setAttribute("data-smoke", record.fields.SmokePattern);

                let recordImage = document.createElement("img");
                recordImage.classList.add("airtable-item--image");
                recordImage.src = record.fields.Image[0].url;
                airtableItem.append(recordImage);

                // container.append(airtableItem);
                document.querySelector('.content-container').append(airtableItem)
            });
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        },
        function done(err) {
            if (err) {
                console.error(err);
                return;
            } else {
                // get all of the rendered records
                let allItems = Array.from(document.querySelectorAll(".airtable-item"));
            }
        }
    );

document.querySelectorAll(".btn-type").forEach((btn) => {
    btn.addEventListener("click", function (event) { ShowHideFilter(event) });
});

// // FILTER
function ShowHideFilter(e) {
    console.log(e.target);
    let listofAirtableItems = document.querySelectorAll("div.airtable-item");
    listofAirtableItems.forEach(function SearchFilter(item) {
        item.classList.remove("filter-hide");
        // if div matches the id of the button, show div, otherwise, hide
        if (item.dataset.type == e.target.dataset.type) {
            item.classList.add("filter-show");
        }

        else if (item.dataset.shape == e.target.dataset.shape) {
            item.classList.add("filter-show");
        }

        else if (item.dataset.feel == e.target.dataset.feel) {
            item.classList.add("filter-show");
        }

        else if (item.dataset.material == e.target.dataset.material) {
            item.classList.add("filter-show");
        }

        else if (item.dataset.smoke == e.target.dataset.smoke) {
            item.classList.add("filter-show");
        }

        else {
            item.classList.add("filter-hide");
        }
    });
};

// FILTER
// //Condense Filters into one function
// //by checking the clicked filter type
// function ShowHideFilter(e) {
//   console.log("e", e.target.dataset.filter);
//   let listofAirtableItems = document.querySelectorAll("div.airtable-item");
//   listofAirtableItems.forEach(function (item) {
//     // if div matches the id of the button, show div, otherwise, hide
//     if (e.target.dataset.filter == "type") {
//       console.log("type");
//       if (e.target.dataset.value == item.dataset.type) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     } else if (e.target.dataset.filter == "shape") {
//       if (e.target.dataset.value == item.dataset.shape) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     } else if (e.target.dataset.filter == "feel") {
//       if (e.target.dataset.value == item.dataset.feel) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     } else if (e.target.dataset.filter == "material") {
//       if (e.target.dataset.value == item.dataset.material) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     } else if (e.target.dataset.filter == "smoke") {
//       if (e.target.dataset.value == item.dataset.smoke) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     } else {
//       item.classList.add("hidden");
//     }
//   });
// }

//RESET FILTERS
// find the reset button
let resetBtn = document.querySelector(".btn-reset");

//attach a click listener to the button
resetBtn.addEventListener("click", () => {
    // remove the hidden class on all items
    listofAirtableItems.forEach(function (item) {
        item.classList.remove("filter-hide");
    });
});

// SMOKE ANIMATION
let spans = document.querySelectorAll('span');

spans.forEach((span) => {
    span.addEventListener("mouseenter", function (e) {
        e.target.classList.add("active");

        setTimeout(() => {
            e.target.classList.remove("active");
        }, 2000);
    });
});
