// VIDEO PLAYER
const video = document.getElementById("video-player").parentElement;
// video.style.maxWidth = "1200px";
video.style.width = "100%";
// video.style.height = "55vw";

// const cld = cloudinary.Cloudinary.new({ cloud_name: "dtgbbrxs0" });
// const player = cld.videoPlayer("video-player", {
//   loop: true,
//   autoplayMode: "on-scroll",
// });

// const getUrlByScreenSize = () => {
//   // MOBILE
//   if (window.screen.width < 475) {
//     return "https://res.cloudinary.com/dtgbbrxs0/video/upload/v1602938033/chael.mp4";

//     // DESKTOP
//   } else if (window.screen.width > 980) {
//     return "https://res.cloudinary.com/dtgbbrxs0/video/upload/v1602938033/finalvid.mp4";

//     // TABLET
//   } else {
//     return "TABLET LINK";
//   }
// };

// const getPublicId = (link) => {
//   let a = link.lastIndexOf("/");
//   let z = link.lastIndexOf(".");
//   return link.substring(a + 1, z);
// };

// const url = getUrlByScreenSize();
// const publicID = getPublicId(url);

// player.source(publicID);
const myGallery = cloudinary.galleryWidget({
  container: "#video-player",
  cloudName: "demo",
  carouselStyle: "none",
  aspectRatio: "16:9",
  mediaAssets: [
    { tag: "electric_car_product_gallery_demo", mediaType: "video" },
  ],
});

myGallery.render();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createGallery(container) {
  var _myGallery = cloudinary.galleryWidget({
    container: "#" + container.getAttribute("id"),
    cloudName: "dtgbbrxs0",
    carouselStyle: "none",
    aspectRatio: "16:9",
    mediaAssets: [
      {
        publicId: "robot5",
        mediaType: "image",
      },
    ],
    zoom: false,
    preload: ["image", "video"],
    placeholderImage: true,
    videoProps: {
      autoplay: false,
      controls: "play",
    },
    navigationButtonProps: {
      size: 30,
      shape: "round",
      iconColor: "#000",
      color: "#ffffff",
    },
  });
  await _myGallery.render();
  return _myGallery;
}

async function updateGallery(_myGallery, container) {
  var tags = container
    .getAttribute("data-tags")
    .split(";")
    .reduce((acc, curr) => {
      let [tag, mediaType = "image"] = curr.trim().split(":");
      acc.push({
        tag,
        mediaType,
      });
      return acc;
    }, []);

  await _myGallery.update({
    mediaAssets: tags,
  });
}

async function orderedShow() {
  let containers = document.querySelectorAll("[data-gallery='true']");
  var galleries = [];
  for (galleryContainer of containers) {
    try {
      galleries.push({
        gallery: await createGallery(galleryContainer),
        container: galleryContainer,
      });
    } catch (e) {}
  }
  for (gallery of galleries) {
    await updateGallery(gallery.gallery, gallery.container);
  }
}

orderedShow();

// THESE ARE NOT IN USE BUT LEFT THEM INCASE YOU STILL WANTED THEM
// const loadImages = document.getElementById("load-images")
// loadImages.addEventListener('click', orderedShow)

// ITIN SECTIONS
const itinSections = [...document.querySelectorAll('[class^="itin-section"]')];
itinSections.forEach((section) => (section.style.transition = "all 2s ease"));

// NEXT/PREVIOUS DAY BUTTONS
let itinNum = "";
// let itinNum = 0;

const next = document.getElementById("next-day");
const previous = document.getElementById("previous-day");
const buttons = [next, previous];

const showDisplay = (boolean) => {
  if (boolean) {
    itinSections[itinNum].style.display = "block";
    setTimeout(() => {
      itinSections[itinNum].style.opacity = 1;
    }, 1500);
  } else {
    itinSections[itinNum].style.display = "none";
    itinSections[itinNum].style.opacity = 0;
  }
};

const buttonDisplay = () => {
  itinNum === ""
    ? buttons.forEach((but) => (but.style.opacity = 0))
    : itinNum === 0
    ? (previous.style.opacity = 0)
    : itinNum === itinSections.length - 1
    ? (next.style.opacity = 0)
    : buttons.forEach((but) => (but.style.opacity = 1));
};

const toggleDay = () => {
  console.log(itinNum);
  buttonDisplay();
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showDisplay(false);
      button.id === "next-day"
        ? itinNum === itinSections.length - 1
          ? null
          : itinNum++
        : itinNum === 0
        ? null
        : itinNum--;
      showDisplay(true);
      buttonDisplay();
    });
  });
};

// OBSERVER FUNCTION
const observeItin = () => {
  let delayExecution = false;
  const config = { attributes: true };
  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (!mutation.target.getAttribute("data-loaded")) {
        if (
          mutation.target.style.display === "block" &&
          delayExecution === false
        ) {
          delayExecution = true;
          setTimeout(() => (delayExecution = false), 1500);
          orderedShow();
          mutation.target.setAttribute("data-loaded", true);
        }
      }
    }
  };
  const observer = new MutationObserver(callback);

  itinSections.forEach((node) => {
    observer.observe(node, config);
  });
};

// CLICK "SELECT EXPERIENCE" BUTTON
const selectExperienceButton = document.getElementById("select-experience");

selectExperienceButton.addEventListener("click", () => {
  observeItin();
  itinNum = 0;
  buttons.forEach((but) => (but.style.opacity = 1));
  toggleDay();
});

buttonDisplay();
