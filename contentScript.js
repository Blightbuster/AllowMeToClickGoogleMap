function makeClickable(el) {
  el.addEventListener("mouseup", function (e) {
    var e = e || window.event;
    var btnCode;

    btnCode = e.button;

    switch (btnCode) {
      case 0:
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("q");
        if (query) {
          window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            query
          )}`;
        } else {
          window.location.href = `https://www.google.com/maps/`;
        }
        break;
    }
  });
  el.style.cursor = "pointer";
}

function checkForMap() {
  // check if there is a html img element with a src that starts with "/maps/vt/"
  const inlineMapImage = document.querySelector('img[src^="/maps/vt/"]');
  if (inlineMapImage) {
    makeClickable(inlineMapImage.parentNode);
    observer.disconnect();
    return;
  }

  const travelAttractionFeedbackElements = document.querySelectorAll(
    '[data-attrid="TravelAttractionFeedback"]'
  );
  if (
    travelAttractionFeedbackElements !== undefined &&
    travelAttractionFeedbackElements.length > 0
  ) {
    makeClickable(
      travelAttractionFeedbackElements[0].parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement
    );
    observer.disconnect();
    return;
  }

  const dataStmElements = document.querySelectorAll("[data-stm]");
  if (dataStmElements !== undefined && dataStmElements.length > 0) {
    makeClickable(dataStmElements[0]);
    observer.disconnect();
    return;
  }

  const mapImage = document.getElementById("lu_map");
  if (mapImage) {
    makeClickable(mapImage.parentNode);
    observer.disconnect();
    return;
  }

  const links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.endsWith("terms_maps.html")) {
      makeClickable(
        links[i].parentElement.parentElement.parentElement.parentElement
      );
      observer.disconnect();
    }
  }
}

const observer = new MutationObserver(function (mutations) {
  checkForMap();
});

const config = {
  attributes: true,
  childList: true,
  subtree: true,
};

const targetNode = document;

observer.observe(targetNode, config);
