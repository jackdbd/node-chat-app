// eslint-disable-next-line
const socket = io();

function scrollToBottom() {
  // selectors
  const messages = $("#messages");
  const newMessage = messages.children("li:last-child");
  // heights
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", () => {
  console.log("Connected to server");
  const params = $.deparam(window.location.search);
  socket.emit("join", params, err => {
    console.log(err);
    if (err) {
      alert(err);
      // redirect the user to the home page
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("updateUserList", users => {
  const ol = $("<ol></ol>");
  users.forEach(user => {
    const li = $("<li></li>");
    li.text(user);
    ol.append(li);
  });
  $("#users").html(ol);
});

socket.on("newMessage", message => {
  const template = $("#message-template").html();
  /* eslint-disable no-undef */
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    text: message.text
  });
  /* eslint-enable no-undef */
  $("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", message => {
  const template = $("#location-message-template").html();
  /* eslint-disable no-undef */
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });
  /* eslint-enable no-undef */
  $("#messages").append(html);
  scrollToBottom();
});

$("#message-form").on("submit", event => {
  // prevent the default behavior of the form, which is refreshing the entire page
  event.preventDefault();
  const messageTextBox = $("[name=message]");
  socket.emit(
    "createMessage",
    {
      text: messageTextBox.val()
    },
    ackData => {
      messageTextBox.val("");
      console.log("ack:", ackData);
    }
  );
});

const locationButton = $("#send-location");
locationButton.on("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Send location...");

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location.");
    }
  );
});
