/* Booking Service */
const nameTag = document.querySelector(".nameInput");
const serviceTag = document.querySelector(".serviceInput");
const dateTag = document.querySelector(".dateInput");
const timeTag = document.querySelector(".timeInput");
const bookTag = document.querySelector(".btn-info");
const cardContainerTag = document.querySelector(".cardContainer");

bookTag.addEventListener("click", () => {
  const name = nameTag.value;
  const service = serviceTag.value;
  const bookingDate = dateTag.value;
  const time = timeTag.value;
  const currentDateToCheck = new Date();
  const currentTimeToCheck = currentDateToCheck.getTime();
  const bookingDateToCheck = new Date(bookingDate);
  const bookingTimeToCheck = bookingDateToCheck.getTime();
  //  checking not place an order for expiration dates
  if (bookingTimeToCheck < currentTimeToCheck) {
    alert("Orders cannot be placed for expiration dates");
    return;
  }
  //  checking fill the form or not
  if (name === "" || service === "" || bookingDate === "" || time === "") {
    alert("Fill the form first");
    return;
  }

  createSlip(name, service, bookingDate, time);
  nameTag.value = "";
  serviceTag.value = "";
  dateTag.value = "";
  timeTag.value = "";
});

const createSlip = (name, service, bookingDate, time) => {
  //  create card
  const cardTag = document.createElement("div");
  cardTag.classList.add("card", "bg-light", "mb-3");
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.append("Restaurant Booking Slip");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitleName = document.createElement("h6");
  cardTitleName.classList.add("card-title");
  const cardTitleDate = document.createElement("h6");
  cardTitleDate.classList.add("card-title");
  const serviceType = document.createElement("h6");
  serviceType.classList.add("card-title");
  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.innerHTML = `This is your booking slip.<br>
    Thank for your order.<br>`;
  const cancelText = document.createElement("span");
  cancelText.classList.add("card-text", "cancelText");
  cancelText.append(
    "You can cancel the order in 24 hours before the day you order."
  );
  cardText.append(cancelText);
  //  add cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "btn-danger");
  cancelBtn.append("Cancel");

  //  adding information to booking card
  const customerName = "Name - " + name;
  cardTitleName.append(customerName);
  const serviceName = "Service - " + service;
  serviceType.append(serviceName);
  const bookingDateText = "Date - " + bookingDate + " | " + time;
  cardTitleDate.append(bookingDateText);
  cardBody.append(
    cardTitleName,
    serviceType,
    cardTitleDate,
    cardText,
    cancelBtn
  );
  cardTag.append(cardHeader, cardBody);
  cardContainerTag.append(cardTag);

  cancelBtn.addEventListener("click", () => {
    allowedToCancel(time, bookingDate, cardTag);
  });
};

const allowedToCancel = (time, date, card) => {
  //  getting the actual time(hours & minutes) for booking
  const hours = time.slice(0, 2);
  const minutes = time.slice(3, 5);
  const orderDate = new Date(date);
  orderDate.setHours(hours);
  orderDate.setMinutes(minutes);
  const orderTime = orderDate.getTime();
  //  getting current time
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 24);
  const currentTime = currentDate.getTime();

  //  comparison to allow or not
  if (currentTime > orderTime) {
    console.log(currentTime, orderTime);
    alert("You can't cancel the booking. Cause time for cancel is passed.");
  } else {
    // if allow, asking whether toacancel or not
    const cancelValue = prompt(
      "If you want to cancel, type 'Yes'. If not, type 'No'"
    );
    if (cancelValue === null) {
      return;
    } else if (cancelValue.toLocaleLowerCase() === "yes") {
      card.remove();
      alert("You have canceled the booking");
    }
  }
};
